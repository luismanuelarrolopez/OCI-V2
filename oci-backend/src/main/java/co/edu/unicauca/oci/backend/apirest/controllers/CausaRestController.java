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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.models.Causa;
import co.edu.unicauca.oci.backend.apirest.services.ICausaService;

@RestController
@RequestMapping("api/causa")
@CrossOrigin(origins = "*")
public class CausaRestController {

	@Autowired
	private ICausaService causaService;
	
	
	@GetMapping("/causas")
	public ResponseEntity<?> index() {
		Map<String, Object> response = new HashMap<>();
		try {
			List<Causa> causas = this.causaService.findAll();
			response.put("causas", causas);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/causas/{id}")
	public ResponseEntity<?> show(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();
		
		try {
			Causa c = this.causaService.findById(id);
			
			if(c == null){
				response.put("mensaje", "El identificador no es correcto!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			}
			else{
				response.put("causa", c);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);	
			}
			

		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/getCausasPorIdHallazgo/{idHallazgo}")
	public ResponseEntity<?> getCausasPorIdHallazgo(@PathVariable("idHallazgo") Integer idHallazgo){
		List<Causa> causas = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		try {
			causas.addAll(causaService.getCausasPorIdHallazgo(idHallazgo));
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage()+" "+ e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
		}
		
		if(causas.isEmpty()) {
			response.put("mensaje", "No existen causas asociadas al hallazgo "+idHallazgo);
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);//Error 404
			return objRespuesta;
		}
		else {
			return new ResponseEntity<List<Causa>>(causas, HttpStatus.OK);//correcto 200
		}
	}

	@PostMapping("/causas")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Causa causa, BindingResult result) {
		

		Map<String, Object> response = new HashMap<>();
		Causa objCausa;

		if (result.hasErrors()) {
			List<String> listaErrores = new ArrayList<>();

			for (FieldError error : result.getFieldErrors()) {
				listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
			}
			response.put("errors", listaErrores);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			objCausa = this.causaService.save(causa);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la inserción en la base de datos.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Se ha registrado correctamente la causa.");
		response.put("causa", objCausa);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@PutMapping("/causas/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> update(@Valid @RequestBody Causa causaEditado, BindingResult result,
			@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();

		//id = AESEncriptarDesencriptar.deecnode(id);
		Causa causaActualizado = null;

		if (id == 0) {
			response.put("mensaje", "El identificador no es correcto!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		}
		try {
			Causa causaActual = this.causaService.findById(id);

			if (result.hasErrors()) {
				List<String> listaErrores = new ArrayList<>();
				for (FieldError error : result.getFieldErrors()) {
					listaErrores.add("El campo '" + error.getField() + "' " + error.getDefaultMessage());
				}
				response.put("errors", listaErrores);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			}

			if (causaActual == null) {
				response.put("mensaje", "Error: no se pudo editar, la causa de ID: "+id);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}


			causaActual.setCausa(causaEditado.getCausa());
			//causaActual.setTipo_control(causaEditado.getTipo_control());

			causaActualizado = this.causaService.save(causaActual);
		
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar la causa en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La causa ha sido actualizada con éxito!");
		response.put("causa", causaActualizado);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/causas/{id}")
	public ResponseEntity<?> eliminarHallazgo(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();
		
		try {
			this.causaService.deleteByIdCausa(id);
			response.put("mensaje", "La causa se elimino con éxito!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			

		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la eliminar, la causa tiene por lo menos una acción asociada.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
