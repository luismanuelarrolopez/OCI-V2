package co.edu.unicauca.oci.backend.apirest.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import co.edu.unicauca.oci.backend.apirest.utils.AESEncriptarDesencriptar;

/**
 * PlanMejoramiento
 */
@Entity
@Table(name = "planes_de_mejoramiento")
public class PlanMejoramiento {

    @Id
    @Column(name = "id_plan_mejoramiento")
    private String idPlanMejoramiento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_persona")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Person objLiderAuditor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "per_id_persona")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Person objLiderProceso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proceso")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Proceso proceso;

    @OneToMany(mappedBy = "objPlan")
    private List<Hallazgo> listaHallazgos;

    @OneToMany
    @JoinColumn(name = "objPlan")
    private List<Observacion> listaObservaciones;

    @NotEmpty(message = "no puede estar vacío")
    @Column(name = "nombre_plan")
    private String nombre;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_inicio")
    private Date fechaInicio;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_fin")
    private Date fechaFin;

    @Temporal(TemporalType.DATE)
    @Column(name = "FECHA_SUSCRIPCION")
    private Date fechaSuscripcion;

    @Column(name = "path_soporte")
    private String pathSoporte = "";

    @Column(name = "prorrogado")
    private boolean prorrogado;

    @Column(name = "estado_plan")
    private String estado;

    @Temporal(TemporalType.DATE)
    @Column(name = "create_at")
    private Date createAt;

    @Transient
    private String codeURL;

    @Column(name = "avance")
    private Double avance;

    @Column(name = "cumplimiento")
    private Double cumplimiento;

    public String getIdPlanMejoramiento() {
        return idPlanMejoramiento;
    }

    public void setIdPlanMejoramiento(String idPlanMejoramiento) {
        this.idPlanMejoramiento = idPlanMejoramiento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getPathSoporte() {
        return pathSoporte;
    }

    public void setPathSoporte(String pathSoporte) {
        this.pathSoporte = pathSoporte;
    }

    public boolean isProrrogado() {
        return prorrogado;
    }

    public void setProrrogado(boolean prorrogado) {
        this.prorrogado = prorrogado;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Date getCreateAt() {
        return this.createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Person getObjLiderAuditor() {
        return this.objLiderAuditor;
    }

    public void setObjLiderAuditor(Person objLiderAuditor) {
        this.objLiderAuditor = objLiderAuditor;
    }

    public Person getObjLiderProceso() {
        return this.objLiderProceso;
    }

    public void setObjLiderProceso(Person objLiderProceso) {
        this.objLiderProceso = objLiderProceso;
    }

    public List<Hallazgo> getListaHallazgos() {
        return this.listaHallazgos;
    }

    public void setListaHallazgos(List<Hallazgo> listaHallazgos) {
        this.listaHallazgos = listaHallazgos;
    }

    public String getCodeURL() {
        return codeURL;
    }

    public void setCodeURL(String codeURL) {
        this.codeURL = codeURL;
    }

    public Proceso getProceso() {
        return proceso;
    }

    public void setProceso(Proceso proceso) {
        this.proceso = proceso;
    }

    public Date getFechaSuscripcion() {
        return fechaSuscripcion;
    }

    public void setFechaSuscripcion(Date fechaSuscripcion) {
        this.fechaSuscripcion = fechaSuscripcion;
    }

    public Double getAvance(){ return avance; }

    public void setAvance(Double avance) { this.avance = avance; }

    public Double getCumplimiento(){ return cumplimiento; }

    public void setCumplimiento(Double cumplimiento){ this.cumplimiento = cumplimiento; }

}