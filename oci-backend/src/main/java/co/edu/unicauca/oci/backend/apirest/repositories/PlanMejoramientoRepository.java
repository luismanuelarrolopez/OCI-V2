package co.edu.unicauca.oci.backend.apirest.repositories;

import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.ResumenPlanMejora_Dto;
import co.edu.unicauca.oci.backend.apirest.models.PlanMejoramiento;

public interface PlanMejoramientoRepository extends JpaRepository<PlanMejoramiento, String> {
    @Query(
            value = "SELECT COUNT(*) FROM planes_de_mejoramiento WHERE YEAR(create_at) = ?1",
            nativeQuery = true)
    Integer countPlanes(Integer anio);

    List<PlanMejoramiento> findByNombreLike(String nombre);

    List<PlanMejoramiento> findByEstadoIsNot(String estado);

    List<PlanMejoramiento> findByEstado(String estado);

    @Query(value = "CALL GET_RESUMEN_PLAN_MEJORAMIENTO_MEJORADA(?1)", nativeQuery = true)
    public List<Object> getResumenPlan(String id);

    @Query(value = "SELECT * FROM planes_de_mejoramiento WHERE ID_PERSONA = ?1", nativeQuery = true)
    List<PlanMejoramiento> planesMejoraAuditor(Integer idAuditor);

    @Query(value = "SELECT * FROM planes_de_mejoramiento WHERE PER_ID_PERSONA = ?1", nativeQuery = true)
    List<PlanMejoramiento> planesMejoraLiderProceso(Integer idLiderProceso);

    @Query(value = "SELECT * FROM planes_de_mejoramiento WHERE ID_PROCESO = ?1 and ESTADO_PLAN != 'Inactivo'", nativeQuery = true)
    public List<PlanMejoramiento> getPlanesByIdProceso(int idProceso);

    @Query(value = "CALL COUNT_ESTADO_PLANES_PROCESO(?1)", nativeQuery = true)
    public List<Object> countEstadoPlanesProceso(int id);

    @Query(value = "CALL GET_FECHA_ULTIMO_SEGUIMIENTO_PLAN(?1)", nativeQuery = true)
    public Date getUltimoSeguimiento(String idPlan);

    @Query(value = "CALL COUNT_CUMPLIMIENTO_ACTIVIDADES(?1)", nativeQuery = true)
    public int countActividadesCumplidas(String idPlan);


}