package com.example.gestion_primes.service;

import com.example.gestion_primes.entity.PrimeRendement;
import com.example.gestion_primes.repository.PrimeRendementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PrimeRendementService {

    @Autowired
    private PrimeRendementRepository primeRendementRepository;

    @Autowired
    private EvaluationService evaluationService;

    /**
     * Récupère toutes les primes de rendement
     */
    public List<PrimeRendement> getAllPrimes() {
        return primeRendementRepository.findAll();
    }

    /**
     * Crée une nouvelle prime de rendement
     */
    public PrimeRendement createPrime(PrimeRendement prime) {
        return primeRendementRepository.save(prime);
    }

    /**
     * Calcule le salaire brut annuel
     * = salaire mensuel * nombre de mois travaillés
     */
    public double calculBrutAnnuel(PrimeRendement prime) {
        return prime.getSalaireBrutMensuel() * prime.getNbMoisTravail();
    }

    /**
     * Calcule la prime moyenne théorique (taux national moyen)
     * = brut annuel * 16.66 / 100
     */
    public double calculPrimeMoyenne(PrimeRendement prime) {
        double brutAnnuel = calculBrutAnnuel(prime);
        return brutAnnuel * 16.66 / 100;
    }

    /**
     * Calcule la prime proposée, basée sur la note reçue par l'agent
     * = salaire brut mensuel * note / 100
     */
    public double calculPrimeProposee(PrimeRendement prime, double note) {
        return prime.getSalaireBrutMensuel() * note / 100;
    }

    /**
     * Calcule le coefficient d'ajustement GLOBAL d'un service/département.
     * C'est un coefficient collectif, PAS un coefficient par agent :
     * = somme des primes moyennes de tous les agents du service
     *   / somme des primes proposées de tous les agents du service
     */
    public double calculCoefficientGlobal(List<PrimeRendement> primesDuService,
                                          Map<Long, Double> notesParAgentId) {
        double sommePrimesMoyennes = 0;
        double sommePrimesProposees = 0;

        for (PrimeRendement prime : primesDuService) {
            Long agentId = prime.getAgent().getId();
            double note = notesParAgentId.get(agentId);

            sommePrimesMoyennes += calculPrimeMoyenne(prime);
            sommePrimesProposees += calculPrimeProposee(prime, note);
        }

        if (sommePrimesProposees == 0) {
            return 1.0; // évite une division par zéro
        }

        return sommePrimesMoyennes / sommePrimesProposees;
    }

    /**
     * Calcule la prime finale attribuée à UN agent
     * = prime proposée de l'agent * coefficient global du SERVICE
     */
    public double calculPrimeFinale(PrimeRendement prime, Long agentId, double coefficientGlobalService) {
        double note = evaluationService.getDerniereNote(agentId);
        double primeProposee = calculPrimeProposee(prime, note);

        double primeFinale = primeProposee * coefficientGlobalService;

        prime.setCoefficientGlobalApplique(coefficientGlobalService);
        primeRendementRepository.save(prime);

        return primeFinale;
    }

    /**
     * Point d'entrée pratique : calcule la prime finale de TOUS les agents
     * d'un même service en une seule fois.
     */
    public Map<Long, Double> calculPrimesFinalesDuService(List<PrimeRendement> primesDuService) {
        Map<Long, Double> notesParAgentId = new HashMap<>();
        for (PrimeRendement prime : primesDuService) {
            Long agentId = prime.getAgent().getId();
            notesParAgentId.put(agentId, evaluationService.getDerniereNote(agentId));
        }

        double coefficientGlobal = calculCoefficientGlobal(primesDuService, notesParAgentId);

        Map<Long, Double> primesFinales = new HashMap<>();
        for (PrimeRendement prime : primesDuService) {
            Long agentId = prime.getAgent().getId();
            double primeFinale = calculPrimeFinale(prime, agentId, coefficientGlobal);
            primesFinales.put(agentId, primeFinale);
        }

        return primesFinales;
    }

    /**
     * Calcule la prime finale d'un agent individuellement (sans coefficient de service).
     * Utilise un coefficient neutre de 1.0 par défaut.
     */
    public double calculerPrimeIndividuelle(Long primeId, Long agentId) {
        PrimeRendement prime = primeRendementRepository.findById(primeId)
                .orElseThrow(() -> new RuntimeException("Prime non trouvée : " + primeId));

        return calculPrimeFinale(prime, agentId, 1.0);
    }
}