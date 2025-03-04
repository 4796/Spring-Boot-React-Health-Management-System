package com.example.PatientService.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.example.PatientService.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtUtil jwtUtil;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	//for creating and deleting, authorization has to be implemented separately
    	if(request.getRequestURL().toString().equals("https://localhost:8082/patients") && request.getMethod().equals("POST"))
    		return true;
    	//delete
    	if(request.getRequestURL().toString().contains("https://localhost:8082/patients/") && request.getMethod().equals("DELETE"))
    		return true;
    	
    	//normal auth
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return false;
        }

        String token = authHeader.substring(7); // Uzmi token nakon "Bearer "
        if (!jwtUtil.validateToken(token)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            return false;
        }
        return true; // Token je validan, nastavi dalje
    }
}