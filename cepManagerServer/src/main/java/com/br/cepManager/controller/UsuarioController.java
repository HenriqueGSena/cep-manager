package com.br.cepManager.controller;

import com.br.cepManager.dto.UsuariosDTO;
import com.br.cepManager.entities.Usuarios;
import com.br.cepManager.exceptions.CeptNotFoundException;
import com.br.cepManager.service.UsuariosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Usuarios> createUser(@RequestBody UsuariosDTO usuariosDTO) {
        Usuarios usuarios = usuariosService.criarUsuario(usuariosDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarUsuario(@PathVariable Long id) {
        Optional<UsuariosDTO> usuariosDTO = usuariosService.buscarUsuarioPorId(id);
        if (usuariosDTO.isPresent()) {
            return ResponseEntity.ok().body(usuariosDTO.get());
        }
        String message = "Usuário não encontrado com o ID: " + id;
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @GetMapping("/list")
    public ResponseEntity<?> listarUsuarios() {
        List<UsuariosDTO> usuariosDTOS = usuariosService.listarTodosUsuarios();
        if (usuariosDTOS.isEmpty()) {
            String message = "Lista de Usuários não encontrado";
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.TEXT_PLAIN).body(message);
        }
        return ResponseEntity.ok().body(usuariosDTOS);
    }
}
