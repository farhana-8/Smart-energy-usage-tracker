package com.smartenergy.energy_backend.service;

import com.smartenergy.energy_backend.model.EnergyUsage;
import com.smartenergy.energy_backend.model.User;
import com.smartenergy.energy_backend.repository.EnergyUsageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnergyAlertService {

    private final EnergyUsageRepository energyUsageRepository;

    public EnergyAlertService(EnergyUsageRepository energyUsageRepository) {
        this.energyUsageRepository = energyUsageRepository;
    }

    public String getAlertMessage(User user) {

        List<EnergyUsage> list =
                energyUsageRepository.findByUserOrderByDateAsc(user);

        if (list.size() < 2) {
            return "ℹ️ Not enough data to compare usage yet.";
        }

        EnergyUsage previous = list.get(list.size() - 2);
        EnergyUsage last = list.get(list.size() - 1);

        double lastBill = last.getUnitsConsumed() * 6;
        double prevBill = previous.getUnitsConsumed() * 6;

        if (lastBill > prevBill) {
            return "⚠️ Your electricity usage increased compared to previous usage.";
        } else if (lastBill < prevBill) {
            return "✅ Great job! Your electricity usage has reduced compared to previous usage.";
        } else {
            return "ℹ️ Your electricity usage remains the same.";
        }
    }

}
