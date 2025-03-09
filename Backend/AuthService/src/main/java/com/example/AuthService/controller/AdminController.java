package com.example.AuthService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.AuthService.model.User;
import com.example.AuthService.service.AuthService;

@RestController
@RequestMapping("/auth/admin")
public class AdminController {
    @Autowired
    private AuthService authService;

    //only admin
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestHeader("Authorization") String token) throws Exception {
    	token = token.substring(7);
    	return ResponseEntity.ok(authService.getAllUsers(token));
    	
    }

    //only admin 
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, @RequestHeader("Authorization") String token) throws Exception {
        
        	token = token.substring(7);
            authService.deleteUser(id, token);
            return ResponseEntity.noContent().build();
    }
    
    //only user can update itself
    @PatchMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestHeader("Authorization") String token, @RequestBody User user) throws Exception {
    	token=token.substring(7);
        User u =authService.updateUser(user, token, id);
        return ResponseEntity.ok(u);
    }
    
    
    //samo za serivce-service komunikaciju
    //za proveru da li postoji doktor za appointment koji treba da se napravi
    //ne zelim da neko dobija podatke o userima, za sad sluzi da proveri da li postoji i proverava da li je doktor
   // a funkcija iz authService klase ce dati podatke o useru samo u okviru servisa
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id, @RequestHeader("Authorization") String token) throws Exception {
    	token=token.substring(7);
    		authService.getUser(id, token);
            return ResponseEntity.ok().build();
    }
}