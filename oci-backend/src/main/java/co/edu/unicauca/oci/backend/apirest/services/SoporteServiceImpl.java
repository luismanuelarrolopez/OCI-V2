package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.edu.unicauca.oci.backend.apirest.models.Soporte;
import co.edu.unicauca.oci.backend.apirest.repositories.SoporteRepository;

@Service
public class SoporteServiceImpl implements ISoporteService {

	@Autowired
	private SoporteRepository servicioAccesoBDSoporte;
	
	@Override
	public List<Soporte> listar() {
		return (List<Soporte>) servicioAccesoBDSoporte.findAll();
	}

	@Override
	public List<Soporte> listarPorIdEvidencia(int idEvidencia) {
		return servicioAccesoBDSoporte.listarPorIdEvidencia(idEvidencia);
	}
	
	@Override
	public Soporte save(Soporte objSoporte) {
		return servicioAccesoBDSoporte.save(objSoporte);
	}

	@Override
	public Soporte update(Soporte objSoporte) {
		return servicioAccesoBDSoporte.save(objSoporte);
	}

	@Override
	public void delete(int idSoporte) {
		servicioAccesoBDSoporte.deleteById(idSoporte);
	}

	@Override
	public Optional<Soporte> findById(int idSoporte) {
		return servicioAccesoBDSoporte.findById(idSoporte);
	}

}
