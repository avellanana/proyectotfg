package com.midominio.pruebas.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.midominio.pruebas.auth.entity.ConstelacionesDesbloqueadas;

@Repository
public interface ConstelacionesDesbloqueadasRepository extends JpaRepository<ConstelacionesDesbloqueadas, Integer> {
    @Query("SELECT SUM(c.estrellasDesbloqueadas) FROM ConstelacionesDesbloqueadas c WHERE c.usuarioId = :usuarioId")
    
    Integer sumEstrellasDesbloqueadasByUsuarioId(@Param("usuarioId") int usuarioId);
    
    // Método para buscar por usuarioId y constId
    ConstelacionesDesbloqueadas findByUsuarioIdAndConstId(int usuarioId, int constId); 
    
    //Metodo para encontrar todas las desbloqueadas por usuario Id solamente
    @Query("SELECT c.constId, c.estrellasDesbloqueadas, d.nombreArchivo FROM ConstelacionesDesbloqueadas c JOIN Constelacion d ON c.constId = d.id WHERE c.usuarioId = :usuarioId")
    List<Object[]> findAllByUsuarioIdWithNombreArchivo(@Param("usuarioId") int usuarioId);
}

