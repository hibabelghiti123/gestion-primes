package com.example.gestion_primes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "evaluation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateEvaluation;

    private Double note;

    private String commentaire;

    @ManyToOne
    @JoinColumn(name = "evaluateur_id")
    @JsonBackReference("agent-evaluationsDonnees")
    private Agent evaluateur;

    @ManyToOne
    @JoinColumn(name = "evalue_id")
    @JsonBackReference("agent-evaluationsRecues")
    private Agent evalue;
}