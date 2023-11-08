package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

import co.edu.unicauca.oci.backend.apirest.models.Observacion;

import java.util.Date;
import java.util.List;

public class ControlPM_Dto {

    private String idPlan;
    private String descripcionPlan;
    private String proceso;
    private Date fechaVencimiento;
    private double avance;
    private double cumplimiento;
    private String estado;
    private Date fechaSuscripcion;
    private Date fechaInicio;
    private Date fechaSeguimiento;
    private String nombreLiderAuditor;
    private List<String> observaciones;

    public String getIdPlan() {
        return idPlan;
    }

    public void setIdPlan(String idPlan) { this.idPlan = idPlan;}

    public String getDescripcionPlan() {
        return descripcionPlan;
    }

    public void setDescripcionPlan(String descripcionPlan) {
        this.descripcionPlan = descripcionPlan;
    }

    public String getProceso() {
        return proceso;
    }

    public void setProceso(String proceso) {
        this.proceso = proceso;
    }

    public Date getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(Date fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public double getAvance() {
        return avance;
    }

    public void setAvance(double avance) {
        this.avance = avance;
    }

    public double getCumplimiento() {
        return cumplimiento;
    }

    public void setCumplimiento(double cumplimiento) {
        this.cumplimiento = cumplimiento;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getNombreLiderAuditor() {
        return nombreLiderAuditor;
    }

    public void setNombreLiderAuditor(String nombreLiderAuditor) {
        this.nombreLiderAuditor = nombreLiderAuditor;
    }

    public Date getFechaSuscripcion() {
        return fechaSuscripcion;
    }

    public void setFechaSuscripcion(Date fechaSuscripcion) {
        this.fechaSuscripcion = fechaSuscripcion;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaSeguimiento() {
        return fechaSeguimiento;
    }

    public void setFechaSeguimiento(Date fechaSeguimiento) {
        this.fechaSeguimiento = fechaSeguimiento;
    }

    public List<String> getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(List<String> observaciones) {
        this.observaciones = observaciones;
    }
}
