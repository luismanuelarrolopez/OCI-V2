package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

import java.util.Date;

public class tableroAuditor_Dto {
	private String idPlan;
	private String nombreResponsable;
	private String nombreAuditor;
	private String nombrePlan;
	private String estado;
	private Date fechaUltimoSeguimiento;
	private Date fechaLimite;
	private double efectividad;
	private double avance;
	
	public tableroAuditor_Dto() {
		this.idPlan = "";
		this.nombreResponsable = "";
		this.nombreAuditor = "";
		this.nombrePlan = "";
		this.estado = "";
		this.fechaUltimoSeguimiento = null;
		this.fechaLimite = null;
		this.efectividad = 0;
		this.avance = 0;
	}

	public String getIdPlan() {
		return idPlan;
	}

	public void setIdPlan(String idPlan) {
		this.idPlan = idPlan;
	}

	public String getNombreResponsable() {
		return nombreResponsable;
	}

	public void setNombreResponsable(String nombreResponsable) {
		this.nombreResponsable = nombreResponsable;
	}

	public String getNombreAuditor() {
		return nombreAuditor;
	}

	public void setNombreAuditor(String nombreAuditor) {
		this.nombreAuditor = nombreAuditor;
	}

	public String getNombrePlan() {
		return nombrePlan;
	}

	public void setNombrePlan(String nombrePlan) {
		this.nombrePlan = nombrePlan;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Date getFechaUltimoSeguimiento() {
		return fechaUltimoSeguimiento;
	}

	public void setFechaUltimoSeguimiento(Date fechaUltimoSeguimiento) {
		this.fechaUltimoSeguimiento = fechaUltimoSeguimiento;
	}

	public Date getFechaLimite() {
		return fechaLimite;
	}

	public void setFechaLimite(Date fechaLimite) {
		this.fechaLimite = fechaLimite;
	}

	public double getEfectividad() {
		return efectividad;
	}

	public void setEfectividad(double efectividad) {
		this.efectividad = efectividad;
	}

	public double getAvance() {
		return avance;
	}

	public void setAvance(double avance) {
		this.avance = avance;
	}
}
