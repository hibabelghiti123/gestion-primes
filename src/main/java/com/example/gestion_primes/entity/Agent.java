package com.example.gestion_primes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "agent")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String matricule;

    @Column(nullable = false, unique = true)
    private String cin;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    private LocalDate dateNaissance;
    private Character sexe;
    private String situationFamiliale;
    private LocalDate datePriseService;
    private String lieuAffectation;
    private String fonction;
    private Integer nbEnfants;

    @ManyToOne
    @JoinColumn(name = "direction_id")
    @JsonBackReference("direction-agents")
    private Direction direction;

    @OneToMany(mappedBy = "agent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("agent-enfants")
    private List<Enfant> enfants = new ArrayList<>();

    @OneToOne(mappedBy = "agent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("agent-situationAdmin")
    private SituationAdmin situationAdmin;

    @OneToOne(mappedBy = "agent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("agent-compteBancaire")
    private CompteBancaire compteBancaire;

    @OneToMany(mappedBy = "agent", cascade = CascadeType.ALL)
    @JsonManagedReference("agent-salaires")
    private List<SalaireAgent> salaires = new ArrayList<>();

    @OneToMany(mappedBy = "agent", cascade = CascadeType.ALL)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<PrimeRendement> primesRendement = new ArrayList<>();
    
    @OneToMany(mappedBy = "agent", cascade = CascadeType.ALL)
    @JsonManagedReference("agent-primesPerformance")
    private List<PrimePerformance> primesPerformance = new ArrayList<>();

    @OneToMany(mappedBy = "evaluateur", cascade = CascadeType.ALL)
    @JsonManagedReference("agent-evaluationsDonnees")
    private List<Evaluation> evaluationsDonnees = new ArrayList<>();

    @OneToMany(mappedBy = "evalue", cascade = CascadeType.ALL)
    @JsonManagedReference("agent-evaluationsRecues")
    private List<Evaluation> evaluationsRecues = new ArrayList<>();
}