package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.unicauca.oci.backend.apirest.models.Observacion;

public interface ObservacionRepository extends CrudRepository<Observacion, Integer>{

	@Query(value = "SELECT * FROM observaciones WHERE ID_PLAN_MEJORAMIENTO = ?1", nativeQuery = true)
	public List<Observacion> getObservacionByIdPlanMantenimiento(String idPlanMantenimiento);
}
