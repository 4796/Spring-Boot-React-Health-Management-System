package com.example.AuthService.service;



import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.AuthService.db.UserRepository;
import com.example.AuthService.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;



@Service
public class AuthService {
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${service.secret}")
    private String serviceSecret;

    private final RestTemplate restTemplate;
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, RestTemplate restTemplate) {
    	this.restTemplate = restTemplate;
		this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
 // Registracija korisnika
    public String registerUser(String token, String username, String password, String role, 
    		String name, String email, String phoneNumber, String medicalHistory, 
    		LocalDate hire_date, Double salary, String specialization) throws Exception {
    	if(username == null || username.length()<3 || username.length()>30)
    		throw new Exception("Username length is not valid");
    	if(password==null || password.length()<3 || password.length()>70)
    		throw new Exception("Password length is not valid");
    	if(role==null || !(role.equals("ROLE_PATIENT") || role.equals("ROLE_DOCTOR") || role.equals("ROLE_ADMIN")))
    		throw new Exception("Role value is not supported");
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // Hashujemo lozinku
        user.setRole(role); 
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isEmpty()) {
            throw new Exception("Username already exists"); // 
        }
        
        String maker = null;
        
        //cuva svakako pa ako dodje do greske onda se brise
        User savedUser = userRepository.save(user);//unapred se sacuva da bi se videlo da li dolazi do greske
        //lakse je prvo ovde pa da se salje, nego da se salje pa onda ovde, ako ovde doje do greske
        
        if(role.equals("ROLE_ADMIN") || role.equals("ROLE_DOCTOR")) {
        	maker=getRoleFromToken(token);
        	
        	if(!maker.equals("ROLE_ADMIN")) {
        		deleteUserLocalFunction(savedUser.getId());
        		throw new IllegalArgumentException("Unauthorized");
        	}
        	//admin making admin
        	if(role.equals("ROLE_ADMIN"))
        		return String.valueOf(savedUser.getId()); // Vraćamo ID registrovanog korisnika
        	//admin making doctor
        	String serviceToken=generateToken(null);  //poseban token za komunikaciju izmedju servisa
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + serviceToken);
            headers.setContentType(MediaType.APPLICATION_JSON);
            Map<String, String> telo=new HashMap<String, String>();
            telo.put("id", savedUser.getId().toString());
            telo.put("name", name);
            if(hire_date==null)
            	hire_date=LocalDate.now();
            telo.put("hireDate", hire_date.format(DateTimeFormatter.ofPattern("dd.MM.yyyy.")));// HH:mm
            telo.put("phoneNumber", phoneNumber);
            telo.put("salary", salary.toString());
            telo.put("specialization", specialization);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonBody = objectMapper.writeValueAsString(telo);
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers); 
            ResponseEntity<?> response=null;
             try {
            	 response = restTemplate.exchange("https://localhost:8085/doctors", HttpMethod.POST, entity, Object.class);
    		} catch (Exception e) {
    			e.printStackTrace();
    		}finally {
    	        if(response==null || !response.getStatusCode().is2xxSuccessful()) {
    	        	//needs to delete from its own db
    	        	deleteUserLocalFunction(savedUser.getId());
    	        	throw new Exception("Autorization problem or internal server error");
    	        }
    		}
             return String.valueOf(savedUser.getId()); // Vraćamo ID registrovanog korisnika
        }
        
        
        //sends new patient to patientDB
        if(role.equals("ROLE_PATIENT")) {
        	
        	String serviceToken=generateToken(null);  //poseban token za komunikaciju izmedju servisa
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + serviceToken);
            headers.setContentType(MediaType.APPLICATION_JSON);
            Map<String, String> telo=new HashMap<String, String>();
            telo.put("id", savedUser.getId().toString());
            telo.put("name", name);
            telo.put("email", email);
            telo.put("phoneNumber", phoneNumber);
            telo.put("medicalHistory", medicalHistory);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonBody = objectMapper.writeValueAsString(telo);
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers); 
            ResponseEntity<?> response=null;
             try {
            	 response = restTemplate.exchange("https://localhost:8082/patients", HttpMethod.POST, entity, Object.class);
    		} catch (Exception e) {
    			e.printStackTrace();
    		}finally {
    	        if(response==null || !response.getStatusCode().is2xxSuccessful()) {
    	        	//needs to delete from its own db
    	        	deleteUserLocalFunction(savedUser.getId());
    	        	throw new Exception("Autorization problem or internal server error");
    	        }
    		}
             
           
        }
        	
        
        
        return String.valueOf(savedUser.getId()); // Vraćamo ID registrovanog korisnika
    }

    // Autentikacija korisnika
    //Log in
    public boolean authenticate(String username, String password) throws Exception {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return false; // Korisnik ne postoji
        }
        User user = optionalUser.get();
        return passwordEncoder.matches(password, user.getPassword()); // Provera lozinke
    }
    
 

	public void deleteUser(Long id, String token) throws Exception  {
		//delete from patient too
		if(!validateToken(token))
			throw new IllegalArgumentException("Unauthorized");
		if(!isAdmin(token))
			throw new IllegalArgumentException("Unauthorized");
		String serviceToken=generateToken(null);   //poseban token za komunikaciju sa drugim servisom
        HttpHeaders headers = new HttpHeaders();   
        headers.set("Authorization", "Bearer " + serviceToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<?> response=null;
        String role =getUserLocal(id).getRole();
         try {
        	 if(role.equals("ROLE_PATIENT"))
        		 response = restTemplate.exchange("https://localhost:8082/patients/"+id, HttpMethod.DELETE, entity, Object.class);
        	 if(role.equals("ROLE_DOCTOR")) {
        		 response = restTemplate.exchange("https://localhost:8085/doctors/"+id, HttpMethod.DELETE, entity, Object.class);
        	 }
        		 
         } catch (Exception e) {
        	 System.out.println("User maybe deleted from authService but not from doctorService");
			e.printStackTrace();
		}finally {
			
	        if(response==null || !response.getStatusCode().is2xxSuccessful()) {
	        	userRepository.deleteById(id);
	        	throw new Exception("Autorization problem or internal server error");
	        }
		}

		///
		
        userRepository.deleteById(id);
    }
	
	//token not needed, its called only localy
	public void deleteUserLocalFunction(Long id) throws Exception  {
		//delete from patient too
		///
		String serviceToken=generateToken(null);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + serviceToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<?> response=null;
         try {
        	 response = restTemplate.exchange("https://localhost:8082/patients/"+id, HttpMethod.DELETE, entity, Object.class);
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			
	        if(response==null || !response.getStatusCode().is2xxSuccessful()) {
	        	userRepository.deleteById(id);
	        	throw new Exception("Autorization problem or internal server error");
	        }
		}

		///
		
        userRepository.deleteById(id);
    }

	public List<User> getAllUsers(String token) {
		if(!validateToken(token))
			throw new IllegalArgumentException("Unauthorized");
         if (!isAdmin(token)) 
                throw new IllegalArgumentException("Not authorized");	
		List<User> lista=userRepository.findAll();
		for(User u: lista) {
			u.setPassword("");
		}
        return lista;
    }

	public User getUser(Long id, String token) throws Exception {
		if(!validateServiceToken(token))
			throw new IllegalArgumentException("Unauthorized1");
		 User user =userRepository.findById(id).orElseThrow();
		 if(!user.getRole().equals("ROLE_DOCTOR"))
			 throw new Exception("Not valid doctor");
		 return user;
	}
	
	//no need for token, used localy
	public User getUserLocal(Long id) throws Exception {
		
		 User user =userRepository.findById(id).orElseThrow();
		 return user;
	}

	public User updateUser(User user, String token, Long id) throws Exception {
		if(user.getPassword()==null && user.getUsername()==null)
    		throw new IllegalArgumentException("Nothing to change");    
		if(!validateToken(token))
			throw new IllegalArgumentException("Unauthorized");

        user.setId(id);
        
        
        /////
		User u=getUserLocal(user.getId());
		Claims claims=extractClaims(token);
		if(!claims.get("id").toString().equals(id.toString()))
			throw new IllegalArgumentException("Unauthorized");
		if(user.getPassword()==null)
			user.setPassword(u.getPassword());
		else
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		if(user.getUsername()==null)
			user.setUsername(u.getUsername());
		user.setRole(u.getRole());//can not change role
		
		return userRepository.save(user);
	}
	
	
	
	// Generisanje JWT tokena
    public String generateToken(String username) throws Exception {
    	//when username is null, then it needs token for service-service comunication
        Map<String, Object> claims = new HashMap<>();
        if(username==null) {
        	SecretKey key1 = Keys.hmacShaKeyFor(serviceSecret.getBytes());
        	return Jwts.builder()
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 3600 * 1000)) // Token ističe za 1 sat
                    .signWith(key1, SignatureAlgorithm.HS512) // Koristimo HMAC SHA-512
                    .compact();
        }
        
        
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes()); // Kreiranje ključa iz tajnog stringa
        Optional<User> u=userRepository.findByUsername(username);
        if (u.isEmpty()) {
            throw new Exception("Authorization error"); // Korisnik ne postoji
        }
        User u1=u.get();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .claim("role", u1.getRole())
                .claim("id", u1.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600 * 1000)) // Token ističe za 1 sat
                .signWith(key, SignatureAlgorithm.HS512) // Koristimo HMAC SHA-512
                .compact();
    }

    // Validacija JWT tokena
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
    
    public boolean validateServiceToken(String token) {
        try {
        	SecretKey key = Keys.hmacShaKeyFor(serviceSecret.getBytes());
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            Date expiration = claims.getExpiration();
            if (expiration.before(new Date())) {
                return false; // Token je istekao
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    
    public Claims extractClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

	public boolean isAdmin(String token) {
		try {
            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes()); // Kreiranje ključa iz tajnog stringa
            Claims claims =(Claims) Jwts.parserBuilder() // Novi API za parsiranje tokena
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody(); 
            return claims.get("role").equals("ROLE_ADMIN");

        } catch (Exception e) {
        	//e.printStackTrace();
            return false; // Token nije validan
        }
	}
	
	public boolean isPatient(String token, String id) {
		try {
            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes()); // Kreiranje ključa iz tajnog stringa
            Claims claims =(Claims) Jwts.parserBuilder() // Novi API za parsiranje tokena
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody(); 
            if(!claims.get("role").equals("ROLE_PATIENT"))
            	return false;
            if(!claims.get("id").toString().equals(id))//wrong patient
            	return false;
            return true;
        } catch (Exception e) {
        	//e.printStackTrace();
            return false; // Token nije validan
        }
	}
	
	public Long getIdFromToken(String token) {
		try {
			SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes()); 
	        Claims claims =(Claims) Jwts.parserBuilder() 
	                .setSigningKey(key)
	                .build()
	                .parseClaimsJws(token)
	                .getBody(); 
	        return Long.valueOf(claims.get("id").toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (long) -1.0;
	}
	
	public String getRoleFromToken(String token) {
		try {
			SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes()); 
			
	        Claims claims =(Claims) Jwts.parserBuilder() 
	                .setSigningKey(key)
	                .build()
	                .parseClaimsJws(token)
	                .getBody(); 
	        return claims.get("role").toString();
		} catch (Exception e) {//service-service token
			e.printStackTrace();
			try {
				SecretKey key = Keys.hmacShaKeyFor(serviceSecret.getBytes()); 
				
		        Claims claims =(Claims) Jwts.parserBuilder() 
		                .setSigningKey(key)
		                .build()
		                .parseClaimsJws(token)
		                .getBody(); 
		        return claims.get("role").toString();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
			
		}
		
		return "";
	}
}
