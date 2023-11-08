package co.edu.unicauca.oci.backend.apirest.controllers;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.models.Soporte;
import co.edu.unicauca.oci.backend.apirest.services.ISoporteService;

@RestController
@RequestMapping("api/soporte")
@CrossOrigin(origins = "*")
public class SoporteRestController {

	@Autowired
	private ISoporteService soporteService;
	
	@GetMapping("/listar")
	public ResponseEntity<?> listar(){
		List<Soporte> soportes = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		
		soportes.addAll(soporteService.listar());
		
		if(soportes.isEmpty()) {
			response.put("Mensaje", "No se encontraron soportes registrados en la base de datos");
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
			return objRespuesta;
		}
		
		return new ResponseEntity<List<Soporte>>(soportes, HttpStatus.OK);
	}
	
	@GetMapping("/listarPorIdEvidencia")
	public ResponseEntity<?> listarPorIdEvidencia(@RequestParam("idEvidencia") int idEvidencia){
		List<Soporte> soportes = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		
		soportes.addAll(soporteService.listarPorIdEvidencia(idEvidencia));
		
		if(soportes.isEmpty()) {
			response.put("mensaje", "No se encontraron soportes con el ID_Evidencia: "+idEvidencia + " en la base de datos");
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
			return objRespuesta;
		}
		
		return new ResponseEntity<List<Soporte>>(soportes, HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Soporte soporte) {
		Map<String, Object> response = new HashMap<>();
		
		Soporte objSoporte;
		try {
			objSoporte = this.soporteService.save(soporte);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la inserción en la base de datos");
			response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<Soporte>(objSoporte, HttpStatus.OK);
	}
	
	@PutMapping("/update")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> update(@RequestBody Soporte soporte) {
		Map<String, Object> response = new HashMap<>();
		boolean status = false;
		try {
			Optional<Soporte> objSoporte = soporteService.findById(soporte.getId());
			if(objSoporte.isPresent()) {
				soporteService.update(soporte);
				status = true;
			}
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la actualización en la base de datos");
			response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if(status)
			return new ResponseEntity<Soporte>(soporte,HttpStatus.OK);
		
		response.put("mensaje", "No existe un registro previo para actualizar con el ID: "+soporte.getId());
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/delete/{idSoporte}")
	public ResponseEntity<?> delete(@PathVariable("idSoporte") int idSoporte) {
		Map<String, Object> response = new HashMap<>();
		boolean status = true;
		try {
			soporteService.delete(idSoporte);
			Optional<Soporte> objSoporte = soporteService.findById(idSoporte);
			
			if(objSoporte.isPresent()) {
				status = false;
			}
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la eliminación del registro en la base de datos");
			response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(status)
			return new ResponseEntity<Boolean>(status,HttpStatus.OK);
			
			response.put("mensaje", "El registro no fue eliminado, el ID: "+idSoporte + " aún persiste");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_MODIFIED);
	}
}
