package com.example.gestion_primes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "situation_admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SituationAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String echelle;

    private String echelon;

    @OneToOne
    @JoinColumn(name = "agent_id")
    @JsonBackReference("agent-situationAdmin")
    private Agent agent;
}