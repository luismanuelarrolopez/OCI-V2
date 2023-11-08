package co.edu.unicauca.oci.backend.apirest.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.ControlPM_Dto;
import co.edu.unicauca.oci.backend.apirest.models.Observacion;
import co.edu.unicauca.oci.backend.apirest.services.IObservacionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.core.status.ErrorStatus;
import co.edu.unicauca.oci.backend.apirest.dto.IdDTO;
import co.edu.unicauca.oci.backend.apirest.dto_mepdm.ResumenPlanMejora_Dto;
import co.edu.unicauca.oci.backend.apirest.models.PlanMejoramiento;
import co.edu.unicauca.oci.backend.apirest.models.User;
import co.edu.unicauca.oci.backend.apirest.services.IPlanMejoramientoService;
import co.edu.unicauca.oci.backend.apirest.utils.AESEncriptarDesencriptar;
import co.edu.unicauca.oci.backend.apirest.utils.EstadoPDM;

@RestController
@RequestMapping("/api/mpdm")
@CrossOrigin(origins = "*")
public class PlanMejoramientoController {
    @Autowired
    private IPlanMejoramientoService planService;
    @Autowired
    private IObservacionService observacionService;
    // @Autowired(required = true)
    // AESEncriptarDesencriptar objEncriptar;

    @GetMapping("/planes")
    public ResponseEntity<?> index() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<PlanMejoramiento> planes = this.planService.findByEstadoIsNot(EstadoPDM.INACTIVO.getNombre());
            for (PlanMejoramiento planMejoramiento : planes) {
                planMejoramiento.setCodeURL(AESEncriptarDesencriptar.ecnode(planMejoramiento.getIdPlanMejoramiento()));
            }
            response.put("planes", planes);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/greeting")
    public ResponseEntity<String> greeting(@RequestHeader("code-url") String language) {
        // code that uses the language variable
        System.out.println(language);
        return new ResponseEntity<String>("", HttpStatus.OK);
    }

    @GetMapping("/ver-plan")
    public ResponseEntity<?> show(@RequestHeader("code-url") String language) {
        Map<String, Object> response = new HashMap<>();
        String id = AESEncriptarDesencriptar.deecnode(language);
        if (id == null) {
            response.put("mensaje", "El identificador no es correcto!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
        }
        try {
            PlanMejoramiento p = this.planService.findById(id);
            p.setCodeURL(AESEncriptarDesencriptar.ecnode(p.getIdPlanMejoramiento()));
            response.put("planMejoramiento", p);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/planes/{idPersona}/{rol}")
    public ResponseEntity<?> getPlanesPersonalizados(@PathVariable Integer idPersona, @PathVariable String rol) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<PlanMejoramiento> planes = null;
            if (rol.equals("ROLE_auditor")) {
                planes = this.planService.planesMejoraAuditor(idPersona);
            }
            if (rol.equals("ROLE_liderDeProceso")) {
                planes = this.planService.planesMejoraLiderProceso(idPersona);
            }
            for (PlanMejoramiento planMejoramiento : planes) {
                planMejoramiento.setCodeURL(AESEncriptarDesencriptar.ecnode(planMejoramiento.getIdPlanMejoramiento()));
            }
            response.put("planes", planes);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/eliminar-plan")
    public ResponseEntity<?> delete(@RequestBody IdDTO idE) {
        Map<String, Object> response = new HashMap<>();
        String id = AESEncriptarDesencriptar.deecnode(idE.getId());

        if (id == null) {
            response.put("mensaje", "El identificador no es correcto!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
        }

        try {
            PlanMejoramiento planMejoramiento = planService.findById(id);
            if (planMejoramiento != null) {
                planMejoramiento.setEstado(EstadoPDM.INACTIVO.getNombre());
                planService.save(planMejoramiento);
                response.put("mensaje", "El plan de mejoramiento ha sido eliminado con éxito!");
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
            } else {
                response.put("mensaje", "No se pudo eliminar el plan de mejoramiento!");
                response.put("error", "No se encontró el plan de mejoramiento.");
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
            }
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el plan mejoramiento de la base de datos.");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            response.put("error", e.getStackTrace());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/planes")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@Valid @RequestBody PlanMejoramiento planMejoramiento, BindingResult result) {

        //planMejoramiento.setIdPlanMejoramiento(id);
        planMejoramiento.setCreateAt(new Date());
        planMejoramiento.setEstado(EstadoPDM.FORMULACION.getNombre());
        planMejoramiento.setCumplimiento(0.0);
        planMejoramiento.setAvance(0.0);

        Map<String, Object> response = new HashMap<>();
        PlanMejoramiento objPlan;

        if (result.hasErrors()) {
            List<String> listaErrores = new ArrayList<>();

            for (FieldError error : result.getFieldErrors()) {
                listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());

            }
            response.put("errors", listaErrores);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            objPlan = this.planService.save(planMejoramiento);
            objPlan.setCodeURL(AESEncriptarDesencriptar.ecnode(planMejoramiento.getIdPlanMejoramiento()));
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la inserción en la base de datos.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            response.put("error", e.getStackTrace());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "Se ha registrado correctamente el plan.");
        response.put("planMejoramiento", objPlan);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @PutMapping("/editar-plan")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> update(@Valid @RequestBody PlanMejoramiento planEditado, BindingResult result) {
        Map<String, Object> response = new HashMap<>();
        String id = AESEncriptarDesencriptar.deecnode(planEditado.getCodeURL());
        PlanMejoramiento planActualizado = null;


        if (id == null) {
            response.put("mensaje", "El identificador no es correcto!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
        }
        try {
            PlanMejoramiento planActual = this.planService.findById(id);

            if (result.hasErrors()) {
                List<String> listaErrores = new ArrayList<>();
                for (FieldError error : result.getFieldErrors()) {
                    listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
                }
                response.put("errors", listaErrores);
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
            }

            if (planActual == null) {
                response.put("mensaje", "Error: no se pudo editar, el plan de mejora ID: "
                        .concat(id.toString().concat(" no existe en la base de datos!")));
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            planActual.setNombre(planEditado.getNombre());
            planActual.setFechaInicio(planEditado.getFechaInicio());
            planActual.setFechaFin(planEditado.getFechaFin());
            planActual.setFechaSuscripcion(planEditado.getFechaSuscripcion());
            planActual.setPathSoporte("url");
            //planActual.setPathSoporte(planEditado.getPathSoporte());
            planActual.setObjLiderAuditor(planEditado.getObjLiderAuditor());
            planActual.setObjLiderProceso(planEditado.getObjLiderProceso());
            planActual.setProceso(planEditado.getProceso());
            planActual.setProrrogado(planEditado.isProrrogado());
            planActual.setEstado(planEditado.getEstado());
            planActual.setCumplimiento((planEditado.getCumplimiento()==null) ? planActual.getCumplimiento(): planEditado.getCumplimiento());
            planActual.setAvance((planEditado.getAvance()==null) ? planActual.getAvance(): planEditado.getAvance());
            planActualizado = this.planService.save(planActual);
            planActualizado.setCodeURL(AESEncriptarDesencriptar.ecnode(planActualizado.getIdPlanMejoramiento()));
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al actualizar el plan de mejora en la base de datos!");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            response.put("error", e.getStackTrace());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El plan de mejora ha sido actualizado con éxito!");
        response.put("planMejoramiento", planActualizado);

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @GetMapping("/GeneradorId")
    public ResponseEntity<?> showGeneradorId() {
        LocalDate fechaCompleta = LocalDate.now();
        Integer anio_actual = fechaCompleta.getYear();
        Integer numPlanes = this.planService.contarPlanes(anio_actual);
        String formatString = String.format("%%0%dd", 3);
        String formattedString = String.format(formatString, numPlanes + 1);
        String id = ("2.6-71.7/" + formattedString + anio_actual);
        String[] anArray = new String[]{id};
        return ResponseEntity.ok(anArray);

    }

    @GetMapping("/resumenPlan")
    public ResponseEntity<?> getResumenPlan(@RequestHeader("code-url") String language) {
        Map<String, Object> response = new HashMap<>();
        String id = AESEncriptarDesencriptar.deecnode(language);

        List<ResumenPlanMejora_Dto> resumenPlan = new ArrayList<>();
        Map<String, Object> response1 = new HashMap<>();

        try {
            resumenPlan.addAll(this.planService.getResumenPlan(id));
        } catch (DataAccessException e) {
            response1.put("mensaje", "Error al realizar la consulta en la base de datos");
            response1.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response1, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
        }

        if (resumenPlan.isEmpty()) {
            response1.put("mensaje", "No existen planes de mejoramiento " + id);
            ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String, Object>>(response1, HttpStatus.NOT_FOUND);//Error 404
            return objRespuesta;
        } else {
            return new ResponseEntity<List<ResumenPlanMejora_Dto>>(resumenPlan, HttpStatus.OK);//correcto 200
        }

    }

    @GetMapping("/planes-proceso/{id}")
    public ResponseEntity<?> getPlanesPorProceso(@PathVariable("id") int idProceso) {
        List<PlanMejoramiento> planes = new ArrayList<>();
        Map<String, Object> response = new HashMap<>();
        try {
            planes.addAll(this.planService.getPlanesByIdProceso(idProceso));
            planes.forEach(planMejoramiento -> {
                planMejoramiento.setCodeURL(AESEncriptarDesencriptar.ecnode(planMejoramiento.getIdPlanMejoramiento()));
            });
            response.put("planes", planes);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta de planes por proceso en la base de datos");
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
        }

        if (planes.isEmpty()) {
            response.put("mensaje", "No existen planes asociados al proceso: " + idProceso);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);//Error 404
        } else {
            return new ResponseEntity<>(response, HttpStatus.OK);//correcto 200
        }
    }

    @GetMapping("/count-estado-proceso/{idProceso}")
    public ResponseEntity<?> countEstadoPlanesProceso(@PathVariable("idProceso") int idProceso) {
        Map<String, Object> response = new HashMap<>();
        HttpStatus estadoHTTP;
        List<Object> cantidades = new ArrayList<>();
        try {
            cantidades.addAll((this.planService.countEstadoPlanesProceso(idProceso)));
            if (cantidades.isEmpty()) {
                response.put("mensaje", "No existen planes para el proceso " + idProceso);
                estadoHTTP = HttpStatus.NOT_FOUND;
            } else {
                response.put("cantidades", cantidades);
                estadoHTTP = HttpStatus.OK;
            }
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta de estados de las planes para el proceso " + idProceso);
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            estadoHTTP = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(response, estadoHTTP);
    }

    @GetMapping("/control-pm")
    public ResponseEntity<?> getPlanesControlPM(){
        Map<String, Object> response = new HashMap<>();
        try {
            List<PlanMejoramiento> planes = this.planService.findByEstadoIsNot(EstadoPDM.INACTIVO.getNombre());

            if (planes.isEmpty()){
                response.put("message", "No hay planes");
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
            }
            List<ControlPM_Dto> planesControlPM = new ArrayList<>();

            for (PlanMejoramiento planMejoramiento : planes) {
                ControlPM_Dto planControl = new ControlPM_Dto();
                String idPlan = planMejoramiento.getIdPlanMejoramiento();
                planControl.setIdPlan(idPlan);
                planControl.setDescripcionPlan(planMejoramiento.getNombre());
                planControl.setProceso(planMejoramiento.getProceso().getNombreProceso());
                planControl.setEstado(planMejoramiento.getEstado());
                planControl.setFechaVencimiento(planMejoramiento.getFechaFin());
                planControl.setFechaInicio(planMejoramiento.getFechaInicio());
                planControl.setFechaSuscripcion(planMejoramiento.getFechaSuscripcion());
                planControl.setCumplimiento(planMejoramiento.getCumplimiento());
                planControl.setAvance(planMejoramiento.getAvance());
                planControl.setNombreLiderAuditor((planMejoramiento.getObjLiderAuditor() != null) ? (planMejoramiento.getObjLiderAuditor().getNames() + " " + planMejoramiento.getObjLiderAuditor().getSurnames()) : "Sin definir");
                planControl.setObservaciones(this.getObservacionesPlan(idPlan));
                planControl.setFechaSeguimiento(this.getUltimoSeguimiento(idPlan));
                planesControlPM.add(planControl);
            }
            response.put("planes", planesControlPM);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<String> getObservacionesPlan(String idPlan) {
        List<Observacion> observacionesPlan = new ArrayList<>();
        List<String> descripcionObservaciones = new ArrayList<>();
        try {
            observacionesPlan.addAll(this.observacionService.getObservacionByIdPlanMantenimiento(idPlan));
            for (Observacion observacion : observacionesPlan) {
                descripcionObservaciones.add(observacion.getDescripcion());
            }
            return descripcionObservaciones;
        } catch (DataAccessException e) {
            return new ArrayList<>();
        }
    }

    public Date getUltimoSeguimiento(String idPlan) {
        Date ultimoSeguimiento;
        try {
            ultimoSeguimiento = this.planService.getUltimoSeguimiento(idPlan);
            return ultimoSeguimiento;
        } catch (DataAccessException e) {
            return null;
        }
    }

}