package com.example.gestion_primes.repository;

import com.example.gestion_primes.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}