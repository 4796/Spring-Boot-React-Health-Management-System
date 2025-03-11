package com.example.appointmentservice.interceptor;

import com.example.appointmentservice.util.JwtUtil;
import com.example.appointmentservice.util.ServiceUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

        String token = authHeader.substring(7); 
        try {//ako je service-service, bacice gresku
        	if (!jwtUtil.validateToken(token)) {
                throw new Exception();
            }
            
            if(jwtUtil.extractClaims(token).get("role").toString().equals("ROLE_ADMIN"))
            	return false;
		} catch (Exception e) {//provera da li je service-service
			if (!serviceUtil.validateToken(token)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return false;
            }
		}
        

        return true; // Token je validan, nastavi dalje
    }
}
