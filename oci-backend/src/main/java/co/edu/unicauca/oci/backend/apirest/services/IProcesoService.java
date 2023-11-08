package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import co.edu.unicauca.oci.backend.apirest.models.Proceso;

public interface IProcesoService {

	public List<Proceso> findAllProcess();
	public List<Proceso> findAllSubProcess(Integer id);
	public Proceso findById(Integer id);
}
