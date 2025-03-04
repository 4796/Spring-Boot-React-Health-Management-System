package com.example.appointmentservice.service;


import com.example.appointmentservice.db.AppointmentRepository;
import com.example.appointmentservice.model.Appointment;
import com.example.appointmentservice.util.JwtUtil;
import com.example.appointmentservice.util.RestClientUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.crypto.SecretKey;

@Service
public class AppointmentService {
	private final AppointmentRepository appointmentRepository;
    private final RestClientUtil restClientUtil;
    private final String patientServiceUrl;
    private JwtUtil jwtUtil;
    @Value("${service.secret}")
    private String serviceSecret;
    
    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, RestClientUtil restClientUtil,
                              @Value("${patient.service.url}") String patientServiceUrl, JwtUtil jwt) {
        this.appointmentRepository = appointmentRepository;
        this.jwtUtil=jwt;
        this.restClientUtil = restClientUtil;
        this.patientServiceUrl = patientServiceUrl;
    }

    public List<Appointment> getAllAppointments(String token) {
    	//returns only appointments of specific doctor or patient from token
    	////////////////proveri da li je doktor ili pacijent i vrati im samo njihove podatke
    	if(isDoctor(token)) {
    		return appointmentRepository.findFutureAppointmentsByDocotorId( Long.valueOf(jwtUtil.extractClaims(token).get("id").toString()), LocalDateTime.now());
    	}
        //interceptor does not let admin, so now it has to be patient
    	return appointmentRepository.findFutureAppointmentsByPatientId( Long.valueOf(jwtUtil.extractClaims(token).get("id").toString()), LocalDateTime.now());
    }

   

	public Appointment bookAppointment(Appointment appointment, String token) throws Exception {
		//System.out.println(appointment);
        if(appointment.getAppointmentTime()==null || appointment.getDoctorId()==null || appointment.getPatientId()==null || appointment.getType()==null)
        	throw new IllegalArgumentException("not enought arguments");
        //appointment time must be in the future
        if(appointment.getAppointmentTime().isBefore(LocalDateTime.now()))
        	throw new IllegalArgumentException("Appointment must be in the future");
        
    	// provera da li postoji pacijent
        String url = patientServiceUrl + "/patients/" + appointment.getPatientId();
        ResponseEntity<Object> response=null;
        try {
        	response = restClientUtil.sendRequestWithToken(url, HttpMethod.GET, Object.class, token);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			if(e.getMessage().contains("401"))
				throw new AuthorizationDeniedException("You are not authorized");
			else
				throw new Exception("Unexpected error");
		}
        

        if (response==null || response.getStatusCode().is2xxSuccessful()) {
            System.out.println("Patient details arrived");
        } else {
            throw new RuntimeException("Failed to fetch patient details");
        }
        
        ///provera da li postoji doktor
        //bolje da provera doctor service ali jos ga nisam napravio
        String url2 = "https://localhost:8081/admin/users/" + appointment.getDoctorId();
        ResponseEntity<Object> response2 = null;
        //da se generise token za servis
        String serviceToken=generateServiceToken();
        try {
        	 response2= restClientUtil.sendRequestWithToken(url2, HttpMethod.GET, Object.class, serviceToken);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			if(e.getMessage().contains("401"))
				throw new AuthorizationDeniedException("You are not authorized");
			else
				throw new Exception("Unexpected error");
		}
       

        if (response2==null || response2.getStatusCode().is2xxSuccessful()) {//na auth service strani se proverava da li je doktor
            System.out.println("Doctor details arrived");
        } else {
            throw new RuntimeException("Failed to fetch doctor details");
        }
///
        // Zakazivanje termina
        //provera da li ima vremena, ne sme biti preblizu nekog drugog termina
        LocalDateTime start=appointment.getAppointmentTime().minusMinutes(15);
        LocalDateTime end=appointment.getAppointmentTime().plusMinutes(15);

        List<Appointment> listOfAppointments =appointmentRepository.findFutureAppointmentsByDocotorId(appointment.getDoctorId(), LocalDateTime.now());
        for (Appointment a : listOfAppointments) {
			LocalDateTime newA=a.getAppointmentTime();
			if(newA.isAfter(start) && newA.isBefore(end))
				throw new Exception("Your appointment time is already taken");
		}
        return appointmentRepository.save(appointment);
    }

    public void cancelAppointment(Long id, String token) throws Exception {
    	Appointment appointment=null;
    	try {
    		appointment=appointmentRepository.findById(id).orElseThrow();
		} catch (Exception e) {
			throw new Exception("Non existent appointment");
		}
    	Claims claims = jwtUtil.extractClaims(token);
    	if(isDoctor(token)) {
    		if(!appointment.getDoctorId().toString().equals(claims.get("id").toString()))
    			throw new AuthorizationDeniedException("Not your appointment");
    	}else {//patient(interceptor rejects admins)
    		
    		if(!appointment.getPatientId().toString().equals(claims.get("id").toString()))
    			throw new AuthorizationDeniedException("Not your appointment");
    	}
    	if(appointment.getAppointmentTime().isBefore(LocalDateTime.now()))
    		throw new IllegalArgumentException("Appointment is in the past");
        appointmentRepository.deleteById(id);
    }
    
    
     public boolean isDoctor(String token) {
		Claims claims=jwtUtil.extractClaims(token);
		return claims.get("role").toString().equals("ROLE_DOCTOR");
	}
    
     
     public String generateServiceToken() throws Exception {
         	SecretKey key1 = Keys.hmacShaKeyFor(serviceSecret.getBytes());
         	return Jwts.builder()
                     .setIssuedAt(new Date())
                     .setExpiration(new Date(System.currentTimeMillis() + 3600 * 1000)) // Token ističe za 1 sat
                     .signWith(key1, SignatureAlgorithm.HS512) // Koristimo HMAC SHA-512
                     .compact();
 
         
         
     }
}