package com.example.appointmentservice.controller;

import com.example.appointmentservice.model.Appointment;
import com.example.appointmentservice.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
    ///////////////proveri da li appoinment time je okej, neka appointment traje npr 15 minuta, samo da li doktoru odgovara
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
    
    
    //dalje
    //funkcija koja daje predloge kada moze da se zakaze
    //appointmentSuggestions
    //daje predlog nekoliko doktora
    //uzimace podatke iz aplikacije koja cuva doktore za ime doktora i koji je tip doktora
    //mozda da navede i opciono dan kada zeli da zakaze
}