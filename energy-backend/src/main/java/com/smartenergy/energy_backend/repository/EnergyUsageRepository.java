package com.smartenergy.energy_backend.repository;

import com.smartenergy.energy_backend.model.EnergyUsage;
import com.smartenergy.energy_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnergyUsageRepository extends JpaRepository<EnergyUsage, Long> {

    List<EnergyUsage> findByUser(User user);
    List<EnergyUsage> findByUserOrderByDateAsc(User user);

}
