package co.edu.unicauca.oci.backend.apirest.controllers;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.*;
import co.edu.unicauca.oci.backend.apirest.models.Accion;
import co.edu.unicauca.oci.backend.apirest.services.IAccionService;

@RestController
@RequestMapping("api/accion")
@CrossOrigin(origins = "*")
public class AccionRestController {

	@Autowired(required=true)
	private IAccionService accionService;


	@GetMapping("/acciones")
	public ResponseEntity<?> index() {
		Map<String, Object> response = new HashMap<>();
		try {
			List<Accion> acciones = this.accionService.findAll();
			response.put("acciones", acciones);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/acciones/{id}")
	public ResponseEntity<?> show(@PathVariable int id) {
		Map<String, Object> response = new HashMap<>();
		
		try {
			Accion acc = this.accionService.findById(id);
			
			if(acc == null){
				response.put("mensaje", "El identificador no es correcto!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			}
			else{
				response.put("accion", acc);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);	
			}
			

		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/getAccionesPorIdCausa/{idCausa}")
	public ResponseEntity<?> getAccionesPorIdCausa(@PathVariable("idCausa") Integer idCausa){
		List<Accion> acciones = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		try {
			acciones.addAll(this.accionService.getAccionesPorIdCausa(idCausa));
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage()+" "+ e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
		}
		
		if(acciones.isEmpty()) {
			response.put("mensaje", "No existen acciones asociadas a la causa "+idCausa);
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);//Error 404
			return objRespuesta;
		}
		else {
			return new ResponseEntity<List<Accion>>(acciones, HttpStatus.OK);//correcto 200
		}
	}

	@GetMapping("/count-acciones-proceso/{idProceso}")
	public ResponseEntity<?> countAccionesPorProceso(@PathVariable("idProceso") Integer idProceso) {
		Map<String, Object> response = new HashMap<>();
		try {
			Integer numAcciones = this.accionService.countAccionesPorProceso(idProceso);
			response.put("numAcciones", numAcciones);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible obtener las acciones de un proceso.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/count-acciones-plan")
	public ResponseEntity<?> countAccionesPorPlan(@RequestHeader("code-url") String idPlan) {
		Map<String, Object> response = new HashMap<>();
		try {
			Integer numAcciones = this.accionService.countAccionesPorPlan(idPlan);
			response.put("numAcciones", numAcciones);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible obtener las acciones de un plan.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/count-acciones-activas")
	public ResponseEntity<?> countAccionesActivas() {
		Map<String, Object> response = new HashMap<>();
		try {
			Integer numAcciones = this.accionService.countAccionesActivas();
			response.put("numAcciones", numAcciones);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible obtener el conteo de acciones.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/acciones")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Accion accion, BindingResult result) {
		

		Map<String, Object> response = new HashMap<>();
		Accion objAccion;

		if (result.hasErrors()) {
			List<String> listaErrores = new ArrayList<>();

			for (FieldError error : result.getFieldErrors()) {
				listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
			}
			response.put("errors", listaErrores);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			objAccion = this.accionService.save(accion);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la inserción en la base de datos.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Se ha registrado correctamente la accion.");
		response.put("accion", objAccion);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@PutMapping("/acciones/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> update(@Valid @RequestBody Accion accionEditado, BindingResult result,
			@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();

		//id = AESEncriptarDesencriptar.deecnode(id);
		Accion accionActualizado = null;

		if (id == 0) {
			response.put("mensaje", "El identificador no es correcto!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		}
		try {
			Accion accionActual = this.accionService.findById(id);

			if (result.hasErrors()) {
				List<String> listaErrores = new ArrayList<>();
				for (FieldError error : result.getFieldErrors()) {
					listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
				}
				response.put("errors", listaErrores);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			}

			if (accionActual == null) {
				response.put("mensaje", "Error: no se pudo editar, la accion de ID: "+id);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}


			accionActual.setAccion(accionEditado.getAccion());
			accionActual.setDescripcion(accionEditado.getDescripcion());
			//accionActual.setTipoAccion(accionEditado.getTipoAccion());

			accionActualizado = this.accionService.save(accionActual);
		
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar el hallazgo en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El hallazgo ha sido actualizado con éxito!");
		response.put("accion", accionActualizado);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/acciones/{id}")
	public ResponseEntity<?> eliminarHallazgo(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();
		
		try {
			this.accionService.deleteByIdAccion(id);
			response.put("mensaje", "La acción se elimino con éxito!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			

		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la eliminar, la acción tiene por lo menos una actividad asociada.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


}
