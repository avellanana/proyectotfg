package com.midominio.pruebas.auth.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.midominio.pruebas.auth.entity.ConstelacionesDesbloqueadas;
import com.midominio.pruebas.auth.repository.ConstelacionesDesbloqueadasRepository;

@Service
public class ConstelacionesDesbloqueadasService {

    @Autowired
    private ConstelacionesDesbloqueadasRepository constelacionesDesbloqueadasRepository;
    
    public int desbloquearConstelacion(int usuarioId, int constId, int estrellasDesbloqueadas, LocalDateTime fechaDesbloqueo) {
        ConstelacionesDesbloqueadas constelacionesDesbloqueadas = new ConstelacionesDesbloqueadas();
        constelacionesDesbloqueadas.setUsuarioId(usuarioId);
        constelacionesDesbloqueadas.setConstId(constId);
        constelacionesDesbloqueadas.setEstrellasDesbloqueadas(estrellasDesbloqueadas);
        constelacionesDesbloqueadas.setFechaDesbloqueo(fechaDesbloqueo);

        constelacionesDesbloqueadasRepository.save(constelacionesDesbloqueadas);

        return constelacionesDesbloqueadasRepository.sumEstrellasDesbloqueadasByUsuarioId(usuarioId);
    }
    
    public int sumEstrellasDesbloqueadasByUsuarioId(int usuarioId) {
    	Integer sum = constelacionesDesbloqueadasRepository.sumEstrellasDesbloqueadasByUsuarioId(usuarioId);
        return sum != null ? sum : 0;
    }
    
    public boolean isConstelacionDesbloqueada(int usuarioId, int constelacionId) {
        ConstelacionesDesbloqueadas constelacionDesbloqueada = constelacionesDesbloqueadasRepository.findByUsuarioIdAndConstId(usuarioId, constelacionId);
        return constelacionDesbloqueada != null;
    }
    
    public List<Object[]> findByUsuarioIdWithNombreArchivo(int usuarioId) {
        return constelacionesDesbloqueadasRepository.findAllByUsuarioIdWithNombreArchivo(usuarioId);
    }
    
}

