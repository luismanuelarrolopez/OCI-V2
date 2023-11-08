package co.edu.unicauca.oci.backend.apirest.utils;

public enum EstadoPDM {
    CERRADO("Cerrado"), 
    INACTIVO("Inactivo"),
    EN_EJECUCION("Ejecución"), 
    EN_REVISION("Revisión"), 
	FORMULACION("Formulación");
	
	private String nombre;
	private EstadoPDM (String nombre){
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}

}