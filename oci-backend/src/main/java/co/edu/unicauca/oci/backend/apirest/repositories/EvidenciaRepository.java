package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.unicauca.oci.backend.apirest.models.Evidencia;

public interface EvidenciaRepository extends CrudRepository<Evidencia, Integer>{
	
	@Query(value = "SELECT * from evidencias where ID_ACTIVIDAD = ?1", nativeQuery = true)
	public List<Evidencia> findIdActividad(int idActividad);
	
	@Query(value = "CALL GET_TABLA_AUDITOR(?1)", nativeQuery = true)
	public List<Object> getTablaAuditor(int idPersona);
	
	@Query(value = "CALL GET_TABLA_RESPONSABLE(?1)", nativeQuery = true)
	public List<Object> getTablaResponsable(int idPersona);
	
	@Query(value = "CALL GET_EVIDENCIAS_POR_IDACTIVIDAD(?1)", nativeQuery = true)
	public List<Object> getEvidenciasPorIdActividad(int idActividad);
}
