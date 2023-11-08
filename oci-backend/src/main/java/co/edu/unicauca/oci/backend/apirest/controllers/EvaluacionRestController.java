package co.edu.unicauca.oci.backend.apirest.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.models.Evaluacion;
import co.edu.unicauca.oci.backend.apirest.services.IEvaluacionService;
import co.edu.unicauca.oci.backend.apirest.utils.EstadoEvaluacion;

@RestController
@RequestMapping("api/evaluacion")
@CrossOrigin(origins = "*")

public class EvaluacionRestController {
    @Autowired
	private IEvaluacionService EvaluacionService;
	
	@GetMapping("/listar")
	public ResponseEntity<?> listar(){
		List<Evaluacion> evaluaciones = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		
		evaluaciones.addAll(EvaluacionService.listar());
		
		if(evaluaciones.isEmpty()) {
			response.put("Mensaje", "No se encontraron evaluaciones registrados en la base de datos");
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
			return objRespuesta;
		}
		
		return new ResponseEntity<List<Evaluacion>>(evaluaciones, HttpStatus.OK);
	}
	
	@GetMapping("/getEvaluacion/{idEvaluacion}")
	public ResponseEntity<?> getEvaluacion(@PathVariable Integer idEvaluacion){
		List<Evaluacion> evaluaciones = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		
		try {
			Optional<Evaluacion> objEvaluacion = EvaluacionService.findById(idEvaluacion);
			if(objEvaluacion.isPresent()) {
				Evaluacion evaluacion = EvaluacionService.findByIdEvaluacion(idEvaluacion);
				return new ResponseEntity<Evaluacion>(evaluacion, HttpStatus.OK);
			}else {
				response.put("Mensaje", "No se encontraron evaluaciones registrados en la base de datos");
				ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
				return objRespuesta;
			}
		} catch (Exception e) {
			response.put("Mensaje", "No se encontraron evaluaciones registrados en la base de datos");
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
			return objRespuesta;
		}
		
	}
	
	@GetMapping("/listarPorIdEvidencia")
	public ResponseEntity<?> listarPorId(@RequestParam("idEvidencia") int idEvidencia){
		List<Evaluacion> evaluaciones = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		
		evaluaciones.addAll(EvaluacionService.listarPorIdEvidencia(idEvidencia));
		
		if(evaluaciones.isEmpty()) {
			response.put("mensaje", "No se encontraron evaluaciones con el ID_Evidencia: "+idEvidencia + " en la base de datos");
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
			return objRespuesta;
		}
		
		return new ResponseEntity<List<Evaluacion>>(evaluaciones, HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Evaluacion Evaluacion) {
		Map<String, Object> response = new HashMap<>();
		Evaluacion.setEstado(EstadoEvaluacion.PENDIENTE.getNombre());
		Evaluacion objEvaluacion;
		try {
			objEvaluacion = this.EvaluacionService.save(Evaluacion);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la inserción en la base de datos");
			response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<Evaluacion>(objEvaluacion, HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody Evaluacion Evaluacion) {
		Map<String, Object> response = new HashMap<>();
		boolean status = false;
		try {
			if(Evaluacion.getId()==0){
				Evaluacion objEvaluacionSave;
				try {
					objEvaluacionSave = this.EvaluacionService.save(Evaluacion);
				} catch (DataAccessException e) {
					response.put("mensaje", "Error al realizar la inserción en la base de datos");
					response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				}				
				return new ResponseEntity<Evaluacion>(objEvaluacionSave, HttpStatus.OK);
			}else{
				Optional<Evaluacion> objEvaluacion = EvaluacionService.findById(Evaluacion.getId());
				if(objEvaluacion.isPresent()) {
					Evaluacion evaluacionEditable = EvaluacionService.findByIdEvaluacion(Evaluacion.getId());
					evaluacionEditable.setEstado(Evaluacion.getEstado());
					evaluacionEditable.setObservacion(Evaluacion.getObservacion());
					evaluacionEditable.setFecha_evaluacion(new Date());
					EvaluacionService.update(evaluacionEditable);
					status = true;
				}
			}
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la actualización en la base de datos");
			response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if(status)
			return new ResponseEntity<Evaluacion>(Evaluacion,HttpStatus.OK);
		
		response.put("mensaje", "No existe un registro previo para actualizar con el ID: "+Evaluacion.getId());
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/delete/{idEvaluacion}")
	public ResponseEntity<?> delete(@PathVariable("idEvaluacion") int idEvaluacion) {
		Map<String, Object> response = new HashMap<>();
		boolean status = true;
		try {
			EvaluacionService.delete(idEvaluacion);
			Optional<Evaluacion> objEvaluacion = EvaluacionService.findById(idEvaluacion);
			
			if(objEvaluacion.isPresent()) {
				status = false;
			}
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la eliminación del registro en la base de datos");
			response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(status)
			return new ResponseEntity<Boolean>(status,HttpStatus.OK);
			
			response.put("mensaje", "El registro no fue eliminado, el ID: "+idEvaluacion + " aún persiste");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_MODIFIED);
	}
}
