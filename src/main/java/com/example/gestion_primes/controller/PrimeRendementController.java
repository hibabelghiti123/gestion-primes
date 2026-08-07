package com.example.gestion_primes.controller;

import com.example.gestion_primes.entity.PrimeRendement;
import com.example.gestion_primes.service.PrimeRendementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/primes-rendement")
public class PrimeRendementController {

    @Autowired
    private PrimeRendementService primeRendementService;

    /**
     * Récupère la liste de toutes les primes de rendement
     */
    @GetMapping
    public List<PrimeRendement> getAllPrimes() {
        return primeRendementService.getAllPrimes();
    }

    /**
     * Crée une nouvelle prime de rendement
     */
    @PostMapping
    public PrimeRendement createPrime(@RequestBody PrimeRendement prime) {
        return primeRendementService.createPrime(prime);
    }

    /**
     * Calcule la prime finale d'un agent pour une prime donnée
     */
    @GetMapping("/{id}/calculer/{agentId}")
    public double calculerPrimeFinale(@PathVariable Long id, @PathVariable Long agentId) {
        return primeRendementService.calculerPrimeIndividuelle(id, agentId);
    }

    /**
     * Calcule la prime finale de tous les agents d'un même service.
     * On envoie la liste des PrimeRendement du service en entrée,
     * le service calcule le coefficient global et applique à chacun.
     */
    @PostMapping("/calculer-service")
    public Map<Long, Double> calculerPrimesDuService(@RequestBody List<PrimeRendement> primesDuService) {
        return primeRendementService.calculPrimesFinalesDuService(primesDuService);
    }
}