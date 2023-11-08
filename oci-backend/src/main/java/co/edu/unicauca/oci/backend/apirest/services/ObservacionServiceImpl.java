package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unicauca.oci.backend.apirest.models.Observacion;
import co.edu.unicauca.oci.backend.apirest.repositories.ObservacionRepository;

@Service
public class ObservacionServiceImpl implements IObservacionService {

	@Autowired
	public ObservacionRepository servicioObservacion;
	
	@Override
	public List<Observacion> getObservacionByIdPlanMantenimiento(String idPlan) {
		return this.servicioObservacion.getObservacionByIdPlanMantenimiento(idPlan);
	}

	@Override
	public List<Observacion> findAll() {
		return (List<Observacion>) this.servicioObservacion.findAll();
	}

	@Override
	public Observacion save(Observacion observacion) {
		return this.servicioObservacion.save(observacion);
	}

	@Override
	public void deleteByIdObservacion(Integer id) {
		servicioObservacion.deleteById(id);
	}

	@Override
	public Observacion findById(Integer id) {
		return this.servicioObservacion.findById(id).orElse(null);
	}

}
