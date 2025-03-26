package com.br.cepManager.controller;

import com.br.cepManager.dto.UsuariosDTO;
import com.br.cepManager.entities.Usuarios;
import com.br.cepManager.exceptions.CeptNotFoundException;
import com.br.cepManager.service.UsuariosService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UsuarioController {

    private final UsuariosService usuariosService;

    public UsuarioController(UsuariosService usuariosService) {
        this.usuariosService = usuariosService;
    }

    @PostMapping("/create")
    @Operation(summary = "Criação de usuário", description = "Criação de um novo usuário com seus respectivos campos")
    public ResponseEntity<Usuarios> createUser(@RequestBody UsuariosDTO usuariosDTO) {
        Usuarios usuarios = usuariosService.criarUsuario(usuariosDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca por usuário através do ID", description = "Realiza uma busca no banco pelo usuário com base no ID")
    public ResponseEntity<?> buscarUsuario(@PathVariable Long id) {
        Optional<UsuariosDTO> usuariosDTO = usuariosService.buscarUsuarioPorId(id);
        if (usuariosDTO.isPresent()) {
            return ResponseEntity.ok().body(usuariosDTO.get());
        }
        String message = "Usuário não encontrado com o ID: " + id;
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @GetMapping("/list")
    @Operation(summary = "Listar usuários", description = "Retorna uma lista de todos os usuários cadastrados no sistema.")
    public ResponseEntity<?> listarUsuarios() {
        List<UsuariosDTO> usuariosDTOS = usuariosService.listarTodosUsuarios();
        if (usuariosDTOS.isEmpty()) {
            String message = "Lista de Usuários não encontrado";
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.TEXT_PLAIN).body(message);
        }
        return ResponseEntity.ok().body(usuariosDTOS);
    }

    @PutMapping("/update/{id}")
    @Operation(summary = "Atualização de usuário", description = "Realiza uma atualização nos dados do usuário com base no ID")
    public ResponseEntity<UsuariosDTO> atualizarUsuario(@PathVariable Long id, @RequestBody UsuariosDTO usuariosDTO) {
        UsuariosDTO usuariosDTOs = usuariosService.atualizarUsuario(id, usuariosDTO);
        return ResponseEntity.ok().body(usuariosDTOs);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Deleta o usuário", description = "Apaga dados do usuário com base no ID")
    public ResponseEntity<Void> deletarDadosUsuario(@PathVariable Long id) {
        usuariosService.deletarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
