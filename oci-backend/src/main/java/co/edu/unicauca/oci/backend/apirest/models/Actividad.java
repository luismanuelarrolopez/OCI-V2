package co.edu.unicauca.oci.backend.apirest.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="actividades")
public class Actividad {
    
    @Id
    @Column(name="id_actividad")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_actividad;
    
    /*@NotNull(message="no puede estar vacío")
    @Column(name="actividad")
    private String actividad;*/

    @NotNull(message="no puede estar vacío")
    @Column(name="periodicidad")
    private String periodicidad;

    @NotNull(message="no puede estar vacío")
    @Column(name="indicador")
    private String indicador;

    @NotNull(message="no puede estar vacío")
    @Column(name="tipo_unidad")
    private String tipo_unidad;

    @NotNull(message="no puede estar vacío")
    @Column(name="valor_unidad")
    private Integer valor_unidad;

    @NotNull(message="no puede estar vacío")
    @Column(name="recurso")
    private String recurso;

    @Column(name="estado")
    private String estado;

    @NotNull(message="no puede estar vacío")
    @Column(name="fechaEjecucion")
    private Date fechaEjecucion;
    
    @Column(name="fechaSeguimiento")
    private Date fechaSeguimiento;
    
    @Column(name="fechaTerminacion")
    private Date fechaTerminacion;
    
    @Column(name="descripcionActividad")
    private String descripcionActividad;

    @Column(name="tipoEvidencia")
    private String tipoEvidencia;

    @Column(name="avance")
    private Double avance;

    @Column(name="cumplimiento")
    private String cumplimiento;
    
    //@NotNull(message="no puede estar vacío")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_RESPONSABLE")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Person objResponsable;

    @ManyToOne
    @JoinColumn(name="id_accion")
    @JsonIgnoreProperties(value = { "listaActividades" }, allowSetters = true)
    private Accion objAccion;

    public Accion getObjAccion() {
        return this.objAccion;
    }

    public void setObjAccion(Accion objAccion) {
        this.objAccion = objAccion;
    }
    
    public Integer getId_Actividad() {
        return this.id_actividad;
    }

    public void setId_Actividad(Integer id_actividad) {
        this.id_actividad = id_actividad;
    }

    public String getPeriodicidad() {
        return this.periodicidad;
    }

    public void setPeriodicidad(String periodicidad) {
        this.periodicidad = periodicidad;
    }

    public String getIndicador() {
        return this.indicador;
    }

    public void setIndicador(String indicador) {
        this.indicador = indicador;
    }

    public String getTipo_unidad() {
        return this.tipo_unidad;
    }

    public void setTipo_unidad(String tipo_unidad) {
        this.tipo_unidad = tipo_unidad;
    }

    public Integer getValor_unidad() {
        return this.valor_unidad;
    }

    public void setValor_unidad(Integer valor_unidad) {
        this.valor_unidad = valor_unidad;
    }

    public String getRecurso() {
        return this.recurso;
    }

    public void setRecurso(String recurso) {
        this.recurso = recurso;
    }

    public String getEstado() {
        return this.estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

	public Person getObjResponsable() {
		return objResponsable;
	}

	public void setObjResponsable(Person objResponsable) {
		this.objResponsable = objResponsable;
	}

	public Date getFechaEjecucion() {
		return fechaEjecucion;
	}

	public void setFechaEjecucion(Date fechaEjecucion) {
		this.fechaEjecucion = fechaEjecucion;
	}

	public Date getFechaSeguimiento() {
		return fechaSeguimiento;
	}

	public void setFechaSeguimiento(Date fechaSeguimiento) {
		this.fechaSeguimiento = fechaSeguimiento;
	}

	public Date getFechaTerminacion() {
		return fechaTerminacion;
	}

	public void setFechaTerminacion(Date fechaTerminacion) {
		this.fechaTerminacion = fechaTerminacion;
	}

	public String getDescripcionActividad() {
		return descripcionActividad;
	}

	public void setDescripcionActividad(String descripcionActividad) {
		this.descripcionActividad = descripcionActividad;
	}

    public String getTipoEvidencia() {
        return tipoEvidencia;
    }

    public void setTipoEvidencia(String tipoEvidencia) {this.tipoEvidencia = tipoEvidencia;}

    public Double getAvance(){ return avance; }

    public void setAvance(Double avance) { this.avance = avance; }

    public String getCumplimiento(){ return cumplimiento; }

    public void setCumplimiento(String cumplimiento){ this.cumplimiento = cumplimiento; }

}