package com.example.doctorService.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.example.doctorService.util.JwtForServices;
import com.example.doctorService.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private JwtForServices jwtServ;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return false;
        }
        String token = authHeader.substring(7); // Uzmi token nakon "Bearer "
        if (!jwtUtil.validateToken(token)) {
        	if(!jwtServ.validateToken(token)) {
        		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return false;
        	} 
        }
        return true; // Token je validan, nastavi dalje
    }
}
