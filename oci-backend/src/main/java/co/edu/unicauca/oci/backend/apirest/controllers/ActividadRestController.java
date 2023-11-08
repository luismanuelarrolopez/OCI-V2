package co.edu.unicauca.oci.backend.apirest.controllers;

import java.util.*;

import javax.validation.Valid;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.ActividadEstadistica_Dto;
import co.edu.unicauca.oci.backend.apirest.models.PlanMejoramiento;
import co.edu.unicauca.oci.backend.apirest.services.IPlanMejoramientoService;
import co.edu.unicauca.oci.backend.apirest.utils.EstadoActividad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.Actividad_Dto;
import co.edu.unicauca.oci.backend.apirest.models.Actividad;
import co.edu.unicauca.oci.backend.apirest.services.IActividadService;

@RestController
@RequestMapping("api/actividad")
@CrossOrigin(origins = "*")
public class ActividadRestController {

    @Autowired
    private IActividadService actividadService;
    @Autowired
    private IPlanMejoramientoService planService;

    @GetMapping("/actividad")
    public ResponseEntity<?> index() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Actividad> actividades = this.actividadService.findAll();
            response.put("actividades", actividades);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/actividades/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Actividad actividad = this.actividadService.findById(id);

            if (actividad == null) {
                response.put("mensaje", "El identificador no es correcto!");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("actividad", actividad);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/actividades")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@Valid @RequestBody Actividad actividad, BindingResult result) {

        actividad.setEstado(EstadoActividad.ACTIVA.getNombre());
        actividad.setAvance(0.0);
        actividad.setCumplimiento("NO");

        Map<String, Object> response = new HashMap<>();
        Actividad objActividad;

        if (result.hasErrors()) {
            List<String> listaErrores = new ArrayList<>();

            for (FieldError error : result.getFieldErrors()) {
                listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
            }
            response.put("errors", listaErrores);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            objActividad = this.actividadService.save(actividad);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la inserción en la base de datos.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "Se ha registrado correctamente la actividad.");
        response.put("actividad", objActividad);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/actividades/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> update(@Valid @RequestBody Actividad actividadEditado, BindingResult result,
                                    @PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();

        Actividad actividadActualizado;

        if (id == 0) {
            response.put("mensaje", "El identificador no es correcto!");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        try {
            Actividad actividadActual = this.actividadService.findById(id);

            if (result.hasErrors()) {
                List<String> listaErrores = new ArrayList<>();
                for (FieldError error : result.getFieldErrors()) {
                    listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
                }
                response.put("errors", listaErrores);
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            if (actividadActual == null) {
                response.put("mensaje", "Error: no se pudo editar, la accion de ID: " + id);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            actividadActual.setPeriodicidad(actividadEditado.getPeriodicidad());
            actividadActual.setIndicador(actividadEditado.getIndicador());
            actividadActual.setTipo_unidad(actividadEditado.getTipo_unidad());
            actividadActual.setValor_unidad(actividadEditado.getValor_unidad());
            actividadActual.setRecurso(actividadEditado.getRecurso());
            actividadActual.setEstado(actividadEditado.getEstado());
            actividadActual.setFechaEjecucion(actividadEditado.getFechaEjecucion());
            actividadActual.setFechaSeguimiento(actividadEditado.getFechaSeguimiento());
            actividadActual.setFechaTerminacion(actividadEditado.getFechaTerminacion());
            actividadActual.setObjResponsable(actividadEditado.getObjResponsable());
            actividadActual.setDescripcionActividad(actividadEditado.getDescripcionActividad());
            actividadActual.setTipoEvidencia(actividadEditado.getTipoEvidencia());

            actividadActualizado = this.actividadService.save(actividadActual);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al actualizar la actividad en la base de datos!");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "La actividad ha sido actualizada con éxito!");
        response.put("actividad", actividadActualizado);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/actividades/{id}")
    public ResponseEntity<?> eliminarHallazgo(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();

        try {
            this.actividadService.deleteByIdActividad(id);
            response.put("mensaje", "La actividad se elimino con éxito!");
            return new ResponseEntity<>(response, HttpStatus.OK);


        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la eliminación.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getActividadesPorIdPlan")
    public ResponseEntity<?> getActividadesPorIdPlan(@RequestHeader("code-url") String idPlan) {


        List<Actividad_Dto> actividades = new ArrayList<>();
        Map<String, Object> response = new HashMap<>();
        try {
            actividades.addAll(this.actividadService.getActividadesByIdPlan(idPlan));
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
        }

        if (actividades.isEmpty()) {
            response.put("mensaje", "No existen actividades asociadas al plan " + idPlan);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(actividades, HttpStatus.OK);//correcto 200
        }
    }


    @GetMapping("/actividades-plan")
    public ResponseEntity<?> getAllActividadesPorPlan(@RequestHeader("code-url") String idPlan) {

        List<Actividad> actividades = new ArrayList<>();
        Map<String, Object> response = new HashMap<>();
        try {
            actividades.addAll(this.actividadService.getAllActividadesByPlan(idPlan));
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
        }

        if (actividades.isEmpty()) {
            response.put("mensaje", "No existen actividades asociadas al plan " + idPlan);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(actividades, HttpStatus.OK);//correcto 200
        }
    }

    @GetMapping("/actividades-proceso/{idProceso}")
    public ResponseEntity<?> getActividadesPorProceso(@PathVariable("idProceso") int idProceso) {
        List<ActividadEstadistica_Dto> actividades = new ArrayList<>();
        Map<String, Object> response = new HashMap<>();
        try {
            actividades.addAll(this.actividadService.getActividadesPorProceso(idProceso));
            response.put("actividades", actividades);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
        }

        if (actividades.isEmpty()) {
            response.put("mensaje", "No existen actividades asociadas al proceso " + idProceso);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);//Error 404
        } else {
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);//correcto 200
        }
    }

    @GetMapping("/getActividadesPorIdAccion/{idAccion}")
    public ResponseEntity<?> getAccionesPorIdAccion(@PathVariable("idAccion") int idAccion) {
        List<Actividad> actividades = new ArrayList<>();
        Map<String, Object> response = new HashMap<>();
        try {
            actividades.addAll(this.actividadService.getActividadesByIdAccion(idAccion));
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
        }

        if (actividades.isEmpty()) {
            response.put("mensaje", "No existen actividades asociadas a la causa " + idAccion);
            ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);//Error 404
            return objRespuesta;
        } else {
            return new ResponseEntity<List<Actividad>>(actividades, HttpStatus.OK);//correcto 200
        }
    }
    @GetMapping("/getActividadesPorIdAccion/{idAccion}/{idResponsable}")
    public ResponseEntity<?> getAccionesPorIdAccionPorResponsable(@PathVariable("idAccion") int idAccion,
                                                                  @PathVariable("idResponsable") int idResponsable) {
        List<Actividad> actividades = new ArrayList<>();
        Map<String, Object> response = new HashMap<>();
        try {
            actividades.addAll(this.actividadService.getActividadesByIdAccionByResponsable(idAccion,idResponsable));
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
        }

        if (actividades.isEmpty()) {
            response.put("mensaje", "No existen actividades asociadas a la causa " + idAccion);
            ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);//Error 404
            return objRespuesta;
        } else {
            return new ResponseEntity<List<Actividad>>(actividades, HttpStatus.OK);//correcto 200
        }
    }
    @GetMapping("/get-actividades-activas")
    public ResponseEntity<?> getAccionesActivas() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Actividad> actividades = this.actividadService.getActividadesActivas();
            response.put("actividades", actividades);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count-estado")
    public ResponseEntity<?> countEstadoAllActividades() {
        Map<String, Object> response = new HashMap<>();
        List<Object> cantidades = new ArrayList<>();
        try {
            cantidades.addAll(this.actividadService.countEstadoAllActividades());
            response.put("cantidades", cantidades);

            if (cantidades.isEmpty()) {
                response.put("mensaje", "No existen actividades");
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);//Error 404
            } else {
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);//correcto 200
            }
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta de estados de las activiades.");
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count-estado-proceso/{idProceso}")
    public ResponseEntity<?> countEstadoActividadesProceso(@PathVariable("idProceso") int idProceso) {
        Map<String, Object> response = new HashMap<>();
        HttpStatus estadoHTTP;
        List<Object> cantidades = new ArrayList<>();
        try {
            cantidades.addAll((this.actividadService.countEstadoActividadesProceso(idProceso)));
            if (cantidades.isEmpty()) {
                response.put("mensaje", "No existen actividades para el proceso " + idProceso);
                estadoHTTP = HttpStatus.NOT_FOUND;
            } else {
                response.put("cantidades", cantidades);
                estadoHTTP = HttpStatus.OK;
            }
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta de estados de las activiades para el proceso " + idProceso);
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            estadoHTTP = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(response, estadoHTTP);
    }

    @GetMapping("/count-estado-plan")
    public ResponseEntity<?> countEstadoActividadesPlan(@RequestHeader("id-plan") String idPlan) {
        Map<String, Object> response = new HashMap<>();
        HttpStatus estadoHTTP;
        List<Object> cantidades = new ArrayList<>();
        try {
            cantidades.addAll((this.actividadService.countEstadoActividadesPlan(idPlan)));
            if (cantidades.isEmpty()) {
                response.put("mensaje", "No existen actividades para el plan " + idPlan);
                estadoHTTP = HttpStatus.NOT_FOUND;
            } else {
                response.put("cantidades", cantidades);
                estadoHTTP = HttpStatus.OK;
            }
        } catch (DataAccessException e) {
            response.put("mensaje", "Error, no ha sido posible realizar la consulta de estados de las activiades para el plan " + idPlan);
            response.put("error", e.getMessage() + " " + e.getMostSpecificCause().getMessage());
            estadoHTTP = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(response, estadoHTTP);
    }

    @PutMapping("/update-avance/{idActividad}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> updateAvance(@RequestParam String idPlan, @PathVariable Integer idActividad, @RequestParam String avance) {
        Map<String, Object> response = new HashMap<>();

        Actividad actividadActualizado;
        PlanMejoramiento planMejoramiento;

        if (idActividad == 0) {
            response.put("mensaje", "¡El identificador no es correcto!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
        }
        try {
            Actividad actividadActual = this.actividadService.findById(idActividad);

            if (actividadActual == null) {
                response.put("mensaje", "Error: no se encontró la actividad de ID: " + idActividad);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            actividadActual.setAvance(Double.parseDouble(avance));

            if (this.actividadService.verificarCumplimiento(actividadActual)) {
                actividadActual.setCumplimiento("SI");
                actividadActual.setEstado(EstadoActividad.TERMINADA.getNombre());
            }
            else{
                actividadActual.setCumplimiento("NO");
                actividadActual.setEstado(this.actividadService.getEstadoActividad(actividadActual));
            }
            actividadActualizado = this.actividadService.save(actividadActual);
            planMejoramiento = this.planService.updateAvanceCumplimientoPlan(idPlan);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al actualizar la actividad en la base de datos!");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "La actividad ha sido actualizada con éxito!");
        response.put("actividad", actividadActualizado);
        response.put("plan", planMejoramiento);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @GetMapping("/update-estados")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> updateAllActividades(){
        Map<String, Object> response = new HashMap<>();

        List<Actividad> actividades =  new ArrayList<>();

        actividades = this.actividadService.updateEstadoActividades();

        response.put("actividades", actividades);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

}
