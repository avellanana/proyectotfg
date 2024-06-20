package com.midominio.pruebas.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.midominio.pruebas.auth.entity.Meditation;
import com.midominio.pruebas.auth.repository.MeditationRepository;

@Service
public class MeditationService {

    @Autowired
    private MeditationRepository meditationRepository;

    public Meditation guardarMeditacion(Meditation meditation) {
        return meditationRepository.save(meditation);
    }
}
