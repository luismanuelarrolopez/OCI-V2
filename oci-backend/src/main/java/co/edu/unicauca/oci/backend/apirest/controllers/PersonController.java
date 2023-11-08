package co.edu.unicauca.oci.backend.apirest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.services.IPersonService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PersonController {

    @Autowired
    private IPersonService servicePerson;

    @GetMapping("/persons")
    public ResponseEntity<?> findAllPersons() {
        return ResponseEntity.ok(this.servicePerson.findAllPersons());
    }

}