package com.example.gestion_primes.controller;

import com.example.gestion_primes.dto.LoginRequest;
import com.example.gestion_primes.dto.LoginResponse;
import com.example.gestion_primes.entity.Utilisateur;
import com.example.gestion_primes.repository.UtilisateurRepository;
import com.example.gestion_primes.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        var utilisateurOpt = utilisateurRepository.findByEmail(request.getEmail());

        if (utilisateurOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
        }

        Utilisateur utilisateur = utilisateurOpt.get();

        if (!passwordEncoder.matches(request.getMotDePasse(), utilisateur.getMotDePasse())) {
            return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
        }

        String token = jwtUtil.generateToken(utilisateur.getEmail());
        return ResponseEntity.ok(new LoginResponse(token, utilisateur.getEmail(), utilisateur.getRole()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        if (utilisateurRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body("Un compte existe déjà avec cet email");
        }

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(request.getEmail());
        utilisateur.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));
        utilisateur.setRole("ADMIN");

        utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok("Compte créé avec succès");
    }
}