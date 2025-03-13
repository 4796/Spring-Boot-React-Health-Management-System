package com.example.gateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.cert.CertificateExpiredException;
import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtFilter extends AbstractGatewayFilterFactory<JwtFilter.Config> {
	private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
	
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
        //	System.out.println("AAA");
            ServerHttpRequest request = exchange.getRequest();
            String authHeader = request.getHeaders().getFirst("Authorization");
            int a=1;
            if(authHeader==null || authHeader.length()==0)
            	a=0;
            String pat = request.getURI().getPath();
            System.out.println(request.getMethod().toString()+" uri: "+request.getURI()+"  auth:"+a);
            logger.info(request.getMethod().toString()+" uri: "+request.getURI()+"  auth:"+a);
            // Preskačemo autentikaciju za /auth/** rute
            if (pat.startsWith("/auth")) {  // service will take care of it
                return chain.filter(exchange);
            }

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String token = authHeader.substring(7);
            
            // Provera da li je token za klijenta ili servis
            try {
                // Prvo pokušavamo sa klijentskim secret-om, ako nije klijent onda baca gresku
                SecretKey clientKey = Keys.hmacShaKeyFor(clientSecret.getBytes());
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(clientKey)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                return chain.filter(exchange);
            }catch (ExpiredJwtException e) { //istekao token HttpStatus.FORBIDDEN
            	exchange.getResponse().setStatusCode(HttpStatusCode.valueOf(419));
                return exchange.getResponse().setComplete();
            }
            catch (Exception clientEx) {
                try {
                    // Pokušavamo sa servisnim secret-om
                    SecretKey serviceKey = Keys.hmacShaKeyFor(serviceSecret.getBytes());
                    Claims claims = Jwts.parserBuilder()
                            .setSigningKey(serviceKey)
                            .build()
                            .parseClaimsJws(token)
                            .getBody();


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
