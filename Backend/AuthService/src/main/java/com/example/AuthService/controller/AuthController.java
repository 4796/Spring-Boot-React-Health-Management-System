package com.example.AuthService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.AuthService.service.*;
import com.example.AuthService.dto.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

 // Registracija korisnika
    //kada se pravi novi admin, mora da vec bude ulogovan drugi admin i da prosledi svoj token
    //doktora takodje moze da napravi samo admin, i kada se pravi ovde, odmah se salje zahtev 
    //da se napravi doctor i u doctorService, kao za pacijenta
    //pacijent se ovde jednostavno napravi(bez autorizacije) i salje se zahtev patientSerivce da se i tamo napravi
   //doktor ne moze da pravi novog korisnika
    @PostMapping("/register")
    public ResponseEntity<UserRegistrationResponse> register(@RequestBody UserRegistrationRequest request, @RequestHeader(value="Authorization", required=false) String adminToken) throws Exception {
    	UserRegistrationResponse response = new UserRegistrationResponse();
    	String userId;
    	adminToken=adminToken.substring(7);
		try {
			userId = authService.registerUser(adminToken, request.getUsername(), request.getPassword(), request.getRole(), request.getName(), request.getEmail(), request.getPhone_number(), request.getMedical_history(), request.getHire_date(), request.getSalary(), request.getSpecialization());
		} catch (Exception e) {
        	response.setStatus("ERROR");
        	response.setUserId(null);
        	response.setMessage(e.getMessage());
        	return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		}
        	
        
        if(userId==null) {
        	response.setStatus("ERROR");
        	response.setMessage("Unexpected error");
        	return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        response.setStatus("SUCCESS");
        response.setMessage("User registered successfully!");
        response.setUserId(userId);

       
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Prijava korisnika
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) throws Exception {
        // Provera autentikacije
    	LoginResponse errorResponse = new LoginResponse();
        try {
			if (!authService.authenticate(request.getUsername(), request.getPassword())) {
			    errorResponse.setStatus("ERROR");
			    errorResponse.setMessage("Invalid credentials");
			    return ResponseEntity.status(401).body(errorResponse);
			}
		} catch (Exception e) {
			errorResponse.setStatus("ERROR");
		    errorResponse.setMessage("Server error");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		}

        // Generisanje tokena
        String token=null;
        try {
        	token = authService.generateToken(request.getUsername());
		} catch (Exception e) {
			e.printStackTrace();
			errorResponse.setStatus("ERROR");
		    errorResponse.setMessage("Server error");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		}
        

        // Kreiranje odgovora
        LoginResponse response = new LoginResponse();
        response.setStatus("SUCCESS");
        response.setMessage("User logged in successfully!");
        response.setToken(token);
        response.setId(authService.getIdFromToken(token));
        response.setRole(authService.getRoleFromToken(token));
        return ResponseEntity.ok(response);
    }
}