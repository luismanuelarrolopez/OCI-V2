package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.unicauca.oci.backend.apirest.models.Accion;

public interface AccionRepository extends CrudRepository<Accion, Integer> {

    @Query(value = "SELECT * FROM acciones WHERE ID_CAUSA = ?1", nativeQuery = true)
    public List<Accion> getAccionByIdCauca(int idCausa);

    @Query(value = "CALL COUNT_ACCIONES_POR_PROCESO(?1)", nativeQuery = true)
    public Integer countAccionesPorProceso(int idProceso);

    @Query(value = "CALL COUNT_ACCIONES_POR_PLAN(?1)", nativeQuery = true)
    public Integer countAccionesPorPlan(String idPlan);

    @Query(value = "CALL COUNT_ACCIONES_ACTIVAS()", nativeQuery = true)
    public Integer countAccionesActivas();
}
