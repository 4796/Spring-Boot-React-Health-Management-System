package com.example.doctorService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.doctorService.model.Doctor;
import com.example.doctorService.service.DoctorService;

@RestController
@RequestMapping("/doctors")
public class DoctorController {
    private final DoctorService doctorService;
//ovde salju zahteve od servisa AuthSerice kad se pravi novi doktor i appointmentService kad pravi predloge za appointmente
//auth koristi service-service token, a appointment koristi token klijenta
    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    //treba za predloge za appointment i treba adminu
    //dakle servis-servis i admin
    //doktor i pacijent mogu da dobiju ime i specijalizaciju i sliku
    //servis ce slati token od doktora ili pacijenta koji vec ima
    //admin sve info
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors(@RequestHeader("Authorization") String token) throws Exception {
    	token=token.substring(7);
        return ResponseEntity.ok(doctorService.getAllDoctors(token));
    }

    
    //admin, i doktor za sebe licno moze da izvuce sve podatke
    //pacijent moze samo da proveri da li postoji, ali ne moze da dobije podatke
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id, @RequestHeader("Authorization") String token) throws Exception {
    	token=token.substring(7);
    	return ResponseEntity.ok(doctorService.getDoctorById(id, token));
    }
    

    //only service-service, only authService, in authServise only admin
    @PostMapping(consumes = "application/json")
    public ResponseEntity<Doctor> createDoctor(@RequestHeader("Authorization") String token, @RequestBody Doctor doctor) throws Exception {
    	token=token.substring(7);
    	return ResponseEntity.ok(doctorService.createDoctor(doctor, token));
    }

    //doktor licno
    @PatchMapping("/me/update-phone")
    public ResponseEntity<?> updatePhoneNumber(
            @RequestHeader("Authorization") String token,
            @RequestParam String phoneNumber) throws Exception {
    	token=token.substring(7);
    	doctorService.updatePhoneNumber(token, phoneNumber);
        return ResponseEntity.ok().build();
    }
    
  //valjda prvo id pa onda adjust salary
    //+- moze header da bude na primer
    //samo admin
    @PatchMapping("/{id}/adjust-salary")
    public ResponseEntity<Void> adjustSalary(
            @PathVariable Long id,
            @RequestParam Double percentage,
            @RequestHeader("Authorization") String token,
            @RequestHeader("Sign") String sign) throws Exception {
    	token=token.substring(7);
    	doctorService.adjustSalary(id, percentage, sign, token);
        return ResponseEntity.ok().build();
    }
    
    //realno ne treba
    //admin
    //mozda patch
//    @PutMapping("/{id}")
//    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
//        return ResponseEntity.ok(doctorService.updateDoctor(id, doctor));
//    }

    
    
    
    //only service-service from authService
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id, @RequestHeader("Authorization") String token) throws Exception {
    	token=token.substring(7);
    	doctorService.deleteDoctor(id, token);
        return ResponseEntity.noContent().build();
    }

    
}
