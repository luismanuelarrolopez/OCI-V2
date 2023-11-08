package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.unicauca.oci.backend.apirest.models.Causa;

public interface CausaRepository extends CrudRepository<Causa,Integer>{

	@Query(value = "SELECT * FROM causas WHERE ID_HALLAZGO = ?1", nativeQuery = true)
	public List<Causa> getCausasByIdHallazgo(int id_hallazgo);
	public List<Causa> findAll();
}
