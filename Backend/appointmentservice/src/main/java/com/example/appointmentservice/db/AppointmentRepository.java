package com.example.appointmentservice.db;

import com.example.appointmentservice.model.Appointment;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	
	 // a filtrira po patientId i appointment_time u budućnosti
    @Query("SELECT a FROM Appointment a WHERE a.patientId = :patientId AND a.appointmentTime > :currentDateTime")
    List<Appointment> findFutureAppointmentsByPatientId(@Param("patientId") Long patientId, @Param("currentDateTime") LocalDateTime currentDateTime);
	
	List<Appointment> findByPatientId(Long patientId);
	
	
	@Query("SELECT a FROM Appointment a " +
		       "WHERE a.doctorId = :doctorId " +
		       "AND a.appointmentTime BETWEEN :start AND :end")
		List<Appointment> findBookedAppointmentsByDoctorAndDate(
		    @Param("doctorId") Long doctorId,
		    @Param("start") LocalDateTime start,
		    @Param("end") LocalDateTime end);
	
	@Query("SELECT a FROM Appointment a WHERE a.doctorId = :doctorId AND a.appointmentTime > :currentDateTime")
    List<Appointment> findFutureAppointmentsByDocotorId(@Param("doctorId") Long doctorId, @Param("currentDateTime") LocalDateTime currentDateTime);
	
	List<Appointment> findByDoctorId(Long doctorId);
	
	//kada se brise doctor user
	void deleteByDoctorId(Long doctorId);
	
	//kada se brise patient user
	void deleteByPatientId(Long patientId);
	
}