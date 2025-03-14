package com.example.doctorService.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Doctor {
	
    @Id
    private Long id;

    private String name;
    private String phoneNumber;
    private String specialization; // Specijalizacija (npr., "Kardiolog", "Opšta praksa")
    private Double salary;
    private LocalDate hireDate;
    private String imageUrl;

    public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	@Override
	public String toString() {
		return "Doctor [id=" + id + ", name=" + name + ", phoneNumber=" + phoneNumber + ", specialization="
				+ specialization + ", salary=" + salary + ", hireDate=" + hireDate + "]";
	}
	// Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }

    public LocalDate getHireDate() { return hireDate; }
    public void setHireDate(LocalDate hireDate) { this.hireDate = hireDate; }
    public void setHireDate(String time) {
    	try {
    		this.hireDate = LocalDate.parse(time, DateTimeFormatter.ofPattern("dd.MM.yyyy. HH:mm"));
		} catch (Exception e) {
			try {
				this.hireDate = LocalDate.parse(time, DateTimeFormatter.ofPattern("dd.MM.yyyy."));
			} catch (Exception e2) {
				e2.printStackTrace();
			}
			
		}

       
    }
}
