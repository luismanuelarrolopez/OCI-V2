package co.edu.unicauca.oci.backend.apirest.utils;

public enum EstadoEvaluacion {
	PENDIENTE("Pendiente"), 
    APROBADO("Aprobado"),
    RECHAZADO("Rechazado");
	
	private String nombre;
	private EstadoEvaluacion (String nombre){
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}
}
