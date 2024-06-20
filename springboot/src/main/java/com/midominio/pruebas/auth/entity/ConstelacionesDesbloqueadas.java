package com.midominio.pruebas.auth.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "constelaciones_desbloqueadas")
public class ConstelacionesDesbloqueadas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int usuarioId;
    private int constId;
    private LocalDateTime fechaDesbloqueo;
    private int estrellasDesbloqueadas;
    
    public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public int getUsuarioId() {
		return usuarioId;
	}
	public void setUsuarioId(int usuarioId) {
		this.usuarioId = usuarioId;
	}
	public int getConstId() {
		return constId;
	}
	public void setConstId(int constId) {
		this.constId = constId;
	}
	public LocalDateTime getFechaDesbloqueo() {
		return fechaDesbloqueo;
	}
	public void setFechaDesbloqueo(LocalDateTime fechaDesbloqueo) {
		this.fechaDesbloqueo = fechaDesbloqueo;
	}
	public int getEstrellasDesbloqueadas() {
		return estrellasDesbloqueadas;
	}
	public void setEstrellasDesbloqueadas(int estrellasDesbloqueadas) {
		this.estrellasDesbloqueadas = estrellasDesbloqueadas;
	}
	
}
