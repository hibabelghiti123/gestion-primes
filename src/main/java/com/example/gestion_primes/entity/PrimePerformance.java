package com.example.gestion_primes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "prime_performance")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrimePerformance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer annee;

    private Double montant;

    private String criteres;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    @JsonBackReference("agent-primesPerformance")
    private Agent agent;
}