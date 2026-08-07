package com.example.gestion_primes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompteBancaireDTO {
    private Long id;
    private String nomBanque;
    private String rib;
    private Long agentId; // pour savoir à quel agent il appartient, sans exposer tout l'objet Agent
}