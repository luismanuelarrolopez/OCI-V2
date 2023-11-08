package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import co.edu.unicauca.oci.backend.apirest.models.Evaluacion;

public interface EvaluacionRepository extends CrudRepository<Evaluacion, Integer>{
	
	@Query(" select e from Evaluacion e where ID_PERSONA = ?1")
    public Evaluacion findByIdPerson(Integer idPerson);
	
	@Query(value = "SELECT listarPorIdEvidencia(?1)", nativeQuery = true)
	public List<Evaluacion> listarPorIdEvidencia(int idEvidencia);
	
	 @Transactional
	@Modifying
	@Query(value = "insert into evaluaciones (ESTADO, ID_PERSONA) values (?1, ?2)", nativeQuery = true)
	public int guardarEvaluacion(String estado, Integer id_persona);
	
	 
	 @Query(" select e from Evaluacion e where ID_EVALUACION = ?1")
	    public Evaluacion findByIdEvaluacion(Integer idEvaluacion);
}