package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.edu.unicauca.oci.backend.apirest.models.Proceso;
import co.edu.unicauca.oci.backend.apirest.repositories.ProcesoRepository;

public class ImplProcesos implements IProcesoService{

	@Autowired
	private ProcesoRepository repo;
	
	@Override
	@Transactional(readOnly = true)
	public List<Proceso> findAllProcess() {
		return repo.listProces();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Proceso> findAllSubProcess(Integer id) {
		return repo.listSubProces(id);
	}

	@Override
    @Transactional(readOnly = true)
    public Proceso findById(Integer id) {
        return repo.findById(id).orElse(null);
    }
	
}
