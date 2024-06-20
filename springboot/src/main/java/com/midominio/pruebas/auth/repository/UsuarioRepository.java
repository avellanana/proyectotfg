package com.midominio.pruebas.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.midominio.pruebas.auth.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByNombreusuarioAndPassword(String nombreusuario, String password);
    Usuario findByNombreusuario(String nombreusuario);
}
