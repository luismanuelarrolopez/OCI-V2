package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

import java.util.ArrayList;
import java.util.List;

public class resumenCausa_Dto {


	private int ID_CAUSA;
	private String CAUSA;
	private List<ResumenAccion_Dto> Accion = new ArrayList<>();
	
	public resumenCausa_Dto() {}

	public int getID_CAUSA() {
		return ID_CAUSA;
	}

	public void setID_CAUSA(int iD_CAUSA) {
		ID_CAUSA = iD_CAUSA;
	}

	public String getCAUSA() {
		return CAUSA;
	}

	public void setCAUSA(String cAUSA) {
		CAUSA = cAUSA;
	}

	public List<ResumenAccion_Dto> getAccion() {
		return Accion;
	}

	public void setAccion(List<ResumenAccion_Dto> accion) {
		Accion = accion;
	}
	
}
