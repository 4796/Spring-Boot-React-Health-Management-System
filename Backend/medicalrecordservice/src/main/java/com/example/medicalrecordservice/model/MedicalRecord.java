package com.example.medicalrecordservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long patientId; // ID pacijenta
    private Long doctorId; // ID pacijenta
    private String diagnosis; // Dijagnoza
    private String treatment; // Terapija ili preporučeni tretman
    private String medications; // Propisani lekovi
    private LocalDateTime recordDate; // Datum kreiranja izveštaja

    @Override
	public String toString() {
		return "MedicalRecord [id=" + id + ", patientId=" + patientId + ", doctorId=" + doctorId + ", diagnosis="
				+ diagnosis + ", treatment=" + treatment + ", medications=" + medications + ", recordDate=" + recordDate
				+ "]";
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	// Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public String getMedications() {
        return medications;
    }

    public void setMedications(String medications) {
        this.medications = medications;
    }

    public LocalDateTime getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(LocalDateTime recordDate) {
        this.recordDate = recordDate;
    }
}
