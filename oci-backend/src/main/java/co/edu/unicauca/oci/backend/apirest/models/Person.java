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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "personas")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PERSONA")
    private Integer id;

    @NotEmpty(message = "no puede estar vacio")
    @Column(name = "NOMBRES", nullable = false)
    private String names;

    @NotEmpty(message = "no puede estar vacio")
    @Column(name = "APELLIDOS", nullable = false)
    private String surnames;

    @Column(name = "IDENTIFICACION", nullable = false, unique = true)
    private Integer idPerson;

    @NotEmpty(message = "no puede estar vacio")
    @Column(name = "TIPO_DOCUMENTO", nullable = false)
    private String documentType;

    @NotEmpty(message = "no puede estar vacio")
    @Email(message = "no es una dirección de correo bien formada")
    @Column(name = "EMAIL", unique = true)
    private String email;

    @JsonIgnoreProperties(value = { "objPerson" }, allowSetters = true)
    @OneToOne(mappedBy = "objPerson", cascade = CascadeType.ALL)
    private User objUser;

    @ManyToOne
    @JoinColumn(name = "ID_CARGO")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Position objPosition;

    /*@JsonIgnoreProperties(value = { "objPersona" }, allowSetters = true)
    @OneToMany(mappedBy = "objPersona", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Evaluacion> evaluaciones;*/

    public Person() {
        //this.evaluaciones = new ArrayList<>();
    }

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public String getNames() {
        return names;
    }

    public void setNames(final String names) {
        this.names = names;
    }

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(final String surnames) {
        this.surnames = surnames;
    }

    public Integer getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(final Integer idPerson) {
        this.idPerson = idPerson;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(final String documentType) {
        this.documentType = documentType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    /**
     * @return Position return the objPosition
     */
    public Position getObjPosition() {
        return objPosition;
    }

    /**
     * @param objPosition the objPosition to set
     */
    public void setObjPosition(Position objPosition) {
        this.objPosition = objPosition;
    }

    /**
     * @return User return the objUser
     */
    public User getObjUser() {
        return objUser;
    }

    /**
     * @param objUser the objUser to set
     */
    public void setObjUser(User objUser) {
        this.objUser = objUser;
    }

    /**
     * @return List<Evaluacion> return the evaluaciones
     */
    /*public List<Evaluacion> getEvaluaciones() {
        return evaluaciones;
    }*/

    /**
     * @param evaluaciones the evaluaciones to set
     */
    /*public void setEvaluaciones(List<Evaluacion> evaluaciones) {
        this.evaluaciones = evaluaciones;
    }*/

}