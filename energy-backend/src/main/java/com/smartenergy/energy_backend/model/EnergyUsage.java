package com.smartenergy.energy_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "energy_usage")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnergyUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // maps to units_consumed column
    @Column(name = "units_consumed", nullable = false)
    private Double unitsConsumed;

    @Column(name = "bill_amount", nullable = false)
    private Double billAmount;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
