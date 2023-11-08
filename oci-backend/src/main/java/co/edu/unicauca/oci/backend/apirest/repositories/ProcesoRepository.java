package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import co.edu.unicauca.oci.backend.apirest.models.Proceso;

public interface ProcesoRepository extends JpaRepository<Proceso, Integer>{
	@Query(
        value = "SELECT * FROM `procesos` WHERE `PRO_ID_PROCESO` is null", 
        nativeQuery = true)
      List<Proceso> listProces();
    
    @Query(
        value = "SELECT * FROM `procesos` WHERE `PRO_ID_PROCESO` = ?1", 
        nativeQuery = true)
      List<Proceso> listSubProces(Integer id);
}
