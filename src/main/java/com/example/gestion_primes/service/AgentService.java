package com.example.gestion_primes.service;

import com.example.gestion_primes.entity.Agent;
import com.example.gestion_primes.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgentService {

    @Autowired
    private AgentRepository agentRepository;

    /**
     * Retourne la liste de tous les agents
     */
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    /**
     * Retourne un agent précis par son id
     */
    public Optional<Agent> getAgentById(Long id) {
        return agentRepository.findById(id);
    }

    /**
     * Crée un nouvel agent
     */
    public Agent creerAgent(Agent agent) {
        return agentRepository.save(agent);
    }

    /**
     * Modifie un agent existant
     */
    public Agent modifierAgent(Long id, Agent agentModifie) {
        Agent agent = agentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agent non trouvé avec id : " + id));

        agent.setMatricule(agentModifie.getMatricule());
        agent.setCin(agentModifie.getCin());
        agent.setNom(agentModifie.getNom());
        agent.setPrenom(agentModifie.getPrenom());
        agent.setDateNaissance(agentModifie.getDateNaissance());
        agent.setSexe(agentModifie.getSexe());
        agent.setSituationFamiliale(agentModifie.getSituationFamiliale());
        agent.setDatePriseService(agentModifie.getDatePriseService());
        agent.setLieuAffectation(agentModifie.getLieuAffectation());
        agent.setFonction(agentModifie.getFonction());
        agent.setNbEnfants(agentModifie.getNbEnfants());
        agent.setDirection(agentModifie.getDirection());

        return agentRepository.save(agent);
    }

    /**
     * Supprime un agent par son id
     */
    public void supprimerAgent(Long id) {
        agentRepository.deleteById(id);
    }
}