package com.midominio.pruebas.auth.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.midominio.pruebas.auth.entity.Meditation;
import com.midominio.pruebas.auth.repository.MeditationRepository;

import java.time.LocalDateTime;
import java.util.Date;

@RestController
public class MeditationController {

	@Autowired
    private MeditationRepository meditationRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/meditation")
    public Meditation registerMeditation(@RequestBody MeditationRequest request) {
        Meditation meditation = new Meditation();
        meditation.setTiempo(request.getTiempo());
        meditation.setUsuarioId(request.getUsuarioId());
        meditation.setFecha(LocalDateTime.now());

        Meditation savedMeditation = meditationRepository.save(meditation);

        // Conteo actualizado por usuario
        int meditationCount = meditationRepository.countByUsuarioId(request.getUsuarioId());

        // Envío a través del Socket
        messagingTemplate.convertAndSend("/topic/meditationCount", meditationCount);

        return savedMeditation;
    }
    
 // Endpoint para obtener el conteo de meditaciones por usuario
    @GetMapping("/meditation/count/{usuarioId}")
    public int getMeditationCountByUsuarioId(@PathVariable int usuarioId) {
        return meditationRepository.countByUsuarioId(usuarioId);
    }
}
