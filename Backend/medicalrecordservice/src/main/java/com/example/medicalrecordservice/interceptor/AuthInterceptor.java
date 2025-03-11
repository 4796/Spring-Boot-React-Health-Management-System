package com.example.medicalrecordservice.interceptor;

import com.example.medicalrecordservice.util.JwtUtil;
import com.example.medicalrecordservice.util.ServiceUtil;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.security.Provider.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private ServiceUtil serviceUtil;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return false;
        }
        String token = authHeader.substring(7); // Uzmi token nakon "Bearer "
        //                 response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
        try {//normalni zahtev
        	 if (!jwtUtil.validateToken(token)) {
                 throw new Exception();
                 
             }
             Claims claims = jwtUtil.extractClaims(token);
             if(claims.get("role").toString().equals("ROLE_ADMIN"))
             	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Not authorized");
		} catch (Exception e) {//service-service zahtev
			if (!serviceUtil.validateToken(token)) {
                 response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                 return false;
             }
		}
        
       
        return true; // Token je validan, nastavi dalje
    }
}
