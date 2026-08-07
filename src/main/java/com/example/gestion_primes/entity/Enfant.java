package com.example.gestion_primes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "enfant")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enfant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateNaissance;

    private Boolean estScolarise;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    @JsonBackReference("agent-enfants")
    private Agent agent;
}