package com.midominio.pruebas.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="constelaciones")
public class Constelacion {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name="constelacion")
    private String constelacion;
	
	@Column(name="nombre_archivo")
    private String nombreArchivo;
	
	@Column(name="descripcion")
    private String descripcion;
	
	@Column(name="estrellas_constelacion")
    private int estrellasConstelacion;
     
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getConstelacion() {
		return constelacion;
	}
	public void setConstelacion(String constelacion) {
		this.constelacion = constelacion;
	}
	public String getNombreArchivo() {
		return nombreArchivo;
	}
	public void setNombreArchivo(String nombreArchivo) {
		this.nombreArchivo = nombreArchivo;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public int getEstrellasConstelacion() {
		return estrellasConstelacion;
	}
	public void setEstrellasConstelacion(int estrellasConstelacion) {
		this.estrellasConstelacion = estrellasConstelacion;
	}

}

