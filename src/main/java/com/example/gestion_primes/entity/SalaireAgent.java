package com.example.gestion_primes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "salaire_agent")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalaireAgent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer mois;

    private Integer annee;

    private Double salaireBase;

    private Double allocationsFamiliales;

    private Double primeFonction;

    private Double retenues;

    private Double salaireNet;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    @JsonBackReference("agent-salaires")
    private Agent agent;
}