package com.example.gestion_primes.service;

import com.example.gestion_primes.entity.Enfant;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
public class EnfantService {

    public boolean estACharge(Enfant enfant) {
        int age = calculerAge(enfant.getDateNaissance());
        return age < 21 || Boolean.TRUE.equals(enfant.getEstScolarise());
    }

    private int calculerAge(LocalDate dateNaissance) {
        return Period.between(dateNaissance, LocalDate.now()).getYears();
    }
}