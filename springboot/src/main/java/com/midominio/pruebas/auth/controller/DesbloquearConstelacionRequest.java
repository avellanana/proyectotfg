package com.midominio.pruebas.auth.controller;

import java.time.LocalDateTime;

public class DesbloquearConstelacionRequest {
    
    private int usuarioId;
    private int constId;
    private int estrellasDesbloqueadas;
    private LocalDateTime fechaDesbloqueo;

    public LocalDateTime getFechaDesbloqueo() {
		return fechaDesbloqueo;
	}

	public void setFechaDesbloqueo(LocalDateTime fechaDesbloqueo) {
		this.fechaDesbloqueo = fechaDesbloqueo;
	}

	public DesbloquearConstelacionRequest() {
    }

    public DesbloquearConstelacionRequest(int usuarioId, int constId, int estrellasDesbloqueadas, LocalDateTime fechaDesbloqueo) {
        this.usuarioId = usuarioId;
        this.constId = constId;
        this.estrellasDesbloqueadas = estrellasDesbloqueadas;
        this.fechaDesbloqueo = fechaDesbloqueo;
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

    public int getEstrellasDesbloqueadas() {
        return estrellasDesbloqueadas;
    }

    public void setEstrellasDesbloqueadas(int estrellasDesbloqueadas) {
        this.estrellasDesbloqueadas = estrellasDesbloqueadas;
    }
}

