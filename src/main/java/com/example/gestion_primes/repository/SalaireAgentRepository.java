package com.example.gestion_primes.repository;

import com.example.gestion_primes.entity.SalaireAgent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaireAgentRepository extends JpaRepository<SalaireAgent, Long> {
}