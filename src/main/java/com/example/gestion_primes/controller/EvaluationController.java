package com.example.gestion_primes.controller;

import com.example.gestion_primes.dto.AgentResumeDTO;
import com.example.gestion_primes.dto.EvaluationDTO;
import com.example.gestion_primes.entity.Evaluation;
import com.example.gestion_primes.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/evaluations")
@CrossOrigin(origins = "*")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    // GET /api/evaluations -> liste toutes les évaluations
    @GetMapping
    public List<EvaluationDTO> getAllEvaluations() {
        return evaluationService.getAllEvaluations()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // POST /api/evaluations -> l'agent sup crée une évaluation pour un agent min
    @PostMapping
    public EvaluationDTO creerEvaluation(@RequestBody Evaluation evaluation) {
        Evaluation saved = evaluationService.creerEvaluation(evaluation);
        return toDTO(saved);
    }

    // GET /api/evaluations/agent/{agentId}/derniere-note
    @GetMapping("/agent/{agentId}/derniere-note")
    public double getDerniereNote(@PathVariable Long agentId) {
        return evaluationService.getDerniereNote(agentId);
    }

    // GET /api/evaluations/evaluateur/{agentId}
    @GetMapping("/evaluateur/{agentId}")
    public List<EvaluationDTO> getEvaluationsDonnees(@PathVariable Long agentId) {
        return evaluationService.getEvaluationsDonnees(agentId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Méthode de conversion Entity -> DTO
    private EvaluationDTO toDTO(Evaluation eval) {
        EvaluationDTO dto = new EvaluationDTO();
        dto.setId(eval.getId());
        dto.setDateEvaluation(eval.getDateEvaluation());
        dto.setNote(eval.getNote());
        dto.setCommentaire(eval.getCommentaire());

        if (eval.getEvaluateur() != null) {
            dto.setEvaluateur(new AgentResumeDTO(
                    eval.getEvaluateur().getId(),
                    eval.getEvaluateur().getNom(),
                    eval.getEvaluateur().getPrenom(),
                    eval.getEvaluateur().getFonction()
            ));
        }

        if (eval.getEvalue() != null) {
            dto.setEvalue(new AgentResumeDTO(
                    eval.getEvalue().getId(),
                    eval.getEvalue().getNom(),
                    eval.getEvalue().getPrenom(),
                    eval.getEvalue().getFonction()
            ));
        }

        return dto;
    }
}