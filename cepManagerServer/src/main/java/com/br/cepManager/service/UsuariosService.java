package com.br.cepManager.service;

import com.br.cepManager.dto.UsuariosDTO;
import com.br.cepManager.entities.Usuarios;
import com.br.cepManager.exceptions.CeptNotFoundException;
import com.br.cepManager.repository.UsuariosRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class UsuariosService {

    private final UsuariosRepository usuariosRepository;

    public UsuariosService(UsuariosRepository usuariosRepository) {
        this.usuariosRepository = usuariosRepository;
    }

    public Usuarios criarUsuario(UsuariosDTO usuariosDTO) {
        Usuarios usuarios = new Usuarios();
        usuarios.setNome(usuariosDTO.getNome());
        usuarios.setCpf(usuariosDTO.getCpf());
        usuarios.setCep(usuariosDTO.getCep());
        usuarios.setLogradouro(usuariosDTO.getLogradouro());
        usuarios.setBairro(usuariosDTO.getBairro());
        usuarios.setCidade(usuariosDTO.getCidade());
        usuarios.setEstado(usuariosDTO.getEstado());
        usuarios.setData_criacao(LocalDateTime.now());
        usuarios.setData_atualizacao(LocalDateTime.now());

        return usuariosRepository.save(usuarios);
    }

    public List<UsuariosDTO> listarTodosUsuarios() {
        List<Usuarios> usuarios = usuariosRepository.findAll();
        return usuarios.stream()
                .map(this::converterUsuariosDTO)
                .collect(Collectors.toList());
    }

    public UsuariosDTO atualizarUsuario(Long id, UsuariosDTO usuariosDTO) {
        Optional<Usuarios> usuarios = usuariosRepository.findById(id);
        if (usuarios.isPresent()) {
            Usuarios atualizarUsuario = usuarios.get();
            atualizarUsuario.setNome(usuariosDTO.getNome());
            atualizarUsuario.setCpf(usuariosDTO.getCpf());
            atualizarUsuario.setCep(usuariosDTO.getCep());
            atualizarUsuario.setLogradouro(usuariosDTO.getLogradouro());
            atualizarUsuario.setBairro(usuariosDTO.getBairro());
            atualizarUsuario.setCidade(usuariosDTO.getCidade());
            atualizarUsuario.setEstado(usuariosDTO.getEstado());
            atualizarUsuario.setData_atualizacao(LocalDateTime.now());
            return converterUsuariosDTO(usuariosRepository.save(atualizarUsuario));
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário com ID " + id + " não encontrado.");
        }
    }

    public void deletarUsuario(Long id) {
        Optional<Usuarios> usuarios = usuariosRepository.findById(id);
        if (usuarios.isPresent()) {
            usuariosRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário com ID " + id + " não encontrado.");
        }
    }

    private UsuariosDTO converterUsuariosDTO(Usuarios usuarios) {
        return new UsuariosDTO(
                usuarios.getId(),
                usuarios.getNome(),
                usuarios.getCpf(),
                usuarios.getCep(),
                usuarios.getLogradouro(),
                usuarios.getBairro(),
                usuarios.getCidade(),
                usuarios.getEstado(),
                usuarios.getData_criacao(),
                usuarios.getData_atualizacao()
        );
    }
}
