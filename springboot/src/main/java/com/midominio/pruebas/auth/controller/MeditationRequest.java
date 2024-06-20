package com.midominio.pruebas.auth.controller;

public class MeditationRequest {

    private int usuarioId;
    private int tiempo;
    
	public int getTiempo() {
		return tiempo;
	}
	public void setTiempo(int tiempo) {
		this.tiempo = tiempo;
	}
	public int getUsuarioId() {
		return usuarioId;
	}
	public void setUsuarioId(int usuarioId) {
		this.usuarioId = usuarioId;
	}

}
