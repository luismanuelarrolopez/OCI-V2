package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

import java.util.Date;

public class tableroResponsable_Dto {
	private String idPlan;
	private String nombreAuditor;
	private String nombrePlan;
	private String estadoPlan;
	private Date fechaUltimaModificacion;
	private Date fechaLimite;
	private String estadoActividad;
	private float avance;
	private String tipoAccion;
	private int idAccion;
	
	public tableroResponsable_Dto() {
		this.idPlan = "";
		this.nombreAuditor = "";
		this.nombrePlan = "";
		this.estadoPlan = "";
		this.fechaUltimaModificacion = null;
		this.fechaLimite = null;
		this.estadoActividad = "";
		this.avance = 0;
		this.tipoAccion = "";
		this.idAccion = 0;
	}

	public String getIdPlan() {
		return idPlan;
	}

	public void setIdPlan(String string) {
		this.idPlan = string;
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
		return estadoPlan;
	}

	public void setEstado(String estado) {
		this.estadoPlan = estado;
	}

	public Date getFechaUltimoSeguimiento() {
		return fechaUltimaModificacion;
	}

	public void setFechaUltimoSeguimiento(Date fechaUltimoSeguimiento) {
		this.fechaUltimaModificacion = fechaUltimoSeguimiento;
	}

	public Date getFechaLimite() {
		return fechaLimite;
	}

	public void setFechaLimite(Date fechaLimite) {
		this.fechaLimite = fechaLimite;
	}

	public String getEfectividad() {
		return estadoActividad;
	}

	public void setEfectividad(String efectividad) {
		this.estadoActividad = efectividad;
	}

	public float getAvance() {
		return avance;
	}

	public void setAvance(float avance) {
		this.avance = avance;
	}

	public String getEstadoPlan() {
		return estadoPlan;
	}

	public void setEstadoPlan(String estadoPlan) {
		this.estadoPlan = estadoPlan;
	}

	public Date getFechaUltimaModificacion() {
		return fechaUltimaModificacion;
	}

	public void setFechaUltimaModificacion(Date fechaUltimaModificacion) {
		this.fechaUltimaModificacion = fechaUltimaModificacion;
	}

	public String getEstadoActividad() {
		return estadoActividad;
	}

	public void setEstadoActividad(String estadoActividad) {
		this.estadoActividad = estadoActividad;
	}

	public String getTipoAccion() {
		return tipoAccion;
	}

	public void setTipoAccion(String tipoAccion) {
		this.tipoAccion = tipoAccion;
	}

	public int getIdAccion() {
		return idAccion;
	}

	public void setIdAccion(int idAccion) {
		this.idAccion = idAccion;
	}
	
}
