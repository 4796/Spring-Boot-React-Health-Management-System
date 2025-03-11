package com.example.medicalrecordservice.util;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class ServiceUtil {
    @Value("${service.secret}")
    private String jwtSecret;

    public Claims extractClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = extractClaims(token);
            Date expiration = claims.getExpiration();
            if (expiration.before(new Date())) {
                return false; // Token je istekao
                
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    
}
