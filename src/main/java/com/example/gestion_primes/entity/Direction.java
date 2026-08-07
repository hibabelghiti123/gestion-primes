package com.example.gestion_primes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "direction")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Direction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomDirection;

    private String ville;

    @OneToMany(mappedBy = "direction")
    @JsonManagedReference("direction-agents")
    private List<Agent> agents = new ArrayList<>();

    @OneToMany(mappedBy = "direction", cascade = CascadeType.ALL)
    @JsonManagedReference("direction-departements")
    private List<Departement> departements = new ArrayList<>();
}