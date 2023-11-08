package co.edu.unicauca.oci.backend.apirest.dto_mepdm;

public class resumenActividad_Dto {
	private int ID_ACTIVIDAD;
	private String INDICADOR;
	private int VALOR_UNIDAD;
	private String PERIODICIDAD;
	private String RECURSO;
	private String responsable;
	
	public resumenActividad_Dto() {
		
	}

	public int getID_ACTIVIDAD() {
		return ID_ACTIVIDAD;
	}

	public void setID_ACTIVIDAD(int iD_ACTIVIDAD) {
		ID_ACTIVIDAD = iD_ACTIVIDAD;
	}

	public String getINDICADOR() {
		return INDICADOR;
	}

	public void setINDICADOR(String iNDICADOR) {
		INDICADOR = iNDICADOR;
	}

	public int getVALOR_UNIDAD() {
		return VALOR_UNIDAD;
	}

	public void setVALOR_UNIDAD(int vALOR_UNIDAD) {
		VALOR_UNIDAD = vALOR_UNIDAD;
	}

	public String getPERIODICIDAD() {
		return PERIODICIDAD;
	}

	public void setPERIODICIDAD(String pERIODICIDAD) {
		PERIODICIDAD = pERIODICIDAD;
	}

	public String getRECURSO() {
		return RECURSO;
	}

	public void setRECURSO(String rECURSO) {
		RECURSO = rECURSO;
	}

	public String getResponsable() {
		return responsable;
	}

	public void setResponsable(String responsable) {
		this.responsable = responsable;
	}
	
}
