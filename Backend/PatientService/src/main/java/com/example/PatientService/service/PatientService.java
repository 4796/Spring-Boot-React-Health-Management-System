package com.example.PatientService.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.PatientService.db.PatientRepository;
import com.example.PatientService.model.Patient;
import com.example.PatientService.util.JwtUtil;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.List;
import java.util.Optional;

import javax.crypto.SecretKey;

@Service
public class PatientService {
    private final PatientRepository patientRepository;
    @Autowired
    private JwtUtil jwt;
    @Value("${service.secret}")
    private String serviceSecret;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() throws Exception {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) throws Exception {
        return patientRepository.findById(id);
    }

    public Patient createPatient(String authHeader, Patient patient) throws Exception {
    	if(patient==null)
    		throw new IllegalArgumentException("Not enough information to create new patient.");
    	boolean input = 
                patient.getName() != null && 
                patient.getEmail() != null && 
                patient.getPhoneNumber() != null && 
                patient.getId() != null;

            if (!input) {
                throw new IllegalArgumentException("Not enough information to create new patient.");
            }
    	
    	//specific service-service autorization
    	if (authHeader == null || !authHeader.startsWith("Bearer ")) {
    		throw new IllegalArgumentException("Unauthorized");
        }
    	try {
            String token = authHeader.substring(7); // Uzmi token nakon "Bearer "
            SecretKey key = Keys.hmacShaKeyFor(serviceSecret.getBytes());
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
		} catch (Exception e) {
			throw new IllegalArgumentException("Unauthorized");
		}
        
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, String token, Patient updatedPatient) throws Exception {
    	if(jwt.extractClaims(token).get("role").equals("ROLE_PATIENT") && !jwt.extractClaims(token).get("id").toString().equals(id.toString()))
			throw new IllegalArgumentException("Unauthorized");
    	return patientRepository.findById(id)
    	        .map(patient -> {
    	            // da li je bar jedno polje u updatedPatientu ne-null
    	            boolean hasChanges = 
    	                updatedPatient.getName() != null || 
    	                updatedPatient.getEmail() != null || 
    	                updatedPatient.getPhoneNumber() != null || 
    	                updatedPatient.getMedicalHistory() != null;

    	            if (!hasChanges) {
    	                throw new IllegalArgumentException("No valid fields provided for update.");
    	            }

    	            // Ažurirajte samo ne-null vrednosti
    	            if (updatedPatient.getName() != null) {
    	                patient.setName(updatedPatient.getName());
    	            }
    	            if (updatedPatient.getEmail() != null) {
    	                patient.setEmail(updatedPatient.getEmail());
    	            }
    	            if (updatedPatient.getPhoneNumber() != null) {
    	                patient.setPhoneNumber(updatedPatient.getPhoneNumber());
    	            }
    	            if (updatedPatient.getMedicalHistory() != null) {
    	                patient.setMedicalHistory(updatedPatient.getMedicalHistory());
    	            }

    	            // Sačuvajte izmene
    	            return patientRepository.save(patient);
    	        })
    	        .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public void deletePatient(String authHeader, Long id) throws Exception {
    	//specific service-service autorization
    	if (authHeader == null || !authHeader.startsWith("Bearer ")) {
    		throw new IllegalArgumentException("Unauthorized");
        }
    	try {
            String token = authHeader.substring(7); // Uzmi token nakon "Bearer "
            SecretKey key = Keys.hmacShaKeyFor(serviceSecret.getBytes());
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
		} catch (Exception e) {
			throw new IllegalArgumentException("Unauthorized");
		}
        patientRepository.deleteById(id);
    }

    public List<Patient> searchPatients(String name, String email) throws Exception {
        if (name != null && email != null) {
            return patientRepository.findByNameAndEmail(name, email);
        } else if (name != null) {
            return patientRepository.findByName(name);
        } else if (email != null) {
            return patientRepository.findByEmail(email);
        } else {
            return patientRepository.findAll();
        }
    }
}
