package com.br.cepManager.service;

import com.br.cepManager.dto.CepDTO;
import com.br.cepManager.repository.CepRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class CepService {

    private final WebClient webClient;

    private final CepRepository cepRepository;

    public CepService(WebClient webClient, CepRepository cepRepository) {
        this.webClient = webClient;
        this.cepRepository = cepRepository;
    }

    public Mono<CepDTO> findCepByApi(String cep) {
        return webClient.get()
                .uri("/{cep}/json", cep)
                .retrieve()
                .bodyToMono(CepDTO.class);
    }
}
