package co.edu.unicauca.oci.backend.apirest.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.models.Observacion;
import co.edu.unicauca.oci.backend.apirest.services.IObservacionService;
import co.edu.unicauca.oci.backend.apirest.utils.AESEncriptarDesencriptar;
import co.edu.unicauca.oci.backend.apirest.utils.EstadoPDM;

@RestController
@RequestMapping("api/observacion")
@CrossOrigin(origins = "*")
public class ObservacionRestController {

	@Autowired
	private IObservacionService observacionService;
	
	@GetMapping("/observaciones")
	public ResponseEntity<?> index() {
		Map<String, Object> response = new HashMap<>();
		try {
			List<Observacion> observaciones = this.observacionService.findAll();
			response.put("observacion", observaciones);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/observaciones/{id}")
	public ResponseEntity<?> findObservacionById(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();
		
		try {
			Observacion h = this.observacionService.findById(id);
			
			if(h == null){
				response.put("mensaje", "El identificador no es correcto!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			}
			else{
				response.put("observacion", h);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);	
			}
			

		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/getObservacionPorIdPlan")
	public ResponseEntity<?> getObservacionPorIdPlan(@RequestHeader("code-url") String idPlan){
		List<Observacion> observaciones = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();

		idPlan =  AESEncriptarDesencriptar.deecnode(idPlan);

		try {
			
			observaciones.addAll(observacionService.getObservacionByIdPlanMantenimiento(idPlan));
			
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage()+" "+ e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
		}
		
		if(observaciones.isEmpty()) {
			response.put("mensaje", "No existen observaciones asociados al plan de mejoramiento "+idPlan);
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);//Error 404
			return objRespuesta;
		}
		else {
			return new ResponseEntity<List<Observacion>>(observaciones, HttpStatus.OK);//correcto 200
		}
	}

	@PostMapping("/observaciones")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Observacion observacion, BindingResult result) {

		Map<String, Object> response = new HashMap<>();
		Observacion objObservacion;
		//observacion.setEstado(EstadoPDM.FORMULACION.getNombre());
		observacion.setFecha_registro(new Date());

		if (result.hasErrors()) {
			List<String> listaErrores = new ArrayList<>();

			for (FieldError error : result.getFieldErrors()) {
				listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
			}
			response.put("errors", listaErrores);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			objObservacion = this.observacionService.save(observacion);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la inserción en la base de datos.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Se ha registrado correctamente la observación.");
		response.put("observacion", objObservacion);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@PutMapping("/observaciones/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> update(@Valid @RequestBody Observacion observacionEditado, BindingResult result,
			@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();

		//id = AESEncriptarDesencriptar.deecnode(id);
		Observacion observacionActualizado = null;

		if (id == 0) {
			response.put("mensaje", "El identificador no es correcto!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		}
		try {
			Observacion observacionActual = this.observacionService.findById(id);

			if (result.hasErrors()) {
				List<String> listaErrores = new ArrayList<>();
				for (FieldError error : result.getFieldErrors()) {
					listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
				}
				response.put("errors", listaErrores);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			}

			if (observacionActual == null) {
				response.put("mensaje", "Error: no se pudo editar, la observación de ID: "+id);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}

			observacionActual.setDescripcion(observacionEditado.getDescripcion());
			observacionActual.setEstado(observacionEditado.getEstado());
			observacionActual.setFecha_registro(new Date());
			observacionActual.setObjPerson(observacionEditado.getObjPerson());
			observacionActual.setObjPlan(observacionEditado.getObjPlan());
			
			observacionActualizado = this.observacionService.save(observacionActual);
		
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar la observación en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La observación ha sido actualizada con éxito!");
		response.put("observacion", observacionActualizado);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/observaciones/{id}")
	public ResponseEntity<?> eliminarObservacion(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();
		
		try {
			this.observacionService.deleteByIdObservacion(id);
			response.put("mensaje", "La observación se elimino con éxito!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			

		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la eliminación");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
