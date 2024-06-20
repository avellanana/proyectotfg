package com.midominio.pruebas.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.midominio.pruebas.auth.entity.Usuario;
import com.midominio.pruebas.auth.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario findByNombreusuario(String nombreusuario) {
        return usuarioRepository.findByNombreusuario(nombreusuario);
    }

    public void save(Usuario usuario) {
        usuarioRepository.save(usuario);
    }
}
