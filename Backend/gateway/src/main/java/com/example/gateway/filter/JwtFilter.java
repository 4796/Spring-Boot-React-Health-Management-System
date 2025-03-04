package com.example.gateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtFilter extends AbstractGatewayFilterFactory<JwtFilter.Config> {

    @Value("${jwt.secret}")
    private String clientSecret;

    @Value("${service.secret}")
    private String serviceSecret;

    public JwtFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String authHeader = request.getHeaders().getFirst("Authorization");

            // Preskačemo autentikaciju za /auth/** rute
            if (request.getURI().getPath().startsWith("/auth")) {
                return chain.filter(exchange);
            }

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String token = authHeader.substring(7);
            
            // Provera da li je token za klijenta ili servis
            try {
                // Prvo pokušavamo sa klijentskim secret-om
                SecretKey clientKey = Keys.hmacShaKeyFor(clientSecret.getBytes());
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(clientKey)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                // Provera isteka tokena
                if (claims.getExpiration().before(new Date())) {
                    throw new RuntimeException("Token expired");
                }

                return chain.filter(exchange);
            } catch (Exception clientEx) {
                try {
                    // Pokušavamo sa servisnim secret-om
                    SecretKey serviceKey = Keys.hmacShaKeyFor(serviceSecret.getBytes());
                    Claims claims = Jwts.parserBuilder()
                            .setSigningKey(serviceKey)
                            .build()
                            .parseClaimsJws(token)
                            .getBody();

                    // Provera da li je token za servis
                    if (!"service".equals(claims.getSubject())) {
                        throw new RuntimeException("Invalid service token");
                    }

                    // Provera isteka tokena
                    if (claims.getExpiration().before(new Date())) {
                        throw new RuntimeException("Service token expired");
                    }

                    return chain.filter(exchange);
                } catch (Exception serviceEx) {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }
            }
        };
    }

    public static class Config {}
}
