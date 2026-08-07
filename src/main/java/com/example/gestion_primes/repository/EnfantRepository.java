package com.example.gestion_primes.repository;

import com.example.gestion_primes.entity.Enfant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnfantRepository extends JpaRepository<Enfant, Long> {
}