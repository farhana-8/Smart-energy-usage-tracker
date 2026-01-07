package com.smartenergy.energy_backend.controller;

import com.smartenergy.energy_backend.model.EnergyTip;
import com.smartenergy.energy_backend.service.EnergyTipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tips")
public class EnergyTipController {

    private final EnergyTipService service;

    public EnergyTipController(EnergyTipService service) {
        this.service = service;
    }

    @GetMapping
    public List<EnergyTip> getAllTips() {
        return service.getAllTips();
    }

    @GetMapping("/today")
    public EnergyTip getTipOfTheDay() {
        return service.getRandomTip();
    }
}
