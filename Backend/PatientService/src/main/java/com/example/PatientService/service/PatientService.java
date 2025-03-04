package com.example.PatientService.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;

import com.example.PatientService.db.PatientRepository;
import com.example.PatientService.model.Patient;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.List;
import java.util.Optional;

import javax.crypto.SecretKey;

@Service
public class PatientService {
    private final PatientRepository patientRepository;
    @Value("${service.secret}")
    private String serviceSecret;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient createPatient(String authHeader, Patient patient) throws AuthorizationDeniedException {
    	//specific service-service autorization
    	if (authHeader == null || !authHeader.startsWith("Bearer ")) {
    		throw new AuthorizationDeniedException("");
        }
    	try {
            String token = authHeader.substring(7); // Uzmi token nakon "Bearer "
            SecretKey key = Keys.hmacShaKeyFor(serviceSecret.getBytes());
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
		} catch (Exception e) {
			throw new AuthorizationDeniedException("");
		}
        
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient updatedPatient) {
        return patientRepository.findById(id).map(patient -> {
            patient.setName(updatedPatient.getName());
            patient.setEmail(updatedPatient.getEmail());
            patient.setPhoneNumber(updatedPatient.getPhoneNumber());
            patient.setMedicalHistory(updatedPatient.getMedicalHistory());
            return patientRepository.save(patient);
        }).orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public void deletePatient(String authHeader, Long id) {
    	//specific service-service autorization
    	if (authHeader == null || !authHeader.startsWith("Bearer ")) {
    		throw new AuthorizationDeniedException("");
        }
    	try {
            String token = authHeader.substring(7); // Uzmi token nakon "Bearer "
            SecretKey key = Keys.hmacShaKeyFor(serviceSecret.getBytes());
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
		} catch (Exception e) {
			throw new AuthorizationDeniedException("");
		}
        patientRepository.deleteById(id);
    }

    public List<Patient> searchPatients(String name, String email) {
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
