package com.midominio.pruebas.auth.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.midominio.pruebas.auth.service.ConstelacionesDesbloqueadasService;


@RestController
public class ConstelacionesDesbloqueadasController {

    @Autowired
    private ConstelacionesDesbloqueadasService constelacionesDesbloqueadasService;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/desbloquearConstelacion")
    public ResponseEntity<Integer> desbloquearConstelacion(@RequestBody DesbloquearConstelacionRequest request) {
        int totalEstrellasDesbloqueadas = constelacionesDesbloqueadasService.desbloquearConstelacion(
            request.getUsuarioId(), 
            request.getConstId(), 
            request.getEstrellasDesbloqueadas(),
            request.getFechaDesbloqueo()
        );

        // Enviar el conteo actualizado a través de WebSocket
        messagingTemplate.convertAndSend("/topic/totalEstrellasDesbloqueadas", totalEstrellasDesbloqueadas);

        return ResponseEntity.ok(totalEstrellasDesbloqueadas);
    }
    
    @GetMapping("/sumarEstrellas/{usuarioId}")
    public ResponseEntity<Integer> sumarEstrellas(@PathVariable int usuarioId) {
        int totalEstrellas = constelacionesDesbloqueadasService.sumEstrellasDesbloqueadasByUsuarioId(usuarioId);
        return ResponseEntity.ok(totalEstrellas);
    }
    
    @GetMapping("/constelacionesdesbloqueadas/{usuarioId}/{constelacionId}")
    public boolean isConstelacionDesbloqueada(@PathVariable int usuarioId, @PathVariable int constelacionId) {
        return constelacionesDesbloqueadasService.isConstelacionDesbloqueada(usuarioId, constelacionId);
    }
    
    @Value("${server.base-url}")
    private String serverBaseUrl;

    @GetMapping("/constelacionesdesbloqueadas/{usuarioId}")
    public ResponseEntity<List<Map<String, Object>>> getConstelacionesDesbloqueadas(@PathVariable int usuarioId) {
        List<Object[]> constelaciones = constelacionesDesbloqueadasService.findByUsuarioIdWithNombreArchivo(usuarioId);
        List<Map<String, Object>> result = constelaciones.stream().map(record -> {
            Map<String, Object> map = new HashMap<>();
            map.put("constId", record[0]);
            map.put("estrellasDesbloqueadas", record[1]);
            map.put("imageUrl", serverBaseUrl + "/images/" + record[2]+".png"+ "?v=7");
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }
    
}
