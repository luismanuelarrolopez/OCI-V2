package co.edu.unicauca.oci.backend.apirest.models;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "evidencias")
public class Evidencia {
	
	@Id
	@Column(name = "id_evidencia")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "evidencia")
	private String evidencia;
	
	@Column(name = "linkEvidencia")
	private String linkEvidencia;

	@Column(name = "fechaCargue")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaCargue;
	
	/*@OneToMany(mappedBy = "objEvidencia", fetch = FetchType.LAZY)
	private List<Soporte> objSoporte;
	
	@OneToMany(mappedBy = "objEvidencia", fetch = FetchType.LAZY)
	private List<Evaluacion> objEvaluacion;*/

	@ManyToOne
	@JoinColumn(name="ID_ACTIVIDAD")
	private Actividad objActividad;
	
	public Actividad getObjActividad() {
		return this.objActividad;
	}

	public void setObjActividad(Actividad objActividad) {
		this.objActividad = objActividad;
	}

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getEvidencia() {
		return evidencia;
	}
	
	public void setEvidencia(String evidencia) {
		this.evidencia = evidencia;
	}

	public String getLinkEvidencia() {
		return linkEvidencia;
	}

	public void setLinkEvidencia(String linkEvidencia) {
		this.linkEvidencia = linkEvidencia;
	}

	public Date getFechaCargue() {
		return fechaCargue;
	}

	public void setFechaCargue(Date fechaCargue) {
		this.fechaCargue = fechaCargue;
	}
	
	/*public List<Soporte> getSoportes(){
		return objSoporte;
	}

	public void setSoportes(List<Soporte> soporte){
		this.objSoporte = soporte;
	}

	public List<Evaluacion> getEvaluacion(){
		return objEvaluacion;
	}

	public void setEvaluacion(List<Evaluacion> evaluacion){
		this.objEvaluacion = evaluacion;
	}*/
}
