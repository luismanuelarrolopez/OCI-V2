package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import co.edu.unicauca.oci.backend.apirest.models.Observacion;

public interface IObservacionService {
	public List<Observacion> getObservacionByIdPlanMantenimiento(String idPlan);
	public List<Observacion> findAll();
	public Observacion findById(Integer id);
	public Observacion save(Observacion observacion);
	public void deleteByIdObservacion(Integer id);
}
