package co.edu.unicauca.oci.backend.apirest.utils;

public enum EstadoActividad {
    INCUMPLIDA("Incumplida"),
    TERMINADA("Terminada"),
    ACTIVA("Activa"),
    POR_VENCERSE("Por vencerse");

	private String nombre;
	private EstadoActividad(String nombre){
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}

}