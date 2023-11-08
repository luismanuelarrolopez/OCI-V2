package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.unicauca.oci.backend.apirest.models.Actividad;
import co.edu.unicauca.oci.backend.apirest.models.Person;

public interface ActividadRepository extends CrudRepository<Actividad, Integer> {

    @Query(value = "SELECT * FROM actividades WHERE ID_ACCION = ?1", nativeQuery = true)
    public List<Actividad> getActividadesByIdAccion(int idCausa);

    @Query(value = "SELECT * FROM actividades WHERE ID_ACCION = ?1 && ID_RESPONSABLE = ?2", nativeQuery = true)
    public List<Actividad> getActividadesByIdAccionByResponsable(int idCausa, int idResponsable);

    @Query(value = "CALL GET_AUDITOR_RESPONSABLE_ACTIVIDAD(?1)", nativeQuery = true)
    public List<Object> getAuditorEncargadoActividad(Integer id);

    @Query(value = "CALL GET_ACTIVIDAD_POR_IDPLAN(?1)", nativeQuery = true)
    public List<Object> getActividadesPorIdPlan(String id);

    @Query(value = "CALL GET_ACTIVIDADES_POR_PROCESO(?1)", nativeQuery = true)
    public List<Object> getActividadesPorProceso(int id);

    @Query(value = "CALL GET_ALL_ACTIVIDADES_POR_PLAN(?1)", nativeQuery = true)
    public List<Actividad> getAllActividadesPorPlan(String id);

    @Query(value = "CALL COUNT_ESTADO_ACTIVIDADES()", nativeQuery = true)
    public List<Object> countEstadoActividades();

    @Query(value = "CALL COUNT_ESTADOS_ACTIVIDADES_PLAN(?1)", nativeQuery = true)
    public List<Object> countEstadoActividadesPlan(String id);

    @Query(value = "CALL COUNT_ESTADOS_ACTIVIDADES_PROCESO(?1)", nativeQuery = true)
    public List<Object> countEstadoActividadesProceso(int id);

    @Query(value = "CALL GET_ACTIVIDADES_ACTIVAS()", nativeQuery = true)
    public List<Actividad> getActividadesActivas();

}
