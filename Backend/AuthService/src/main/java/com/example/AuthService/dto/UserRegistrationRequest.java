package com.example.AuthService.dto;

import java.time.LocalDate;

public class UserRegistrationRequest extends BaseDto {
    private String username;
    private String password;
    private String role;
    //patient and doctor
    private String name;
    private String phone_number;
    //patient
    private String email;
    private String medical_history;
    //doctor
    private LocalDate hire_date;
    private Double Salary;
    private String specialization;
    

    @Override
	public String toString() {
		return "UserRegistrationRequest [username=" + username + ", password=" + password + ", role=" + role + ", name="
				+ name + ", phone_number=" + phone_number + ", email=" + email + ", medical_history=" + medical_history
				+ ", hire_date=" + hire_date + ", Salary=" + Salary + ", specialization=" + specialization + "]";
	}

	public LocalDate getHire_date() {
		return hire_date;
	}

	public void setHire_date(LocalDate hire_date) {
		this.hire_date = hire_date;
	}

	public Double getSalary() {
		return Salary;
	}

	public void setSalary(Double salary) {
		Salary = salary;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
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

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getMedical_history() {
		return medical_history;
	}

	public void setMedical_history(String medical_history) {
		this.medical_history = medical_history;
	}

	// Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}