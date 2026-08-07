package com.example.gestion_primes.service;

import com.example.gestion_primes.entity.Evaluation;
import com.example.gestion_primes.repository.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    /**
     * Récupère toutes les évaluations
     */
    public List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    /**
     * Récupère la note la plus récente reçue par un agent (en tant qu'évalué).
     * Retourne 0 si l'agent n'a jamais été évalué.
     */
    public double getDerniereNote(Long agentId) {
        List<Evaluation> evaluations = evaluationRepository
                .findByEvalueIdOrderByDateEvaluationDesc(agentId);

        if (evaluations.isEmpty()) {
            return 0;
        }
        return evaluations.get(0).getNote();
    }

    /**
     * Récupère toutes les évaluations données par un agent sup
     */
    public List<Evaluation> getEvaluationsDonnees(Long agentId) {
        return evaluationRepository.findByEvaluateurId(agentId);
    }

    /**
     * Enregistre une nouvelle évaluation
     */
    public Evaluation creerEvaluation(Evaluation evaluation) {
        return evaluationRepository.save(evaluation);
    }
}