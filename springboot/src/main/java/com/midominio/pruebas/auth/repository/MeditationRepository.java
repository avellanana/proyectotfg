package com.midominio.pruebas.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.midominio.pruebas.auth.entity.Meditation;

public interface MeditationRepository extends JpaRepository<Meditation, Long> {
	int countByUsuarioId(int usuarioId);
}