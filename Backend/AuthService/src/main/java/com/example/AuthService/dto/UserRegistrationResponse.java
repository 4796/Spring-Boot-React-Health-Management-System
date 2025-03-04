package com.example.AuthService.dto;

public class UserRegistrationResponse extends BaseDto {
    private String userId;  


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
