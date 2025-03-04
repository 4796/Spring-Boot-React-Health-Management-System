package com.example.doctorService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.doctorService.db.DoctorRepository;
import com.example.doctorService.model.Doctor;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        return doctorRepository.findById(id).map(doctor -> {
            doctor.setName(updatedDoctor.getName());
            doctor.setPhoneNumber(updatedDoctor.getPhoneNumber());
            doctor.setSpecialization(updatedDoctor.getSpecialization());
            doctor.setSalary(updatedDoctor.getSalary());
            doctor.setHireDate(updatedDoctor.getHireDate());
            return doctorRepository.save(doctor);
        }).orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    public void adjustSalary(Long id, Double percentage) {
        Doctor doctor = getDoctorById(id);
        double newSalary = doctor.getSalary() * (1 + percentage / 100);
        doctor.setSalary(newSalary);
        doctorRepository.save(doctor);
    }
}
