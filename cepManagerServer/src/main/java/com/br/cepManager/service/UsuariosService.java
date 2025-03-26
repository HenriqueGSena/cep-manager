package com.br.cepManager.service;

import com.br.cepManager.dto.UsuariosDTO;
import com.br.cepManager.entities.Usuarios;
import com.br.cepManager.repository.UsuariosRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

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

    public Optional<UsuariosDTO> buscarUsuarioPorId(Long id) {
        Optional<Usuarios> usuarios = usuariosRepository.findAllById(id);
        return usuarios.map(this::converterUsuariosDTO);
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
