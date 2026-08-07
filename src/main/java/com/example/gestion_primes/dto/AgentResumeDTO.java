package com.example.gestion_primes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgentResumeDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String fonction;
}