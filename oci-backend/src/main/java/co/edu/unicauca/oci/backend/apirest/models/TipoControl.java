package co.edu.unicauca.oci.backend.apirest.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tipo_control")
public class TipoControl {

	@Id
	@Column(name = "ID_TIPO_CONTROL")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idTipoControl;

	@Column(name = "NOMBRE_TIPO_CONTROL")
	private String nombreTipoControl;
	
	TipoControl(){}

	public Integer getIdTipoControl() {
		return idTipoControl;
	}

	public void setIdTipoControl(Integer idTipoControl) {
		this.idTipoControl = idTipoControl;
	}

	public String getNombreTipoControl() {
		return nombreTipoControl;
	}

	public void setNombreTipoControl(String nombreTipoControl) {
		this.nombreTipoControl = nombreTipoControl;
	}
	
	
}
