package co.edu.unicauca.oci.backend.apirest.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="causas")
public class Causa {
    @Id
    @Column(name="id_causa")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_causa;
    
    @NotNull(message="no puede estar vacío")
    @Column(name="causa")
    private String causa;

    /*@NotNull(message="no puede estar vacío")
    @Column(name="tipo_control")
    private String tipo_control;*/

    //@ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne
    @JoinColumn(name="ID_HALLAZGO")
    @JsonIgnoreProperties(value = { "listaCausas" }, allowSetters = true)
    private Hallazgo objHallazgo;

    @OneToMany(mappedBy = "objCausa")
    private List<Accion> listaAcciones;

    public List<Accion> getListaAcciones() {
        return this.listaAcciones;
    }

    public void setListaAcciones(List<Accion> listaAcciones) {
        this.listaAcciones = listaAcciones;
    }

    public Hallazgo getObjHallazgo() {
        return this.objHallazgo;
    }

    public void setObjHallazgo(Hallazgo objHallazgo) {
        this.objHallazgo = objHallazgo;
    }

    public Integer getId_causa() {
        return this.id_causa;
    }

    public void setId_causa(Integer id_causa) {
        this.id_causa = id_causa;
    }

    public String getCausa() {
        return this.causa;
    }

    public void setCausa(String causa) {
        this.causa = causa;
    }

    /*public String getTipo_control() {
        return this.tipo_control;
    }

    public void setTipo_control(String tipo_control) {
        this.tipo_control = tipo_control;
    }*/

}