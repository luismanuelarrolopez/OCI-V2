package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import co.edu.unicauca.oci.backend.apirest.models.Soporte;

public interface SoporteRepository extends CrudRepository<Soporte, Integer>{

	@Query(value = "SELECT * FROM SOPORTES WHERE ID_EVIDENCIA = ?1", nativeQuery = true)
	public List<Soporte> listarPorIdEvidencia(int idEvidencia);
}
