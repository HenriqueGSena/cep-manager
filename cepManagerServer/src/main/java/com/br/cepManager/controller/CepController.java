package com.br.cepManager.controller;

import com.br.cepManager.dto.CepDTO;
import com.br.cepManager.exceptions.CeptNotFoundException;
import com.br.cepManager.service.CepService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class CepController {

    private final CepService cepService;

    public CepController(CepService cepService) {
        this.cepService = cepService;
    }

    @GetMapping("/cep/{cep}")
    public ResponseEntity<Mono<CepDTO>> findCepApi(@PathVariable String cep) {
        try {
            Mono<CepDTO> response = cepService.findCepByApi(cep);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new CeptNotFoundException("Erro ao buscar CEP: " + cep);
        }
    }
}
