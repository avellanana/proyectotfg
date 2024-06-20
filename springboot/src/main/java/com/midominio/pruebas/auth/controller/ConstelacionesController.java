package com.midominio.pruebas.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.midominio.pruebas.auth.entity.Constelacion;
import com.midominio.pruebas.auth.repository.ConstelacionesRepository;


@RestController
public class ConstelacionesController {

    @Autowired
    private ConstelacionesRepository constelacionesRepository;

    @GetMapping("/constelaciones")
    public List<Constelacion> getConstelaciones() {
        return constelacionesRepository.findAll();
    }
}