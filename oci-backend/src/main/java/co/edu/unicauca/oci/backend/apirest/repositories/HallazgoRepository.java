package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.unicauca.oci.backend.apirest.models.Hallazgo;

public interface HallazgoRepository extends CrudRepository<Hallazgo,Integer>{
	
	@Query(value = "SELECT * FROM hallazgos WHERE ID_PLAN_MEJORAMIENTO = ?1", nativeQuery = true)
	public List<Hallazgo> getHallazgoByIdPlanMantenimiento(String idPlanMantenimiento);
	public List<Hallazgo> findAll();
	@Query(value = "SELECT H.ID_HALLAZGO FROM hallazgos as H join planes_de_mejoramiento as P on H.ID_PLAN_MEJORAMIENTO = P.ID_PLAN_MEJORAMIENTO where P.ID_PROCESO = ?1 and P.ESTADO_PLAN != 'Inactivo'", nativeQuery = true)
	public List<Integer> findByIdProcess(int idProceso);
	@Query(value = "SELECT H.ID_HALLAZGO FROM hallazgos as H join planes_de_mejoramiento as P on H.ID_PLAN_MEJORAMIENTO = P.ID_PLAN_MEJORAMIENTO where P.ESTADO_PLAN != 'Inactivo'", nativeQuery = true)
	public List<Integer> findAllHallazgosActivos();

}
