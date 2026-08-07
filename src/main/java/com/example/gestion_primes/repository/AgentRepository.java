package com.example.gestion_primes.repository;

import com.example.gestion_primes.entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentRepository extends JpaRepository<Agent, Long> {
}