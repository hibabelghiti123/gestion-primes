package com.example.gestion_primes.repository;

import com.example.gestion_primes.entity.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

    // Toutes les évaluations reçues par un agent (utile pour trouver sa dernière note)
    List<Evaluation> findByEvalueIdOrderByDateEvaluationDesc(Long agentId);

    // Toutes les évaluations données par un agent sup
    List<Evaluation> findByEvaluateurId(Long agentId);
}