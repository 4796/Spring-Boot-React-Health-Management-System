package com.example.appointmentservice.service;


import com.example.appointmentservice.db.AppointmentRepository;
import com.example.appointmentservice.model.Appointment;
import com.example.appointmentservice.util.JwtUtil;
import com.example.appointmentservice.util.RestClientUtil;
import com.example.appointmentservice.util.ServiceUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import javax.crypto.SecretKey;

@Service
public class AppointmentService {
	private final AppointmentRepository appointmentRepository;
    private final RestClientUtil restClientUtil;
    private final String patientServiceUrl;
    private JwtUtil jwtUtil;
    @Value("${service.secret}")
    private String serviceSecret; //za slanje
    @Autowired
    private ServiceUtil serviceUtil;//za primanje
    
    
    private List<String> listaSvihTermina;
    
    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, RestClientUtil restClientUtil,
                              @Value("${patient.service.url}") String patientServiceUrl, JwtUtil jwt) throws Exception {
        this.appointmentRepository = appointmentRepository;
        this.jwtUtil=jwt;
        this.restClientUtil = restClientUtil;
        this.patientServiceUrl = patientServiceUrl;
        listaSvihTermina=kreirajListuSvihTermina();
    }


	public List<Appointment> getAllAppointments(String token) {
    	//returns only appointments of specific doctor or patient from token
    	////////////////proveri da li je doktor ili pacijent i vrati im samo njihove podatke
    	if(isDoctor(token)) {
    		return appointmentRepository.findFutureAppointmentsByDocotorId( Long.valueOf(jwtUtil.extractClaims(token).get("id").toString()), LocalDateTime.now());
    	}
        //interceptor does not let admin, so now it has to be patient
    	return appointmentRepository.findFutureAppointmentsByPatientId( Long.valueOf(jwtUtil.extractClaims(token).get("id").toString()), LocalDateTime.now());
    }

   

	public Appointment bookAppointment(Appointment appointment, String token) throws Exception {
		
        if(appointment == null || appointment.getAppointmentTime()==null || appointment.getDoctorId()==null || appointment.getPatientId()==null || appointment.getType()==null)
        	throw new IllegalArgumentException("not enought arguments");
        //appointment time must be in the future
        if(appointment.getAppointmentTime().isBefore(LocalDateTime.now().plusMinutes(5)))
        	throw new IllegalArgumentException("Appointment must be in the future");
        
    	// provera da li postoji pacijent
        String url = patientServiceUrl + "/patients/" + appointment.getPatientId();
        ResponseEntity<Object> response=null;
        try {
        	response = restClientUtil.sendRequestWithToken(url, HttpMethod.GET, Object.class, token);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			if(e.getMessage().contains("401"))
				throw new IllegalArgumentException("Unauthorized");
			else
				throw new Exception("Unexpected error");
		}
        
        
        if (response==null || response.getStatusCode().is2xxSuccessful()) {
            System.out.println("Patient details arrived");
        } else {
            throw new RuntimeException("Failed to fetch patient details");
        }
        Map<String, Object> patientDetails = (Map<String, Object>) response.getBody();
        if (patientDetails == null || !patientDetails.containsKey("id")) {
            throw new RuntimeException("Invalid patient details received");
        }
        
        ///provera da li postoji doktor
        //bolje da provera doctor service ali jos ga nisam napravio
        String url2 = "https://localhost:8081/auth/admin/users/" + appointment.getDoctorId();
        ResponseEntity<Object> response2 = null;
        //da se generise token za servis
        String serviceToken=generateServiceToken();
        try {
        	 response2= restClientUtil.sendRequestWithToken(url2, HttpMethod.GET, Object.class, serviceToken);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			if(e.getMessage().contains("401"))
				throw new IllegalArgumentException("Unauthorized");
			else
				throw new Exception("Unexpected error");
		}
       

        if (response2==null || response2.getStatusCode().is2xxSuccessful()) {//na auth service strani se proverava da li je doktor
            System.out.println("Doctor details arrived");
        } else {
            throw new RuntimeException("Failed to fetch doctor details");
        }
        
///
        // Zakazivanje termina
        //provera da li je u okviru radnog vremena i da li je validan termin
        LocalDateTime vreme=appointment.getAppointmentTime();
        LocalDateTime start=vreme.withHour(8).withMinute(0);
        LocalDateTime end=vreme.withHour(13).withMinute(30);
        if(vreme.isBefore(start) || vreme.isAfter(end))
        	throw new IllegalArgumentException("Remeber that we work 8-14");
        int minuti=vreme.getMinute();
        if(minuti!=0 && minuti !=15 && minuti!=30 && minuti!=45)
        	throw new IllegalArgumentException("Choose one of the suggested appointment times");
        vreme=vreme.withSecond(0);
        vreme=vreme.withNano(0);
        List<Appointment> listOfAppointments =appointmentRepository.findFutureAppointmentsByDocotorId(appointment.getDoctorId(), LocalDateTime.now());
      for (Appointment a : listOfAppointments) {
			LocalDateTime newA=a.getAppointmentTime();
			if(newA.equals(vreme))
				throw new Exception("Your appointment time is already taken");
		}
        
        return appointmentRepository.save(appointment);
    }

    public void cancelAppointment(Long id, String token) throws Exception {
    	Appointment appointment=null;
    	try {
    		appointment=appointmentRepository.findById(id).orElseThrow();
		} catch (Exception e) {
			throw new Exception("Non existent appointment");
		}
    	Claims claims = jwtUtil.extractClaims(token);
    	if(isDoctor(token)) {
    		if(!appointment.getDoctorId().toString().equals(claims.get("id").toString()))
    			throw new IllegalArgumentException("Not your appointment");
    	}else {//patient(interceptor rejects admins)
    		
    		if(!appointment.getPatientId().toString().equals(claims.get("id").toString()))
    			throw new IllegalArgumentException("Unauthorized");
    	}
    	if(appointment.getAppointmentTime().isBefore(LocalDateTime.now()))
    		throw new IllegalArgumentException("Appointment is in the past");
        appointmentRepository.deleteById(id);
    }
    
    
     public boolean isDoctor(String token) {
		Claims claims=jwtUtil.extractClaims(token);
		return claims.get("role").toString().equals("ROLE_DOCTOR");
	}
     
     public boolean isDoctorsId(String token, Long id) {
 		Claims claims=jwtUtil.extractClaims(token);
 		return claims.get("id").toString().equals(id.toString());
 	}
    
     public boolean isPatient(String token) {
 		Claims claims=jwtUtil.extractClaims(token);
 		return claims.get("role").toString().equals("ROLE_PATIENT");
 	}
    
     
     public String generateServiceToken() throws Exception {
         	SecretKey key1 = Keys.hmacShaKeyFor(serviceSecret.getBytes());
         	return Jwts.builder()
                     .setIssuedAt(new Date())
                     .setExpiration(new Date(System.currentTimeMillis() + 3600 * 1000)) // Token ističe za 1 sat
                     .signWith(key1, SignatureAlgorithm.HS512) // Koristimo HMAC SHA-512
                     .compact();
 
         
         
     }

	public List<String> suggestAppointments(Long doctorId, String token, String datum) throws Exception {
		//autentikacija
		if(isDoctor(token)) {//token se proverava
			if(!isDoctorsId(token, doctorId))
				throw new IllegalArgumentException("Unauthorized");
		}else if (isPatient(token)) {//salje zahtev za proveru doctorService
			String url="https://localhost:8085/doctors/"+doctorId;
			///
			 ResponseEntity<Object> response = null;
		        try {
		        	 response= restClientUtil.sendRequestWithToken(url, HttpMethod.GET, Object.class, token);
				} catch (Exception e) {
					System.out.println(e.getMessage());
					if(e.getMessage().contains("401"))
						throw new IllegalArgumentException("Unauthorized");
					else
						throw new Exception("Unexpected error");
				}
		       

		        if (response==null || response.getStatusCode().is2xxSuccessful()) {
		            System.out.println("Doctor approved");
		        } else {
		            throw new RuntimeException("Failed to fetch doctor details");
		        }
			
			///
		}else {//admin
			throw new IllegalArgumentException("Unauthorized");
		}
		//kraj autentikacije
		LocalDateTime date=LocalDateTime.parse(datum+" 00:00", DateTimeFormatter.ofPattern("dd.MM.yyyy. HH:mm"));
		//krece od 8:00 i dodaje po pola sata i proverava da li je nesto zauzeto
		LocalDateTime start=date.withHour(8).withMinute(0);
		LocalDateTime end = date.withHour(14).withMinute(0);
		List<String> lista=new LinkedList<String>(listaSvihTermina);
		List<Appointment> zauzeti =appointmentRepository.findBookedAppointmentsByDoctorAndDate(doctorId, start, end);
		List<String> zausetiStringovi=new LinkedList<String>();
		for (Appointment z : zauzeti) {
			zausetiStringovi.add(z.getAppointmentTime().format(DateTimeFormatter.ofPattern("HH:mm")));
		}
		for (String time : zausetiStringovi) {
	        lista.remove(time);
	    }
		return lista;
		
	}
	
	
    private List<String> kreirajListuSvihTermina() throws Exception {
		LocalDateTime datum=LocalDateTime.now();//nebitan dan, bitni sati
		datum=datum.withHour(8).withMinute(0).withSecond(0).withNano(0);
		List<String> lista=new LinkedList<String>();
		LocalDateTime kraj=datum.withHour(13).withMinute(30);
		while(true) {
			String sat=""+datum.getHour();
			if(sat.length()==1)
				sat="0"+sat;
			String minuti=""+datum.getMinute();
			if(minuti.length()==1)
				minuti="0"+minuti;
			lista.add(sat+":"+minuti);
			datum=datum.plusMinutes(30);
			if(datum.equals(kraj))
				break;
		}
		return lista;
	}

    @Transactional
	public void cancelAppointmentsForPatient(Long patientId, String token) throws Exception {
		checkServerAuth(token);
		appointmentRepository.deleteByPatientId(patientId);
	}

    @Transactional
	public void cancelAppointmentsForDoctor(Long doctorId, String token) throws Exception {
		checkServerAuth(token);
		appointmentRepository.deleteByDoctorId(doctorId);
		
	}
	
	public void checkServerAuth(String token) throws Exception {
		serviceUtil.validateToken(token);
	}
	
}