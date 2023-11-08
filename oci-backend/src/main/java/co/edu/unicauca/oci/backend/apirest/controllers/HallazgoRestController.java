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

import co.edu.unicauca.oci.backend.apirest.models.Hallazgo;
import co.edu.unicauca.oci.backend.apirest.services.IHallazgoService;
import co.edu.unicauca.oci.backend.apirest.utils.AESEncriptarDesencriptar;

@RestController
@RequestMapping("api/hallazgo")
@CrossOrigin(origins = "*")
public class HallazgoRestController {

	@Autowired
	private IHallazgoService hallazgoService;
	

	@GetMapping("/hallazgos")
	public ResponseEntity<?> index() {
		Map<String, Object> response = new HashMap<>();
		try {
			List<Hallazgo> hallazgos = this.hallazgoService.findAll();
			response.put("hallazgo", hallazgos);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/hallazgos/{id}")
	public ResponseEntity<?> findUserById(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();
		
		try {
			Hallazgo h = this.hallazgoService.findById(id);
			
			if(h == null){
				response.put("mensaje", "El identificador no es correcto!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			}
			else{
				response.put("hallazgo", h);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);	
			}
			

		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/hallazgos-proceso/{id}")
	public ResponseEntity<?> hallazgosPorProceso(@PathVariable Integer id){
		Map<String, Object> response = new HashMap<>();
		try{
			List<Integer> hallazgos = this.hallazgoService.findHallazgosPorProceso(id);
			response.put("hallazgo", hallazgos);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		}catch(DataAccessException e){
			response.put("mensaje", "Error, no ha sido posible realizar la consulta de hallazgos por id proceso.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getHallazgosPorIdPlan")
	public ResponseEntity<?> getHallazgosPorIdPlan(@RequestHeader("code-url") String idPlan){
		List<Hallazgo> hallazgos = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();

		idPlan =  AESEncriptarDesencriptar.deecnode(idPlan);

		try {
			
			hallazgos.addAll(hallazgoService.getHallazgosPorIdPlan(idPlan));
			
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage()+" "+ e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
		}
		
		if(hallazgos.isEmpty()) {
			response.put("mensaje", "No existen hallazgos asociados al plan de mejoramiento "+idPlan);
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);//Error 404
			return objRespuesta;
		}
		else {
			return new ResponseEntity<List<Hallazgo>>(hallazgos, HttpStatus.OK);//correcto 200
		}
	}

	@PostMapping("/hallazgos")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Hallazgo hallazgo, BindingResult result) {
		

		Map<String, Object> response = new HashMap<>();
		Hallazgo objHallazgo;

		if (result.hasErrors()) {
			List<String> listaErrores = new ArrayList<>();

			for (FieldError error : result.getFieldErrors()) {
				listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
			}
			response.put("errors", listaErrores);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			objHallazgo = this.hallazgoService.save(hallazgo);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la inserción en la base de datos.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Se ha registrado correctamente el hallazgo.");
		response.put("hallazgo", objHallazgo);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@PutMapping("/hallazgos/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> update(@Valid @RequestBody Hallazgo hallazgoEditado, BindingResult result,
			@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();

		//id = AESEncriptarDesencriptar.deecnode(id);
		Hallazgo hallazgoActualizado = null;

		if (id == 0) {
			response.put("mensaje", "El identificador no es correcto!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		}
		try {
			Hallazgo hallazgoActual = this.hallazgoService.findById(id);

			if (result.hasErrors()) {
				List<String> listaErrores = new ArrayList<>();
				for (FieldError error : result.getFieldErrors()) {
					listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
				}
				response.put("errors", listaErrores);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			}

			if (hallazgoActual == null) {
				response.put("mensaje", "Error: no se pudo editar, el hallazgo de ID: "+id);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}


			hallazgoActual.setHallazgo(hallazgoEditado.getHallazgo());

			hallazgoActualizado = this.hallazgoService.save(hallazgoActual);
		
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar el hallazgo en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El hallazgo ha sido actualizado con éxito!");
		response.put("hallazgo", hallazgoActualizado);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/hallazgos/{id}")
	public ResponseEntity<?> eliminarHallazgo(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();
		
		try {
			this.hallazgoService.deleteByIdHallazgo(id);
			response.put("mensaje", "El hallazgo se elimino con éxito!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			

		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la eliminar, el hallazgo tiene una causa.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/hallazgos-activos")
	public ResponseEntity<?> hallazgosActivos(){
		Map<String, Object> response = new HashMap<>();
		try{
			List<Integer> hallazgos = this.hallazgoService.findHallazgosActivos();
			response.put("hallazgos", hallazgos);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		}catch(DataAccessException e){
			response.put("mensaje", "Error, no ha sido posible realizar la consulta de hallazgos por id proceso.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
