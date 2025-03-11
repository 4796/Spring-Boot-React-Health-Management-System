package com.example.medicalrecordservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice 
public class GlobalExceptionHandler {

    // Handler za IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {

    	return new ResponseEntity<>("Invalid input: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // Handler za NullPointerException
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException(NullPointerException ex) {
      ex.printStackTrace();
    	return new ResponseEntity<>("Null pointer error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handler za bilo koji drugi izuzetak
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) 
    public ResponseEntity<?> handleGenericException(Exception ex) {
    	ex.printStackTrace();
    	return new ResponseEntity<>("An error occurred: " + ex.getMessage()+" (mr)", HttpStatus.INTERNAL_SERVER_ERROR);
    	
    }
}