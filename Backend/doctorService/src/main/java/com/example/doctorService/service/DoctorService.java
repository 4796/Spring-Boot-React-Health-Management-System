package com.example.doctorService.service;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;

import com.example.doctorService.db.DoctorRepository;
import com.example.doctorService.model.Doctor;
import com.example.doctorService.util.JwtForServices;
import com.example.doctorService.util.JwtUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final JwtForServices jwtServ;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, JwtUtil jwtUtil, JwtForServices jwtServ) {
        this.doctorRepository = doctorRepository;
		this.jwtUtil = jwtUtil;
		this.jwtServ = jwtServ;
    }

    public List<Doctor> getAllDoctors(String token) {
    	String role = getRole(token);
    	if(role.equals("ROLE_ADMIN")) {//needs all the information
    		 return doctorRepository.findAll();
    	}else {//only needs name and specialization
    		 List<Doctor> doktori =doctorRepository.findAll();
    		 LocalDate d=null;
    		 for (Doctor doctor : doktori) {
				doctor.setSalary(null);
				doctor.setHireDate(d);
				doctor.setPhoneNumber(null);
    		 }
    		 return doktori;
    	}
       
    }

    public Doctor getDoctorById(Long id, String token) {
    	String role=getRole(token);
    	if(role.equals("ROLE_ADMIN"))
    		return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    	else if(role.equals("ROLE_DOCTOR")) {
    		if(!getId(token).equals(id.toString()))  //doktor hoce podatke o drugom doktoru
    				throw new IllegalArgumentException("Unauthorized");
    		return doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
    	}else {//pacijent
    		Doctor doctor = doctorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
    		//ako nije bacio gresku
    		return null;
    	}
    		
    }

    public Doctor createDoctor(Doctor doctor, String token) {
    	System.out.println(doctor);
    	boolean input = 
    			doctor.getName() != null && 
                doctor.getSalary() != null && 
                doctor.getPhoneNumber() != null && 
                doctor.getId() != null &&
    			doctor.getSpecialization() != null;

            if (!input) {
                throw new IllegalArgumentException("Not enough information to create new doctor.");
            }
            if(!jwtServ.validateToken(token))
            	throw new IllegalArgumentException("Unauthorized");
        	
            doctor.setHireDate(LocalDate.now());
            
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        return doctorRepository.findById(id).map(doctor -> {
            doctor.setName(updatedDoctor.getName());
            doctor.setPhoneNumber(updatedDoctor.getPhoneNumber());
            doctor.setSpecialization(updatedDoctor.getSpecialization());
            doctor.setSalary(updatedDoctor.getSalary());
            doctor.setHireDate(updatedDoctor.getHireDate());
            return doctorRepository.save(doctor);
        }).orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public void deleteDoctor(Long id, String token) {
    	if(!jwtServ.validateToken(token))
        	throw new IllegalArgumentException("Unauthorized");
        doctorRepository.deleteById(id);
    }

    public void adjustSalary(Long id, Double percentage, String sign, String token) {
        Doctor doctor = getDoctorById(id, token);//proverava da li je admin
        double newSalary=0;
        if(sign.equals("+"))
        	newSalary = doctor.getSalary() * (1 + percentage / 100);
        else if(sign.equals("-"))
        	newSalary = doctor.getSalary() * (1 - percentage / 100);
        else
        	throw new IllegalArgumentException("Should salary get better or worse?");
        doctor.setSalary(newSalary);
        doctorRepository.save(doctor);
    }

	public void updatePhoneNumber(String token, String newPhoneNumber) throws Exception {
		if(newPhoneNumber==null || newPhoneNumber.length()==0)
			throw new IllegalArgumentException("You must insert new phone number");
		if(!getRole(token).equals("ROLE_DOCTOR"))
			throw new IllegalArgumentException("Unauthorized");
		Doctor doctor=doctorRepository.findById(Long.valueOf(getId(token))).orElseThrow( () -> new Exception("Doctor not found"));
		doctor.setPhoneNumber(newPhoneNumber);
		doctorRepository.save(doctor);
		
	}
	
	public String getRole(String token) {
		Claims claims=jwtUtil.extractClaims(token);
		return claims.get("role").toString();
		
	}
	
	public String getId(String token) {
		Claims claims=jwtUtil.extractClaims(token);
		return claims.get("id").toString();
		
	}

//	public Doctor getSelf(String token) {
//		// TODO Auto-generated method stub
//		//samo uzme id iz tokena i pozove getById
//		return null;
//	}
}
