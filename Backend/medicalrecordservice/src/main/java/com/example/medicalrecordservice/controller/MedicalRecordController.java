package com.example.medicalrecordservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.medicalrecordservice.model.MedicalRecord;
import com.example.medicalrecordservice.service.MedicalRecordService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/medical-records")
public class MedicalRecordController {
    private final MedicalRecordService medicalRecordService;

    @Autowired
    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }
    ///////da dodam u bazi podataka da se cuva i doctor koji je napravio na osnovu id iz tokena
    
    
    

//da li treba ova fja za validaciju da postoji uopste, mozda da je izmenim samo da proverava da li je admin, tj ako je admin da baci gresku
//pa samo ako je pacijent da se proveravaju ostale stvari, a ako nije pacijent onda je doctor i onda je svakako okej    
//ima vise tih za validaciju fja    
    
    //returns map of patient details and specific record
    //ako je pacijent, kad procita record iz baze,  da proveri da li u recordu pise da je bas taj pacijent iz tokena
    //ako je doctor onda je sve okej
    @GetMapping("/{recordId}/with-patient")
    public ResponseEntity<Map<String, Object>> getRecordWithPatientDetails(
            @RequestHeader("Authorization") String token,
            @PathVariable Long recordId) throws Exception {
        String jwtToken = token.substring(7); // Uklanja "Bearer " prefiks
        return ResponseEntity.ok(medicalRecordService.getRecordWithPatientDetails(jwtToken, recordId));
    }
    
    
    //promeni da uzima samo records za odredjenu osobu, osobu koja je data kao header
    //ako je pacijent, proveri da li je iz tokena 
  //posto moze i doktorov token da bude, mora da prosledi i id pacijenta
    @GetMapping
    public ResponseEntity<List<MedicalRecord>> getAllRecords(@RequestHeader("Authorization") String token, @RequestHeader("Patient") Long patientId) throws Exception {
        String jwtToken = token.substring(7); // Uklanja "Bearer " prefiks
        return ResponseEntity.ok(medicalRecordService.getAllRecords(jwtToken, patientId));
    }

    //only doctor
    @PostMapping
    public ResponseEntity<MedicalRecord> createRecord(
            @RequestHeader("Authorization") String token, @RequestBody MedicalRecord newRecord) throws Exception {
        String jwtToken = token.substring(7);
        return ResponseEntity.ok(medicalRecordService.createRecord(jwtToken, newRecord));
    }

    /////
//    @RequestParam Long patientId,
//    @RequestParam String diagnosis,
//    @RequestParam String treatment,
//    @RequestParam String medications
    
    //////
    //only doctor from record
    @PutMapping("/{recordId}")
    public ResponseEntity<MedicalRecord> updateRecord(
            @RequestHeader("Authorization") String token, @PathVariable Long recordId, @RequestBody MedicalRecord newRecord) throws Exception {
        String jwtToken = token.substring(7);
        return ResponseEntity.ok(medicalRecordService.updateRecord(jwtToken, recordId, newRecord));
    }
    ///

//    @RequestParam String diagnosis,
//    @RequestParam String treatment,
//    @RequestParam String medications
    ////
  //only doctor from record
    @DeleteMapping("/{recordId}")
    public ResponseEntity<Void> deleteRecord(@RequestHeader("Authorization") String token, @PathVariable Long recordId) throws Exception {
        String jwtToken = token.substring(7);
        medicalRecordService.deleteRecord(jwtToken, recordId);
        return ResponseEntity.noContent().build();
    }
    
    //only specific patient and any doctor 
    //promeni, neka vraca samo recorde jednog pacijenta, koji se prosledi kao parametar neki ili slicno
    @GetMapping("/search")
    public ResponseEntity<List<MedicalRecord>> searchRecords(
            @RequestParam(required = false) String diagnosis,
            @RequestParam(required = false) LocalDateTime startDate,
            @RequestParam(required = false) LocalDateTime endDate,
            @RequestHeader("Authorization") String token,
            @RequestHeader("Patient") Long patientId) {
    	token = token.substring(7);
        List<MedicalRecord> records = medicalRecordService.searchRecords(diagnosis, startDate, endDate, patientId, token);
        return ResponseEntity.ok(records);
    }
}