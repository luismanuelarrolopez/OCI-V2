package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unicauca.oci.backend.apirest.models.Causa;
import co.edu.unicauca.oci.backend.apirest.repositories.CausaRepository;

@Service
public class CausaServiceImpl implements ICausaService{

	@Autowired
	private CausaRepository serviceAccessDBCausa;
	
	@Override
	public List<Causa> getCausasPorIdHallazgo(int idHallazgo) {
		return serviceAccessDBCausa.getCausasByIdHallazgo(idHallazgo);
	}

	@Override
	public List<Causa> findAll() {
		return  serviceAccessDBCausa.findAll();
	}

	@Override
	public Causa save(Causa causa) {
		return serviceAccessDBCausa.save(causa);
	}

	@Override
	public Causa findById(Integer id) {
		return serviceAccessDBCausa.findById(id).orElse(null);
	}

	@Override
	public void deleteByIdCausa(Integer id) {
		serviceAccessDBCausa.deleteById(id);
	}
	
}
