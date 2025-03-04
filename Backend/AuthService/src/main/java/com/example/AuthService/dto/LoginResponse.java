package com.example.AuthService.dto;

public class LoginResponse extends BaseDto {
	private Long id;  
    private String token;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	// Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}