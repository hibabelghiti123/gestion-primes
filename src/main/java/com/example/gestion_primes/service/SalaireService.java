package com.example.gestion_primes.service;

import com.example.gestion_primes.entity.Agent;
import com.example.gestion_primes.entity.SalaireAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalaireService {

    @Autowired
    private EnfantService enfantService;

    public int nbEnfantsACharge(Agent agent) {
        int nb = 0;
        for (var enfant : agent.getEnfants()) {
            if (enfantService.estACharge(enfant)) {
                nb++;
            }
        }
        return nb;
    }

    public double calculAllocationFamiliale(Agent agent) {
        return nbEnfantsACharge(agent) * 300;
    }

    public double calculRetenues(SalaireAgent salaire) {
        return salaire.getRetenues();
    }

    public double calculSalaireNet(Agent agent, SalaireAgent salaire) {
        return salaire.getSalaireBase()
                + calculAllocationFamiliale(agent)
                + salaire.getPrimeFonction()
                - calculRetenues(salaire);
    }
}