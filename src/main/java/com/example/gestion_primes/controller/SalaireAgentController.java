package com.example.gestion_primes.controller;

import com.example.gestion_primes.entity.SalaireAgent;
import com.example.gestion_primes.repository.SalaireAgentRepository;
import com.example.gestion_primes.service.SalaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salaires")
@CrossOrigin(origins = "*")
public class SalaireAgentController {

    @Autowired
    private SalaireAgentRepository salaireAgentRepository;

    @Autowired
    private SalaireService salaireService;

    @GetMapping
    public List<SalaireAgent> getAll() {
        return salaireAgentRepository.findAll();
    }

    @PostMapping
    public SalaireAgent creer(@RequestBody SalaireAgent salaire) {
        return salaireAgentRepository.save(salaire);
    }

    // Calcule et retourne le salaire net pour un salaire enregistré
    @GetMapping("/{id}/salaire-net")
    public double getSalaireNet(@PathVariable Long id) {
        SalaireAgent salaire = salaireAgentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salaire non trouvé"));
        return salaireService.calculSalaireNet(salaire.getAgent(), salaire);
    }
}