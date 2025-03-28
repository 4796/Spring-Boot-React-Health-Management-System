package com.example.medicalrecordservice.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String jwtSecret;

    public Claims extractClaims(String token) throws Exception {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) throws Exception {
        try {
            Claims claims = extractClaims(token);
            Date expiration = claims.getExpiration();
            if (expiration.before(new Date())) {
                return false; // Token je istekao
            }

            		
        } catch (Exception e) {
        	e.printStackTrace();
            return false;
        }
       
        return true;
    }
}
