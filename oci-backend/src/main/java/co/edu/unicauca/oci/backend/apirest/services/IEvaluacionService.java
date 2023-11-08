package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;
import java.util.Optional;

import co.edu.unicauca.oci.backend.apirest.models.Evaluacion;

public interface IEvaluacionService {
	
	public Evaluacion findByIdPerson(Integer idPerson);

	public List<Evaluacion> listar();
	
	public List<Evaluacion> listarPorIdEvidencia(int idEvidencia);
	
	public Evaluacion save(Evaluacion objEvaluacion);
	
	public Evaluacion update(Evaluacion objEvaluacion);
	
	public void delete(int idEvaluacion);

	public Optional<Evaluacion> findById(int idEvaluacion);
	
	public int guardarEvaluacionNulos (Evaluacion eval);
	
	public Evaluacion findByIdEvaluacion (int idEvaluacion);
}