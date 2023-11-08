package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unicauca.oci.backend.apirest.models.Proceso;
import co.edu.unicauca.oci.backend.apirest.repositories.ProcesoRepository;

@Service
public class ProcesoServiceImpl implements IProcesoService {

	@Autowired
	private ProcesoRepository repository;
	
	@Override
	public List<Proceso> findAllProcess() {
		return repository.findAll();
	}

	@Override
	public List<Proceso> findAllSubProcess(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Proceso findById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
}
