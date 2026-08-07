package com.example.gestion_primes.controller;

import com.example.gestion_primes.entity.PrimePerformance;
import com.example.gestion_primes.repository.PrimePerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/primes-performance")
@CrossOrigin(origins = "*")
public class PrimePerformanceController {

    @Autowired
    private PrimePerformanceRepository primePerformanceRepository;

    @GetMapping
    public List<PrimePerformance> getAll() {
        return primePerformanceRepository.findAll();
    }

    @PostMapping
    public PrimePerformance creer(@RequestBody PrimePerformance prime) {
        return primePerformanceRepository.save(prime);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Long id) {
        primePerformanceRepository.deleteById(id);
    }
}