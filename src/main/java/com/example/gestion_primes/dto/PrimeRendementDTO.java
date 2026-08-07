package com.example.gestion_primes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrimeRendementDTO {
    private Long id;
    private Integer annee;
    private Double salaireBrutMensuel;
    private Integer nbMoisTravail;
    private Integer nbMoisService;
    private Double coefficientGlobalApplique;
    private AgentResumeDTO agent;
}