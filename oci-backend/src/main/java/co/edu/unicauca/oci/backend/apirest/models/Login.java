package co.edu.unicauca.oci.backend.apirest.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ingresos")
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_INGRESO")
    private Integer id;

    @Column(name = "FECHA_INGRESO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date loginDate;

    @NotEmpty
    @Column(name = "ROL_HISTORICO")
    private String historicalRole;

    @JsonIgnoreProperties(value = { "logins" }, allowSetters = true)
    @ManyToOne
    @JoinColumn(name = "ID_USUARIO")
    private User objUser;

    public Login() {
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
     * @return Date return the loginDate
     */
    public Date getLoginDate() {
        return loginDate;
    }

    /**
     * @param loginDate the loginDate to set
     */
    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
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
     * @return String return the historicalRole
     */
    public String getHistoricalRole() {
        return historicalRole;
    }

    /**
     * @param historicalRole the historicalRole to set
     */
    public void setHistoricalRole(String historicalRole) {
        this.historicalRole = historicalRole;
    }

}