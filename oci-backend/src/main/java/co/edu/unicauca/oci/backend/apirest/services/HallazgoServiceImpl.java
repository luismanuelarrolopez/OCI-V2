package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unicauca.oci.backend.apirest.models.Hallazgo;
import co.edu.unicauca.oci.backend.apirest.repositories.HallazgoRepository;

@Service
public class HallazgoServiceImpl implements IHallazgoService{

	@Autowired
	public HallazgoRepository servicioAccesoBdHallazgo; 
	
	@Override
	public List<Hallazgo> getHallazgosPorIdPlan(String idPlan) {
		return servicioAccesoBdHallazgo.getHallazgoByIdPlanMantenimiento(idPlan);
	}

	@Override
	public List<Hallazgo> findAll() {
		return servicioAccesoBdHallazgo.findAll();
	}

	@Override
	public Hallazgo save(Hallazgo hallazgo) {
		return servicioAccesoBdHallazgo.save(hallazgo);
	}

	@Override
	public Hallazgo findById(Integer id) {
		return servicioAccesoBdHallazgo.findById(id).orElse(null);
	}

	@Override
	public Integer contarHallazgos(int idPlan) {
		return null;
	}

	@Override
	public void deleteByIdHallazgo(Integer id) {
		servicioAccesoBdHallazgo.deleteById(id);
	}

	@Override
	public List<Integer> findHallazgosPorProceso(int idProceso) {
		return servicioAccesoBdHallazgo.findByIdProcess(idProceso);
	}

	@Override
	public List<Integer> findHallazgosActivos(){
		return servicioAccesoBdHallazgo.findAllHallazgosActivos();
	}
	
}
