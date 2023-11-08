package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;
import java.util.Optional;

import co.edu.unicauca.oci.backend.apirest.models.Soporte;

public interface ISoporteService {

	public List<Soporte> listar();
	
	public List<Soporte> listarPorIdEvidencia(int idEvidencia);
	
	public Soporte save(Soporte objSoporte);
	
	public Soporte update(Soporte objSoporte);
	
	public void delete(int idSoporte);
	
	public Optional<Soporte> findById(int idSoporte);
}
