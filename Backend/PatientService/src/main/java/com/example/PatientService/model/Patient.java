package com.example.PatientService.model;


import jakarta.persistence.*;

@Entity
public class Patient {
   

	//@Id
   // @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String medicalHistory;

    
    @Override
   	public String toString() {
   		return "Patient [id=" + id + ", name=" + name + ", email=" + email + ", phoneNumber=" + phoneNumber
   				+ ", medicalHistory=" + medicalHistory + "]";
   	}
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public void setId(String id) {
        this.id = Long.valueOf(id);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }
}
