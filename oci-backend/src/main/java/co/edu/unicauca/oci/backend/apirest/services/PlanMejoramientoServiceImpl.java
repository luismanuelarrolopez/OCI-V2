package co.edu.unicauca.oci.backend.apirest.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.*;
import co.edu.unicauca.oci.backend.apirest.models.Actividad;
import co.edu.unicauca.oci.backend.apirest.repositories.ActividadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.edu.unicauca.oci.backend.apirest.models.PlanMejoramiento;
import co.edu.unicauca.oci.backend.apirest.repositories.PlanMejoramientoRepository;

/**
 * PlanMejoramientoServiceImpl
 */
@Service
public class PlanMejoramientoServiceImpl implements IPlanMejoramientoService {

    @Autowired
    private PlanMejoramientoRepository planRepository;

    @Autowired
    private ActividadRepository actividadRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PlanMejoramiento> findAll() {
        return planRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public PlanMejoramiento findById(String id) {
        return planRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public PlanMejoramiento save(PlanMejoramiento plan) {
        return planRepository.save(plan);
    }

    @Override
    public Integer contarPlanes(Integer anio) {
        return planRepository.countPlanes(anio);
    }

    @Override
    public List<PlanMejoramiento> findByEstadoIsNot(String estado) {
        return planRepository.findByEstadoIsNot(estado);
    }

    @Override
    public List<PlanMejoramiento> findAllNombreLike(String nombre) {
        return planRepository.findByNombreLike(nombre);
    }

    @Override
    public List<ResumenPlanMejora_Dto> getResumenPlan(String id) {
        List<Object> resumenPlan = planRepository.getResumenPlan(id);
        return buildResumenPlan(resumenPlan);
    }

    public List<ResumenPlanMejora_Dto> buildResumenPlan(List<Object> resumen) {
        List<ResumenPlanMejora_Dto> resumenAuditor = new ArrayList<>();
        Object object[] = null;

        for (int i = 0; i < resumen.size(); i++) {

            ResumenPlanMejora_Dto objresumen = new ResumenPlanMejora_Dto();
            resumenCausa_Dto objCausa = new resumenCausa_Dto();
            ResumenAccion_Dto objAccion = new ResumenAccion_Dto();
            resumenActividad_Dto objActividad = new resumenActividad_Dto();
            List<resumenCausa_Dto> objCausaA = new ArrayList<>();
            List<ResumenAccion_Dto> objAccionA = new ArrayList<>();
            List<resumenActividad_Dto> objActividadA = new ArrayList<>();
            object = (Object[]) resumen.get(i);

            objActividad.setID_ACTIVIDAD(object[7] != null ? (int) object[7] : 0);
            objActividad.setINDICADOR(object[8] != null ? object[8].toString() : "");
            objActividad.setPERIODICIDAD(object[9] != null ? object[9].toString() : "");
            objActividad.setRECURSO(object[10] != null ? object[10].toString() : "");
            objActividad.setResponsable(object[11] != null ? object[11].toString() : "");
            objActividadA.add(objActividad);

            objAccion.setID_ACCION(object[4] != null ? (int) object[4] : 0);
            objAccion.setACCION(object[5] != null ? object[5].toString() : "");
            objAccion.setDESCRIPCION(object[6] != null ? object[6].toString() : "");
            //objAccion.setNOMBRE_TIPO_CONTROL(object[7] != null ? object[7].toString() : "");
            objAccion.setACTIVIDAD(objActividadA);
            objAccionA.add(objAccion);

            objCausa.setID_CAUSA(object[2] != null ? (int) object[2] : 0);
            objCausa.setCAUSA(object[3] != null ? object[3].toString() : "");
            objCausa.setAccion(objAccionA);
            objCausaA.add(objCausa);

            objresumen.setID_HALLAZGO(object[0] != null ? (int) object[0] : 0);
            objresumen.setHALLAZGO(object[1] != null ? object[1].toString() : "");
            objresumen.setCAUSA(objCausaA);


            resumenAuditor.add(objresumen);
        }
        return resumenAuditor;
    }

    @Override
    public List<PlanMejoramiento> planesMejoraAuditor(Integer idAuditor) {
        return this.planRepository.planesMejoraAuditor(idAuditor);
    }

    @Override
    public List<PlanMejoramiento> planesMejoraLiderProceso(Integer idLiderProceso) {
        return this.planRepository.planesMejoraLiderProceso(idLiderProceso);
    }

    @Override
    public List<PlanMejoramiento> getPlanesByIdProceso(int idProceso) {
        return this.planRepository.getPlanesByIdProceso(idProceso);
    }

    @Override
    public List<Object> countEstadoPlanesProceso(int idProceso) {
        return this.planRepository.countEstadoPlanesProceso(idProceso);
    }

    @Override
    public Date getUltimoSeguimiento(String idPlan) {
        return this.planRepository.getUltimoSeguimiento(idPlan);
    }


    public Double calcularAvancePlan(List<Actividad> actividadesPlan) {
        double suma = 0.0;
        double promedio = 0.0;
        if (!actividadesPlan.isEmpty()) {
            for (Actividad actividad : actividadesPlan) {
                suma += actividad.getAvance();
            }
            promedio = suma / actividadesPlan.size();
        }
        return promedio;
    }

    public double calcularCumplimientoPlan(String idPlan, int sizeActividades){
        int countCumplidas = this.planRepository.countActividadesCumplidas(idPlan);
        double result = 0.0;
        if (sizeActividades > 0){
            result = (countCumplidas * 100) / sizeActividades;
        }
        return result;
    }

    @Override
    public PlanMejoramiento updateAvancePlan(String idPlan){
        PlanMejoramiento planActual = planRepository.findById(idPlan).orElse(null);
        if (planActual != null) {
            List<Actividad> actividadesPlan = this.actividadRepository.getAllActividadesPorPlan(idPlan);
            double avance = calcularAvancePlan(actividadesPlan);
            planActual.setAvance(avance);
            return planRepository.save(planActual);
        }
        return planActual;
    }

    @Override
    public PlanMejoramiento updateAvanceCumplimientoPlan(String idPlan){
        PlanMejoramiento planActual = planRepository.findById(idPlan).orElse(null);
        if (planActual != null) {
            List<Actividad> actividadesPlan = this.actividadRepository.getAllActividadesPorPlan(idPlan);
            double avance = calcularAvancePlan(actividadesPlan);
            double cumplimiento = calcularCumplimientoPlan(idPlan, actividadesPlan.size());
            planActual.setAvance(avance);
            planActual.setCumplimiento(cumplimiento);
            return planRepository.save(planActual);
        }
        return planActual;
    }
}