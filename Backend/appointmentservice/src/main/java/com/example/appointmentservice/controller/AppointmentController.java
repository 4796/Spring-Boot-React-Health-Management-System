package com.example.appointmentservice.controller;

import com.example.appointmentservice.model.Appointment;
import com.example.appointmentservice.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    //only specific patient and specific doctor
    //mora da se menja zahtev za repo na osnovu podataka iz tokena
    //vraca samo buduce zakazane
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments(@RequestHeader("Authorization") String token) {
    	token=token.substring(7);//bearer
        return ResponseEntity.ok(appointmentService.getAllAppointments(token));
    }

    //only specific patient or doctor
    //proveri da li je id osobe iz tokena taj koji je dat kao parametar
    //date "dd.MM.yyyy. HH:mm"
    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(
           @RequestBody Appointment appointment,
            @RequestHeader("Authorization") String token) throws Exception {
        return ResponseEntity.ok(appointmentService.bookAppointment(appointment, token.substring(7)));
    }
    

    //only specific patient or doctor
    //moram da procitam appointment po id, pa da proverim da taj appointment odgovara osobi iz tokena
    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long appointmentId, @RequestHeader("Authorization") String token) throws Exception {
        appointmentService.cancelAppointment(appointmentId, token.substring(7));
        //ako dodje do greske, intercepter vraca response umesto ovoga
        return ResponseEntity.noContent().build();
    }
    
    

    //funkcija koja daje predloge kada moze da se zakaze
    //izabran je doktor i izabran je dan, vracaju se slobodni termini tog dana kod tog doktora
    //ako je doktor onda se doktor id uzima od njegovog tokena i proverava da li je to on, 
    //a ako je pacijent, onda se samo salje id doktora i proverava se da li doktor postoji u doctorService
    //svakako vraca isti return, vraca stringove u formatu hh:mm koji su slobodni termini tog dana
    @GetMapping("/suggestions/{doctorId}") //dd.MM.yyyy.
    public ResponseEntity<List<String>> suggestAppointments(@PathVariable Long doctorId, @RequestHeader("Authorization") String token, @RequestHeader("datum") String datum) throws Exception {
        return ResponseEntity.ok(appointmentService.suggestAppointments(doctorId, token.substring(7), datum));
    }
}