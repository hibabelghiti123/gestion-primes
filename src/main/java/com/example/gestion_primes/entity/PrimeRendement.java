package com.example.gestion_primes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "prime_rendement")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrimeRendement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer annee;

    private Double salaireBrutMensuel;

    private Integer nbMoisTravail;

    private Integer nbMoisService;

    private Double coefficientGlobalApplique;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private Agent agent;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;
}