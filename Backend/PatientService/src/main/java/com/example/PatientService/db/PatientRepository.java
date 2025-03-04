package com.example.PatientService.db;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.PatientService.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
   // List<Patient> findByName(String name);

  //  List<Patient> findByEmail(String email);

    @Query("SELECT p FROM Patient p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) AND LOWER(p.email) LIKE LOWER(CONCAT('%', :email, '%'))")
    List<Patient> findByNameAndEmail(@Param("name") String name, @Param("email") String email);
    
    @Query("SELECT p FROM Patient p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Patient> findByName(String name);

    @Query("SELECT p FROM Patient p WHERE LOWER(p.email) LIKE LOWER(CONCAT('%', :email, '%'))")
    List<Patient> findByEmail(String email);
}