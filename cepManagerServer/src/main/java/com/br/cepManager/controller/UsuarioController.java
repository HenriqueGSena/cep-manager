package com.br.cepManager.controller;

import com.br.cepManager.dto.UsuariosDTO;
import com.br.cepManager.entities.Usuarios;
import com.br.cepManager.exceptions.CeptNotFoundException;
import com.br.cepManager.service.UsuariosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
