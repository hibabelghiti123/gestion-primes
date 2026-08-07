package com.example.gestion_primes.controller;

import com.example.gestion_primes.entity.Direction;
import com.example.gestion_primes.repository.DirectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/directions")
@CrossOrigin(origins = "*")
public class DirectionController {

    @Autowired
    private DirectionRepository directionRepository;

    @GetMapping
    public List<Direction> getAll() {
        return directionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Direction> getById(@PathVariable Long id) {
        return directionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Direction creer(@RequestBody Direction direction) {
        return directionRepository.save(direction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Direction> modifier(@PathVariable Long id, @RequestBody Direction direction) {
        if (!directionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        direction.setId(id);
        return ResponseEntity.ok(directionRepository.save(direction));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        directionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}