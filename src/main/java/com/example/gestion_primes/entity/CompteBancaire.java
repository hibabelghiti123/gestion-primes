package com.example.gestion_primes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "compte_bancaire")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompteBancaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomBanque;

    private String rib;

    @OneToOne
    @JoinColumn(name = "agent_id")
    @JsonBackReference("agent-compteBancaire")
    private Agent agent;
}