package com.example.medicalrecordservice.interceptor;

import com.example.medicalrecordservice.util.JwtUtil;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return false;
        }

        String token = authHeader.substring(7); // Uzmi token nakon "Bearer "
        if (!jwtUtil.validateToken(token)) {
        	System.out.println("WTF");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            return false;
        }

        Claims claims = jwtUtil.extractClaims(token);
        if(claims.get("role").toString().equals("ROLE_ADMIN"))
        	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Not authorized");
        return true; // Token je validan, nastavi dalje
    }
}
