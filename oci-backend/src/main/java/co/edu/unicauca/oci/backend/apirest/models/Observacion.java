package co.edu.unicauca.oci.backend.apirest.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "observaciones")
public class Observacion {
    
    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_registro")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha_registro;

    @Column(name = "estado")
    private String estado;
    @Column(name = "tipo_plan_mejora")
    private String tipo_plan_mejora;

    @NotNull(message="no puede estar vacío")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_PERSONA")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Person objPerson;

    @ManyToOne
    @JoinColumn(name="id_plan_mejoramiento")
    //@NotNull(message="no puede estar vacío")
    @JsonIgnoreProperties(value = { "listaHallazgos" }, allowSetters = true)
    private PlanMejoramiento objPlan;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID_OBSERVACION")
    private Integer id_observacion;
    
    //Constructors
    public Observacion() {
    }

    public Person getObjPerson() {
        return this.objPerson;
    }

    public void setObjPerson(Person objPerson) {
        this.objPerson = objPerson;
    }

    public PlanMejoramiento getObjPlan() {
        return this.objPlan;
    }

    public void setObjPlan(PlanMejoramiento objPlan) {
        this.objPlan = objPlan;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFecha_registro() {
        return this.fecha_registro;
    }

    public void setFecha_registro(Date fecha_registro) {
        this.fecha_registro = fecha_registro;
    }

    public String getEstado() {
        return this.estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getTipo_plan_mejora() {
        return this.tipo_plan_mejora;
    }

    public void setTipo_plan_mejora(String tipo_plan_mejora) {
        this.tipo_plan_mejora = tipo_plan_mejora;
    }

	public Integer getId_observacion() {
		return id_observacion;
	}

	public void setId_observacion(Integer id_observacion) {
		this.id_observacion = id_observacion;
	}

}