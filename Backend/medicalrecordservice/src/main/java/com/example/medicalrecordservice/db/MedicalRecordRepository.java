package com.example.medicalrecordservice.db;

import com.example.medicalrecordservice.model.MedicalRecord;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
	
	List<MedicalRecord> findByPatientId(Long patientId);
	
	@Query("SELECT r FROM MedicalRecord r WHERE r.diagnosis like :diagnosis and r.patientId= :patient")
    List<MedicalRecord> findByDiagnosis(@Param("diagnosis") String diagnosis, @Param("patient") Long patient);
    
    @Query("SELECT r FROM MedicalRecord r WHERE r.recordDate BETWEEN :startDate AND :endDate and r.patientId= :patient")
    List<MedicalRecord> findByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, @Param("patient") Long patient);

    @Query("SELECT r FROM MedicalRecord r WHERE r.diagnosis like :diagnosis AND r.recordDate BETWEEN :startDate AND :endDate and r.patientId= :patient")
    List<MedicalRecord> findByDiagnosisAndDateRange(@Param("diagnosis") String diagnosis, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, @Param("patient") Long patient);
}