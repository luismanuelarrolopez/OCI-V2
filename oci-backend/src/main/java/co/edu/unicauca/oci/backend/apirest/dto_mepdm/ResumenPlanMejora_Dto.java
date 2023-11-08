package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

import java.util.ArrayList;
import java.util.List;

public class ResumenPlanMejora_Dto {

	private int ID_HALLAZGO;
	private String HALLAZGO;
	private List<resumenCausa_Dto> CAUSA = new ArrayList<>();
	

	public ResumenPlanMejora_Dto() {
	}

	public int getID_HALLAZGO() {
		return ID_HALLAZGO;
	}

	public void setID_HALLAZGO(int iD_HALLAZGO) {
		ID_HALLAZGO = iD_HALLAZGO;
	}

	public String getHALLAZGO() {
		return HALLAZGO;
	}

	public void setHALLAZGO(String hALLAZGO) {
		HALLAZGO = hALLAZGO;
	}

	public List<resumenCausa_Dto> getCAUSA() {
		return CAUSA;
	}

	public void setCAUSA(List<resumenCausa_Dto> cAUSA) {
		CAUSA = cAUSA;
	}
	

}
