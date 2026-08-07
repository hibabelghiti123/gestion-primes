package com.example.gestion_primes.controller;

import com.example.gestion_primes.dto.CompteBancaireDTO;
import com.example.gestion_primes.entity.Agent;
import com.example.gestion_primes.entity.CompteBancaire;
import com.example.gestion_primes.repository.AgentRepository;
import com.example.gestion_primes.repository.CompteBancaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comptes-bancaires")
@CrossOrigin(origins = "*")
public class CompteBancaireController {
    @Autowired
    private CompteBancaireRepository compteBancaireRepository;

    @Autowired
    private AgentRepository agentRepository;

    // Récupérer tous les comptes bancaires
    @GetMapping
    public List<CompteBancaireDTO> getAll() {
        return compteBancaireRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // Récupérer le compte bancaire d'un agent précis
    @GetMapping("/agent/{agentId}")
    public ResponseEntity<CompteBancaireDTO> getByAgentId(@PathVariable Long agentId) {
        return compteBancaireRepository.findByAgentId(agentId)
                .map(this::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Créer ou associer un compte bancaire à un agent
    @PostMapping("/agent/{agentId}")
    public ResponseEntity<CompteBancaireDTO> create(@PathVariable Long agentId, @RequestBody CompteBancaireDTO dto) {
        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent introuvable avec id : " + agentId));

        CompteBancaire compte = new CompteBancaire();
        compte.setNomBanque(dto.getNomBanque());
        compte.setRib(dto.getRib());
        compte.setAgent(agent);

        CompteBancaire saved = compteBancaireRepository.save(compte);
        return ResponseEntity.ok(toDTO(saved));
    }

    // Modifier un compte bancaire existant
    @PutMapping("/{id}")
    public ResponseEntity<CompteBancaireDTO> update(@PathVariable Long id, @RequestBody CompteBancaireDTO dto) {
        return compteBancaireRepository.findById(id)
                .map(compte -> {
                    compte.setNomBanque(dto.getNomBanque());
                    compte.setRib(dto.getRib());
                    CompteBancaire updated = compteBancaireRepository.save(compte);
                    return ResponseEntity.ok(toDTO(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Supprimer un compte bancaire
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!compteBancaireRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        compteBancaireRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private CompteBancaireDTO toDTO(CompteBancaire compte) {
        return new CompteBancaireDTO(
                compte.getId(),
                compte.getNomBanque(),
                compte.getRib(),
                compte.getAgent() != null ? compte.getAgent().getId() : null
        );
    }
}