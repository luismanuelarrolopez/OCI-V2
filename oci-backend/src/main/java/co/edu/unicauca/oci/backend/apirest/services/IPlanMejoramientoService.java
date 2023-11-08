package co.edu.unicauca.oci.backend.apirest.services;

import java.util.Date;
import java.util.List;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.ResumenPlanMejora_Dto;
import co.edu.unicauca.oci.backend.apirest.models.PlanMejoramiento;

public interface IPlanMejoramientoService {

    public List<PlanMejoramiento> findAll();

    public List<PlanMejoramiento> findAllNombreLike(String nombre);

    public List<PlanMejoramiento> findByEstadoIsNot(String estado);

    public PlanMejoramiento save(PlanMejoramiento plan);

    public PlanMejoramiento findById(String id);

    public Integer contarPlanes(Integer anio);

    public List<ResumenPlanMejora_Dto> getResumenPlan(String id);

    public List<PlanMejoramiento> planesMejoraAuditor(Integer idAuditor);

    public List<PlanMejoramiento> planesMejoraLiderProceso(Integer idLiderProceso);

    public List<PlanMejoramiento> getPlanesByIdProceso(int idProceso);

    public List<Object> countEstadoPlanesProceso(int idProceso);

    public Date getUltimoSeguimiento(String idPlan);

    public PlanMejoramiento updateAvancePlan(String idPlan);

    public PlanMejoramiento updateAvanceCumplimientoPlan(String idPlan);

}