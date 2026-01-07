package com.smartenergy.energy_backend.service;

import com.smartenergy.energy_backend.model.EnergyUsage;
import com.smartenergy.energy_backend.model.User;
import com.smartenergy.energy_backend.repository.EnergyUsageRepository;
import com.smartenergy.energy_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EnergyService {

    private final EnergyUsageRepository energyUsageRepository;
    private final UserRepository userRepository;

    public EnergyService(
            EnergyUsageRepository energyUsageRepository,
            UserRepository userRepository
    ) {
        this.energyUsageRepository = energyUsageRepository;
        this.userRepository = userRepository;
    }

    public EnergyUsage addUsage(Double unitsConsumed, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        double billAmount = calculateBill(unitsConsumed);
        int rewardEarned = calculateReward(unitsConsumed);

        // ✅ Safe reward handling
        int currentPoints = user.getRewardPoints() == null ? 50 : user.getRewardPoints();
        user.setRewardPoints(currentPoints + rewardEarned);
        userRepository.save(user);

        EnergyUsage usage = new EnergyUsage();
        usage.setUnitsConsumed(unitsConsumed);
        usage.setBillAmount(billAmount);
        usage.setDate(LocalDate.now());
        usage.setUser(user);

        return energyUsageRepository.save(usage);
    }

    // ✅ VIEW ALL (for testing / admin)
    public List<EnergyUsage> getAllUsage() {
        return energyUsageRepository.findAll();
    }

    // ✅ USER HISTORY
    public List<EnergyUsage> getUsageByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return energyUsageRepository.findByUser(user);
    }

    // ✅ GET REWARD POINTS BY EMAIL
    public int getRewardPointsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getRewardPoints();
    }

    // 🔢 BILL CALCULATION
    // 🔢 BILL CALCULATION (As per TNEB-style slab rules)
    private double calculateBill(double units) {
        double bill = 0;

        if (units <= 500) {
            // ----- Upto 500 Units -----

            if (units > 100) {
                bill += Math.min(units - 100, 100) * 2.25; // 101–200
            }
            if (units > 200) {
                bill += Math.min(units - 200, 200) * 4.50; // 201–400
            }
            if (units > 400) {
                bill += Math.min(units - 400, 100) * 6.00; // 401–500
            }

        } else {
            // ----- Above 500 Units -----

            if (units > 100) {
                bill += Math.min(units - 100, 300) * 4.50; // 101–400
            }
            if (units > 400) {
                bill += Math.min(units - 400, 100) * 6.00; // 401–500
            }
            if (units > 500) {
                bill += Math.min(units - 500, 100) * 8.00; // 501–600
            }
            if (units > 600) {
                bill += Math.min(units - 600, 200) * 9.00; // 601–800
            }
            if (units > 800) {
                bill += Math.min(units - 800, 200) * 10.00; // 801–1000
            }
            if (units > 1000) {
                bill += (units - 1000) * 11.00; // Above 1000
            }
        }

        return Math.round(bill * 100.0) / 100.0; // round to 2 decimals
    }


    // 🎁 REWARD LOGIC (LOW USAGE = HIGH REWARD)
    private int calculateReward(double units) {
        if (units <= 100) return 100;
        else if (units <= 200) return 50;
        else return 10;
    }

}
