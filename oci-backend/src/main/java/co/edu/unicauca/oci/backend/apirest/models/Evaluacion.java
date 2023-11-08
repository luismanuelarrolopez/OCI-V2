package co.edu.unicauca.oci.backend.apirest.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Null;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "evaluaciones")
public class Evaluacion {

    @Id
    @Column(name = "id_evaluacion")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "observacion")
    private String observacion;

    @Column(name = "fecha_evaluacion")
    private Date fecha_evaluacion;

    @Column(name = "estado")
    private String estado;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_EVIDENCIA")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Evidencia objEvidencia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_PERSONA")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Person objPersona;
    
    
    public Evaluacion() {
	}

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public Date getFecha_evaluacion() {
		return fecha_evaluacion;
	}

	public void setFecha_evaluacion(Date fecha_evaluacion) {
		this.fecha_evaluacion = fecha_evaluacion;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Evidencia getObjEvidencia() {
		return objEvidencia;
	}

	public void setObjEvidencia(Evidencia objEvidencia) {
		this.objEvidencia = objEvidencia;
	}

	public Person getObjPersona() {
		return objPersona;
	}

	public void setObjPersona(Person objPersona) {
		this.objPersona = objPersona;
	}

	@Override
    public String toString() {
        return "id:" +this.getId() + 
               " - " + "Observacion: " +this.getObservacion()+ 
               " - " + "Fecha_evaluacion: " +  this.fecha_evaluacion.toString() + 
               " - " + "Estado: " + this.estado+
               " - " + "ID Evaluacion: " + this.objEvidencia.getId()+
               " - " + "ID persona: " + this.objPersona.getId();
    }
}
