package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.edu.unicauca.oci.backend.apirest.models.Evaluacion;
import co.edu.unicauca.oci.backend.apirest.repositories.EvaluacionRepository;

@Service
public class EvaluacionServiceImpl implements IEvaluacionService {

	@Autowired
	private EvaluacionRepository servicioAccesoBDEvaluacion;

	 @Override
	 public Evaluacion findByIdPerson(Integer idPerson) {
	    return servicioAccesoBDEvaluacion.findByIdPerson(idPerson);
	 }
	 
	@Override
	public List<Evaluacion> listar() {
		return (List<Evaluacion>) servicioAccesoBDEvaluacion.findAll();
	}

	@Override
	public List<Evaluacion> listarPorIdEvidencia(int idEvidencia) {
		return servicioAccesoBDEvaluacion.listarPorIdEvidencia(idEvidencia);
	}

	@Override
	public Evaluacion save(Evaluacion objEvaluacion) {
		return servicioAccesoBDEvaluacion.save(objEvaluacion);
	}

	@Override
	public Evaluacion update(Evaluacion objEvaluacion) {
		return servicioAccesoBDEvaluacion.save(objEvaluacion);
	}

	@Override
	public void delete(int idEvaluacion) {
		servicioAccesoBDEvaluacion.deleteById(idEvaluacion);
	}

	@Override
	public Optional<Evaluacion> findById(int idEvaluacion) {
		return servicioAccesoBDEvaluacion.findById(idEvaluacion);
	}

	@Override
	public int guardarEvaluacionNulos(Evaluacion eval) {
		return servicioAccesoBDEvaluacion.guardarEvaluacion(eval.getEstado(), eval.getObjPersona().getIdPerson());
	}

	@Override
	public Evaluacion findByIdEvaluacion(int idEvaluacion) {
		return servicioAccesoBDEvaluacion.findByIdEvaluacion(idEvaluacion);
	}

}
