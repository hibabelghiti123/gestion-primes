package com.example.gestion_primes.repository;

import com.example.gestion_primes.entity.Departement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartementRepository extends JpaRepository<Departement, Long> {
}