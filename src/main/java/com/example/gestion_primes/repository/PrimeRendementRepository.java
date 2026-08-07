package com.example.gestion_primes.repository;

import com.example.gestion_primes.entity.PrimeRendement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrimeRendementRepository extends JpaRepository<PrimeRendement, Long> {
}