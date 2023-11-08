package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import co.edu.unicauca.oci.backend.apirest.models.Causa;

public interface ICausaService {

	public List<Causa> getCausasPorIdHallazgo(int idHallazgo);
	public List<Causa> findAll();

	public Causa save(Causa causa);
	public Causa findById(Integer idCausa);
	public void deleteByIdCausa(Integer id);

}
