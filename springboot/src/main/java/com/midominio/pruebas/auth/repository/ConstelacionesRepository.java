package com.midominio.pruebas.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.midominio.pruebas.auth.entity.Constelacion;


@Repository
public interface ConstelacionesRepository extends JpaRepository<Constelacion, Long> {

}

