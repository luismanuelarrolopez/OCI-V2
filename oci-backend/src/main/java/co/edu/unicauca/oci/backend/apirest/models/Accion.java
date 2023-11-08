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
@Table(name="acciones")
public class Accion {

	@Id
	@Column(name="ID_ACCION")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idAccion;
	

	@NotNull(message="no puede estar vacío")
	@Column(name="ACCION")
	private String accion;
	
	@NotNull(message="no puede estar vacío")
	@Column(name="DESCRIPCION")
	private String descripcion;
	
	/*@NotNull(message="no puede estar vacío")
	@Column(name="tipo_accion")
	private String tipoAccion;*/

	@ManyToOne
	@JoinColumn(name="ID_CAUSA")
	@JsonIgnoreProperties(value = { "listaAcciones" }, allowSetters = true)
	private Causa objCausa;
	
	/*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_TIPO_CONTROL")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    private TipoControl tipoControl;*/

	@OneToMany(mappedBy = "objAccion")
	private List<Actividad> listaActividades;

	public List<Actividad> getListaActividades() {
		return this.listaActividades;
	}

	public void setListaActividades(List<Actividad> listaActividades) {
		this.listaActividades = listaActividades;
	}

	public Causa getObjCausa() {
		return this.objCausa;
	}

	public void setObjCausa(Causa objCausa) {
		this.objCausa = objCausa;
	}

	public int getIdAccion() {
		return idAccion;
	}

	public void setIdAccion(int idAccion) {
		this.idAccion = idAccion;
	}


	public String getAccion() {
		return accion;
	}

	public void setAccion(String accion) {
		this.accion = accion;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	/*public TipoControl getTipoControl() {
		return tipoControl;
	}

	public void setTipoControl(TipoControl tipoControl) {
		this.tipoControl = tipoControl;
	}*/

	/*public String getTipoAccion() {
		return tipoAccion;
	}

	public void setTipoAccion(String tipoAccion) {
		this.tipoAccion = tipoAccion;
	}*/
}
