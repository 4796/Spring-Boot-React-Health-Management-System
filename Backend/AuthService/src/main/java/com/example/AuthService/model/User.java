package com.example.AuthService.model;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String username;
    private String password;
    private String role;  // ROLE_PATIENT or ROLE_DOCTOR
}
