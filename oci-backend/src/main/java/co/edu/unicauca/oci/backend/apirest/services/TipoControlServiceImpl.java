package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unicauca.oci.backend.apirest.models.TipoControl;
import co.edu.unicauca.oci.backend.apirest.repositories.TipoControlRepository;

@Service
public class TipoControlServiceImpl implements ITipoControlService {

	@Autowired
	private TipoControlRepository repository;
	
	@Override
	public List<TipoControl> findAllTipoControl() {
		return (List<TipoControl>) repository.findAll();
	}

}
