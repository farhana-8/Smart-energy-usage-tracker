package com.smartenergy.energy_backend.service;

import com.smartenergy.energy_backend.model.EnergyTip;
import com.smartenergy.energy_backend.repository.EnergyTipRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class EnergyTipService {

    private final EnergyTipRepository repository;

    public EnergyTipService(EnergyTipRepository repository) {
        this.repository = repository;
    }

    public List<EnergyTip> getAllTips() {
        return repository.findAll();
    }

    public EnergyTip getRandomTip() {
        List<EnergyTip> tips = repository.findAll();
        if (tips.isEmpty()) return null;
        return tips.get(new Random().nextInt(tips.size()));
    }
}
