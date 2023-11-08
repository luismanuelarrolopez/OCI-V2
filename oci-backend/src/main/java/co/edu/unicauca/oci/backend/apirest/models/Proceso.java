package co.edu.unicauca.oci.backend.apirest.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "procesos")
public class Proceso {

	@Id
	@Column(name = "id_proceso")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idProceso;

	@Column(name = "nombre_proceso")
	private String nombreProceso;
	
	public Proceso() {
		
	}

	public Integer getIdProceso() {
		return idProceso;
	}

	public void setIdProceso(Integer idProceso) {
		this.idProceso = idProceso;
	}

	public String getNombreProceso() {
		return nombreProceso;
	}

	public void setNombreProceso(String nombreProceso) {
		this.nombreProceso = nombreProceso;
	}

}
