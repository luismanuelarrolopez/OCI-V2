package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

public class ActividadEstadistica_Dto {
    private int idActividad;
    private String estado;
    private double avance;

    public ActividadEstadistica_Dto() {
    }

    public int getIdActividad() {
        return idActividad;
    }

    public void setIdActividad(int idActividad) {
        this.idActividad = idActividad;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public double getAvance() {
        return avance;
    }

    public void setAvance(double avance) {
        this.avance = avance;
    }
}
