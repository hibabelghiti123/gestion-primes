package com.example.gestion_primes.controller;

import com.example.gestion_primes.entity.Enfant;
import com.example.gestion_primes.repository.EnfantRepository;
import com.example.gestion_primes.service.EnfantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enfants")
@CrossOrigin(origins = "*")
public class EnfantController {

    @Autowired
    private EnfantRepository enfantRepository;

    @Autowired
    private EnfantService enfantService;

    @GetMapping
    public List<Enfant> getAll() {
        return enfantRepository.findAll();
    }

    @PostMapping
    public Enfant creer(@RequestBody Enfant enfant) {
        return enfantRepository.save(enfant);
    }

    // Vérifie si un enfant précis est à charge
    @GetMapping("/{id}/est-a-charge")
    public boolean estACharge(@PathVariable Long id) {
        Enfant enfant = enfantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enfant non trouvé"));
        return enfantService.estACharge(enfant);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Long id) {
        enfantRepository.deleteById(id);
    }
}