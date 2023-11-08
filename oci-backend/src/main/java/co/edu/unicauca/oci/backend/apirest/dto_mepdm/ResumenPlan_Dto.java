package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

public class ResumenPlan_Dto {
	private int idHallazgo;
	private int idCausa;
	private int idAccion;
	private int idActividad;

	public ResumenPlan_Dto() {
		this.idHallazgo = 0;
		this.idCausa = 0;
		this.idAccion = 0;
		this.idActividad = 0;
	}

	public int getIdHallazgo() {
		return this.idHallazgo;
	}

	public void setIdHallazgo(int idHallazgo) {
		this.idHallazgo = idHallazgo;
	}

	public int getIdCausa() {
		return this.idCausa;
	}

	public void setIdCausa(int idCausa) {
		this.idCausa = idCausa;
	}

	public int getIdAccion() {
		return this.idAccion;
	}

	public void setIdAccion(int idAccion) {
		this.idAccion = idAccion;
	}

	public int getIdActividad() {
		return this.idActividad;
	}

	public void setIdActividad(int idActividad) {
		this.idActividad = idActividad;
	}
}
