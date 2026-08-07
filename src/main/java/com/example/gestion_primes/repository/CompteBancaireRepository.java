package com.example.gestion_primes.repository;

import com.example.gestion_primes.entity.CompteBancaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompteBancaireRepository extends JpaRepository<CompteBancaire, Long> {
    Optional<CompteBancaire> findByAgentId(Long agentId);
}