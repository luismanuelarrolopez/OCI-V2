package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

import java.util.Date;

public class EvidenciaSoportes_Dto {
	private int idActividad;
	private int idEvidencia;
	private int idSoporte;
	private int idEvaluacion;
	private String nombreEvidencia;
	private String linkDescarga;
	private String estadoEvaluacion;
	private String observaciones;
	private Date fechaCargue;
	
	public EvidenciaSoportes_Dto() {
		this.idActividad = 0;
		this.idEvidencia = 0;
		this.idSoporte = 0;
		this.idEvaluacion = 0;
		this.nombreEvidencia = "";
		this.linkDescarga = "";
		this.estadoEvaluacion = "";
		this.observaciones = "";
	}

	public int getIdActividad() {
		return idActividad;
	}

	public void setIdActividad(int idActividad) {
		this.idActividad = idActividad;
	}

	public int getIdEvidencia() {
		return idEvidencia;
	}

	public void setIdEvidencia(int idEvidencia) {
		this.idEvidencia = idEvidencia;
	}

	public int getIdSoporte() {
		return idSoporte;
	}

	public void setIdSoporte(int idSoporte) {
		this.idSoporte = idSoporte;
	}

	public int getIdEvaluacion() {
		return idEvaluacion;
	}

	public void setIdEvaluacion(int idEvaluacion) {
		this.idEvaluacion = idEvaluacion;
	}

	public String getNombreEvidencia() {
		return nombreEvidencia;
	}

	public void setNombreEvidencia(String nombreEvidencia) {
		this.nombreEvidencia = nombreEvidencia;
	}

	public String getLinkDescarga() {
		return linkDescarga;
	}

	public void setLinkDescarga(String linkDescarga) {
		this.linkDescarga = linkDescarga;
	}

	public String getEstadoEvaluacion() {
		return estadoEvaluacion;
	}

	public void setEstadoEvaluacion(String estadoEvaluacion) {
		this.estadoEvaluacion = estadoEvaluacion;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public Date getFechaCargue() {
		return fechaCargue;
	}

	public void setFechaCargue(Date fechaCargue) {
		this.fechaCargue = fechaCargue;
	}
}
