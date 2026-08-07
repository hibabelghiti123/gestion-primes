package com.example.gestion_primes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationDTO {
    private Long id;
    private LocalDate dateEvaluation;
    private Double note;
    private String commentaire;
    private AgentResumeDTO evaluateur;
    private AgentResumeDTO evalue;
}