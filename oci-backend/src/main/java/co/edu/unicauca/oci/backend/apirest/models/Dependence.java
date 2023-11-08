package co.edu.unicauca.oci.backend.apirest.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "dependencias")
public class Dependence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_DEPENDENCIA")
    private Integer id;

    @Column(name = "DEPENDENCIA")
    private String dependenceName;

    @JsonIgnoreProperties(value = { "objDependence" }, allowSetters = true)
    @OneToMany(mappedBy = "objDependence", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Position> positions;

    public Dependence() {
        this.positions = new ArrayList<>();
    }

    /**
     * @return Integer return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return String return the dependenceName
     */
    public String getDependenceName() {
        return dependenceName;
    }

    /**
     * @param dependenceName the dependenceName to set
     */
    public void setDependenceName(String dependenceName) {
        this.dependenceName = dependenceName;
    }

    /**
     * @return List<Position> return the positions
     */
    public List<Position> getPositions() {
        return positions;
    }

    /**
     * @param positions the positions to set
     */
    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

}