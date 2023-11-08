package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

import java.util.ArrayList;
import java.util.List;

public class ResumenAccion_Dto {

	private int ID_ACCION;
	private String ACCION;
	private String DESCRIPCION;
	//private String NOMBRE_TIPO_CONTROL;
	private List<resumenActividad_Dto> ACTIVIDAD = new ArrayList<>();
	
	public ResumenAccion_Dto() {}
	
	

	public int getID_ACCION() {
		return ID_ACCION;
	}

	public void setID_ACCION(int iD_ACCION) {
		ID_ACCION = iD_ACCION;
	}

	public String getACCION() {
		return ACCION;
	}

	public void setACCION(String aCCION) {
		ACCION = aCCION;
	}

	public String getDESCRIPCION() {
		return DESCRIPCION;
	}

	public void setDESCRIPCION(String dESCRIPCION) {
		DESCRIPCION = dESCRIPCION;
	}

	/*public String getNOMBRE_TIPO_CONTROL() {
		return NOMBRE_TIPO_CONTROL;
	}

	public void setNOMBRE_TIPO_CONTROL(String nOMBRE_TIPO_CONTROL) {
		NOMBRE_TIPO_CONTROL = nOMBRE_TIPO_CONTROL;
	}*/



	public List<resumenActividad_Dto> getACTIVIDAD() {
		return ACTIVIDAD;
	}



	public void setACTIVIDAD(List<resumenActividad_Dto> aCTIVIDAD) {
		ACTIVIDAD = aCTIVIDAD;
	}

	
	
	
}
