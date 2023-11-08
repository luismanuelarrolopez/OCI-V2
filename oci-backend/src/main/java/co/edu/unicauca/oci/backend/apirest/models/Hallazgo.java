package co.edu.unicauca.oci.backend.apirest.models;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name="hallazgos")
public class Hallazgo {
    //Atributes
    @Id
    @Column(name="id_hallazgo")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_hallazgo;
    
    @NotNull(message="no puede estar vacío")
    @Column(name="hallazgo")
    private String hallazgo;

    /*@Column(name="id_plan_mejoramiento")
    private Integer id_plan_mejoramiento;*/ 
    
    @ManyToOne
    @JoinColumn(name="id_plan_mejoramiento")
    //@NotNull(message="no puede estar vacío")
    @JsonIgnoreProperties(value = { "listaHallazgos" }, allowSetters = true)
    private PlanMejoramiento objPlan;

    /*@OneToMany(mappedBy = "objHallazgo")
    private List<Causa> listaCausas;

    public List<Causa> getListaCausas() {
        return this.listaCausas;
    }

    public void setListaCausas(List<Causa> listaCausas) {
        this.listaCausas = listaCausas;
    }*/

    public PlanMejoramiento getObjPlan() {
        return this.objPlan;
    }

    public void setObjPlan(PlanMejoramiento objPlan) {
        this.objPlan = objPlan;
    }

    //Constructors
    public Hallazgo() {
    }

    public Hallazgo(Integer id_hallazgo, String hallazgo, Integer id_plan_mejoramiento) {
        this.id_hallazgo = id_hallazgo;
        this.hallazgo = hallazgo;
        //this.id_plan_mejoramiento = id_plan_mejoramiento;
    }

    // Getters and Setters
    public Integer getId_hallazgo() {
        return this.id_hallazgo;
    }

    public void setId_hallazgo(Integer id_hallazgo) {
        this.id_hallazgo = id_hallazgo;
    }

    public String getHallazgo() {
        return this.hallazgo;
    }

    public void setHallazgo(String hallazgo) {
        this.hallazgo = hallazgo;
    }

    /*public Integer getId_plan_mejoramiento() {
        return this.id_plan_mejoramiento;
    }

    public void setId_plan_mejoramiento(Integer id_plan_mejoramiento) {
        this.id_plan_mejoramiento = id_plan_mejoramiento;
    }*/
    
    // Object methods
    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Hallazgo)) {
            return false;
        }
        Hallazgo hallazgos = (Hallazgo) o;
        return Objects.equals(id_hallazgo, hallazgos.id_hallazgo) && Objects.equals(hallazgo, hallazgos.hallazgo);// && Objects.equals(id_plan_mejoramiento, hallazgos.id_plan_mejoramiento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_hallazgo, hallazgo);//, id_plan_mejoramiento);
    }

    
    /*@Override
    public String toString() {
        return "{" +
            " id_hallazgo='" + getId_hallazgo() + "'" +
            ", hallazgo='" + getHallazgo() + "'" +
            ", id_plan_mejoramiento='" + getId_plan_mejoramiento() + "'" +
            "}";
    } */       
}
