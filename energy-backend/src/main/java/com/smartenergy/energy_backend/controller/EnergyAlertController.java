package com.smartenergy.energy_backend.controller;

import com.smartenergy.energy_backend.model.User;
import com.smartenergy.energy_backend.repository.UserRepository;
import com.smartenergy.energy_backend.service.EnergyAlertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin
public class EnergyAlertController {

    private final EnergyAlertService alertService;
    private final UserRepository userRepository;

    public EnergyAlertController(
            EnergyAlertService alertService,
            UserRepository userRepository) {

        this.alertService = alertService;
        this.userRepository = userRepository;
    }

    @GetMapping("/{email}")
    public ResponseEntity<String> getAlert(@PathVariable String email) {

        return userRepository.findByEmail(email)
                .map(user -> {
                    String message = alertService.getAlertMessage(user);
                    return ResponseEntity.ok(message);
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
