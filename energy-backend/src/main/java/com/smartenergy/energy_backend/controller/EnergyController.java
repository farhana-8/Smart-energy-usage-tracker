package com.smartenergy.energy_backend.controller;

import com.smartenergy.energy_backend.dto.EnergyUsageRequestDTO;
import com.smartenergy.energy_backend.model.EnergyUsage;
import com.smartenergy.energy_backend.service.EnergyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/energy")
public class EnergyController {

    private final EnergyService energyService;

    public EnergyController(EnergyService energyService) {
        this.energyService = energyService;
    }

    // ✅ ADD ENERGY
    @PostMapping("/add")
    public EnergyUsage addEnergy(
            @RequestBody EnergyUsageRequestDTO dto,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return energyService.addUsage(dto.getUnitsConsumed(), email);
    }

    // ✅ MY HISTORY
    // ✅ MY HISTORY (by EMAIL from JWT)
    @GetMapping("/myHistory")
    public ResponseEntity<List<EnergyUsage>> myUsage(Authentication authentication) {

        String email = authentication.getName(); // 👈 EMAIL from JWT

        return ResponseEntity.ok(
                energyService.getUsageByEmail(email)
        );
    }


    // ✅ MY REWARDS (by EMAIL from JWT)
    @GetMapping("/rewards")
    public ResponseEntity<Integer> myRewards(Authentication authentication) {

        String email = authentication.getName(); // 👈 EMAIL from JWT

        return ResponseEntity.ok(
                energyService.getRewardPointsByEmail(email)
        );
    }
}
