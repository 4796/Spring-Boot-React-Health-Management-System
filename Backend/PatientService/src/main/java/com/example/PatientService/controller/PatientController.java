package com.example.PatientService.controller;

import com.example.PatientService.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.*;
import com.example.PatientService.model.Patient;
import com.example.PatientService.service.PatientService;
import java.util.List;


@RestController
@RequestMapping("/patients")
public class PatientController {
    private final PatientService patientService;
    @Autowired
    private JwtUtil jwt;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }
//interceptor odbija admina
    
    //doktor
    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients(@RequestHeader("Authorization") String token) throws Exception {
    	token=token.substring(7);
    	if(!jwt.extractClaims(token).get("role").equals("ROLE_DOCTOR"))
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); 
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    //doktor i jedan pacijent
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id, @RequestHeader("Authorization") String token) throws Exception {
    	token=token.substring(7);
    	if(jwt.extractClaims(token).get("role").equals("ROLE_PATIENT") && !jwt.extractClaims(token).get("id").toString().equals(id.toString())) {
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    	}
			 
        return patientService.getPatientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //ima posebnu auth, samo servis-servis
    @SuppressWarnings("unchecked")
	@PostMapping(consumes = "application/json")
    public ResponseEntity<Patient> createPatient(@RequestHeader("Authorization") String token, @RequestBody Patient patient) throws Exception {
        try {
			return ResponseEntity.ok(patientService.createPatient(token, patient));
		} catch (AuthorizationDeniedException e) {
			return (ResponseEntity<Patient>) ResponseEntity.status(HttpStatus.UNAUTHORIZED);
		}
    }

    //patient personaly i doctor
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient updatedPatient, @RequestHeader("Authorization") String token) throws Exception {
    	token=token.substring(7);
    	return ResponseEntity.ok(patientService.updatePatient(id, token, updatedPatient));
    }

    //can only be deleted if authService sent request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id, @RequestHeader("Authorization") String token) throws Exception {
        
    	patientService.deletePatient(token, id);
        return ResponseEntity.noContent().build();
    }
    
    //doctor
    @GetMapping("/search")
    public ResponseEntity<List<Patient>> searchPatients(@RequestParam(required = false) String name, @RequestParam(required = false) String email, @RequestHeader("Authorization") String token) throws Exception {
    	token=token.substring(7);
    	if(!jwt.extractClaims(token).get("role").equals("ROLE_DOCTOR"))
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  
        List<Patient> patients = patientService.searchPatients(name, email);
        return ResponseEntity.ok(patients);
    	}
    
    
}
