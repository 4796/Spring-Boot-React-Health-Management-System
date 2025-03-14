package com.example.medicalrecordservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.medicalrecordservice.db.MedicalRecordRepository;
import com.example.medicalrecordservice.model.MedicalRecord;
import com.example.medicalrecordservice.util.JwtUtil;
import com.example.medicalrecordservice.util.RestClientUtil;
import com.example.medicalrecordservice.util.ServiceUtil;

import io.jsonwebtoken.Claims;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MedicalRecordService {
	 private final MedicalRecordRepository medicalRecordRepository;
	    private final JwtUtil jwtUtil;
	    private final RestClientUtil restClientUtil;
	    private final String patientServiceUrl;
	    private final ServiceUtil serviceUtil;

	    @Autowired
	    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository, JwtUtil jwtUtil,
	                                 RestClientUtil restClientUtil, @Value("${patient.service.url}") String patientServiceUrl, ServiceUtil serviceUtil) {
	        this.medicalRecordRepository = medicalRecordRepository;
	        this.jwtUtil = jwtUtil;
	        this.restClientUtil = restClientUtil;
	        this.patientServiceUrl = patientServiceUrl;
			this.serviceUtil = serviceUtil;
	    }

	//ako je doctor_id==-1, znaci da je doktor obrisan
	    
	    public Map<String, Object> getRecordWithPatientDetails(String token, Long recordId) throws Exception {
	        // Dohvatanje medicinskog izveštaja
	        MedicalRecord record = medicalRecordRepository.findById(recordId)
	                .orElseThrow(() -> new RuntimeException("Medical record not found"));
	        System.out.println("ovde1");
	       // if it is patinet, checks if it is theirs record
	        if(isPatient(token)) {
	        	Claims claims=jwtUtil.extractClaims(token);
	        	System.out.println(claims.get("id"));
	        	System.out.println(record.getPatientId().toString());
	        	if(!claims.get("id").toString().equals(record.getPatientId().toString()))
	        		throw new IllegalArgumentException("Unauthorized");
	        }
	        // Dohvatanje detalja o pacijentu
	        String url = patientServiceUrl + "/patients/" + record.getPatientId();
	        ResponseEntity<Map> response = restClientUtil.sendRequestWithToken(url, HttpMethod.GET, Map.class, token);

	        if (!response.getStatusCode().is2xxSuccessful()) {
	            throw new RuntimeException("Failed to fetch patient details");
	        }

	        Map<String, Object> result = new HashMap<>();
	        result.put("medicalRecord", record);
	        result.put("patientDetails", response.getBody());

	        return result;
	    }
	    
    public List<MedicalRecord> getAllRecords(String token, Long patientId) throws Exception {
    	// if it is patinet, checks if it is theirs record
        if(isPatient(token)) {
        	Claims claims=jwtUtil.extractClaims(token);

        	if(!claims.get("id").toString().equals(patientId.toString()))
        		throw new IllegalArgumentException("Unauthorized");
        }
        return medicalRecordRepository.findByPatientId(patientId);
    }

    public MedicalRecord createRecord(String token, MedicalRecord record) throws Exception {
    	//System.out.println(record);
    	if(record ==null || record.getDiagnosis()==null || record.getMedications()==null || record.getTreatment()==null || record.getPatientId()==null)
    		throw new IllegalArgumentException("Unauthorized");
        if(isPatient(token))
        	throw new IllegalArgumentException("Unauthorized");
        Claims claims=jwtUtil.extractClaims(token);
        Long doctorId=Long.valueOf(claims.get("id").toString()) ;
        checkPatient(record.getPatientId(), token);
        record.setRecordDate(LocalDateTime.now());
        record.setDoctorId(doctorId);
        return medicalRecordRepository.save(record);
    }



	public MedicalRecord updateRecord(String token, Long id, MedicalRecord record) throws Exception {
		if(isPatient(token))
			throw new IllegalArgumentException("Unauthorized");
		MedicalRecord r1=null;
		try {
			r1= medicalRecordRepository.findById(id).orElseThrow();
		} catch (Exception e) {
			throw new Exception("Non existent record");
		}
		//if its the right doctor
		if(!isRightDoctor(token, r1))
			throw new IllegalArgumentException("Unauthorized");
			
         if(record.getDiagnosis()!=null)
        	 r1.setDiagnosis(record.getDiagnosis());
         if(record.getMedications()!=null)
        	 r1.setMedications(record.getMedications());
         if(record.getTreatment()!=null)
        	 r1.setTreatment(record.getTreatment());
         r1.setRecordDate(LocalDateTime.now());
         return medicalRecordRepository.save(r1);
    }


	public void deleteRecord(String token, Long id) throws Exception {
    	if(isPatient(token))
    		throw new IllegalArgumentException("Unauthorized");
    	MedicalRecord record=null;
    	try {
    		record = medicalRecordRepository.findById(id).orElseThrow();
		} catch (Exception e) {
			throw new Exception("Non existent record");
		}
    	Claims claims = jwtUtil.extractClaims(token);
    	if(!claims.get("id").toString().equals(record.getDoctorId().toString()))
    		throw new IllegalArgumentException("Unauthorized");
        medicalRecordRepository.deleteById(id);
    }



	public List<MedicalRecord> searchRecords(String diagnosis, LocalDateTime startDate, LocalDateTime endDate, Long patientId, String token) throws Exception {
		if(isPatient(token)) {
			Claims claims=jwtUtil.extractClaims(token);
			if(!claims.get("id").toString().equals(patientId.toString()))
				throw new IllegalArgumentException("Unauthorized");
		}
		if (diagnosis != null && startDate != null && endDate != null) {
        return medicalRecordRepository.findByDiagnosisAndDateRange(diagnosis, startDate, endDate, patientId);
    } else if (diagnosis != null) {
        return medicalRecordRepository.findByDiagnosis(diagnosis, patientId);
    } else if (startDate != null && endDate != null) {
        return medicalRecordRepository.findByDateRange(startDate, endDate, patientId);
    } else {
        return medicalRecordRepository.findByPatientId(patientId);
    }
}
	
    public boolean isPatient(String token) throws Exception {

        return jwtUtil.extractClaims(token).get("role").toString().equals("ROLE_PATIENT");
        
    }
    
    //is token from the doctor of the record
    public boolean isRightDoctor(String token, MedicalRecord r1) throws Exception {
		Claims claims=jwtUtil.extractClaims(token);
		return claims.get("id").toString().equals(r1.getDoctorId().toString());
		
	}
    
   //checks if PatientServise has this patient 
    private void checkPatient(Long id, String token) throws Exception {
    	String url = patientServiceUrl + "/patients/" + id;
        ResponseEntity<Map> response = restClientUtil.sendRequestWithToken(url, HttpMethod.GET, Map.class, token);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to fetch patient details, or selected patient does not exist");
        }
		
	}


    @Transactional
	public void changeRecordsForDoctor(Long doctorId, String token) throws Exception {
		checkServerAuth(token);
		medicalRecordRepository.updateDoctorIdToMinusOne(doctorId);
	}


	@Transactional
	public void deleteRecordsForPatient(Long patientId, String token) throws Exception {
		checkServerAuth(token);
		medicalRecordRepository.deleteByPatientId(patientId);
	}
	
	public void checkServerAuth(String token) throws Exception {
		serviceUtil.validateToken(token);
	}

	
}