package com.example.gestion_primes.controller;

import com.example.gestion_primes.entity.Agent;
import com.example.gestion_primes.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agents")
@CrossOrigin(origins = "*")
public class AgentController {

    @Autowired
    private AgentService agentService;

    // GET /api/agents -> liste tous les agents
    @GetMapping
    public List<Agent> getAllAgents() {
        return agentService.getAllAgents();
    }

    // GET /api/agents/{id} -> récupère un agent précis
    @GetMapping("/{id}")
    public ResponseEntity<Agent> getAgentById(@PathVariable Long id) {
        Optional<Agent> agent = agentService.getAgentById(id);
        return agent.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/agents -> crée un nouvel agent
    @PostMapping
    public Agent creerAgent(@RequestBody Agent agent) {
        return agentService.creerAgent(agent);
    }

    // PUT /api/agents/{id} -> modifie un agent existant
    @PutMapping("/{id}")
    public ResponseEntity<Agent> modifierAgent(@PathVariable Long id, @RequestBody Agent agent) {
        try {
            Agent agentModifie = agentService.modifierAgent(id, agent);
            return ResponseEntity.ok(agentModifie);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/agents/{id} -> supprime un agent
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerAgent(@PathVariable Long id) {
        agentService.supprimerAgent(id);
        return ResponseEntity.noContent().build();
    }
}