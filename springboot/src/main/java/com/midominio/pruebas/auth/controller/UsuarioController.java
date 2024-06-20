package com.midominio.pruebas.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.midominio.pruebas.auth.entity.Usuario;
import com.midominio.pruebas.auth.service.UsuarioService;

@RestController
@RequestMapping("/api/auth")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Usuario usuarioEncontrado = usuarioService.findByNombreusuario(usuario.getNombreusuario());
        if (usuarioEncontrado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no registrado");
        }
        
        if (!usuarioEncontrado.getPassword().equals(usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario o contraseña incorrectos");
        }

        // Si el usuario y contraseña son correctos, retornar el ID del usuario
        return ResponseEntity.ok(usuarioEncontrado.getId());
    }

    @PostMapping("/registro")
    public ResponseEntity<String> registro(@RequestBody Usuario usuario) {
        // Verificar si el usuario ya existe
        Usuario usuarioExistente = usuarioService.findByNombreusuario(usuario.getNombreusuario());
        if (usuarioExistente != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario ya existe");
        }

        usuarioService.save(usuario);

        return ResponseEntity.ok("Registro exitoso");
    }
}