package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

public class Actividad_Dto {

	private int idActividad;
	
	private String actividad;
	
	public Actividad_Dto() {
		this.idActividad = 0;
		this.actividad = "";
	}

	public int getIdActividad() {
		return idActividad;
	}

	public void setIdActividad(int idActividad) {
		this.idActividad = idActividad;
	}

	public String getActividad() {
		return actividad;
	}

	public void setActividad(String actividad) {
		this.actividad = actividad;
	}

}
