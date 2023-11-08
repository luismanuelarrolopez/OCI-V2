package co.edu.unicauca.oci.backend.apirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.models.Proceso;
import co.edu.unicauca.oci.backend.apirest.services.IProcesoService;
import co.edu.unicauca.oci.backend.apirest.utils.AESEncriptarDesencriptar;

@RestController
@RequestMapping("/api/mpdm")
@CrossOrigin(origins = "*")
public class ProcesoController {

	@Autowired
	private IProcesoService serviceProceso;
	
	@GetMapping("/procesos")
	public ResponseEntity<?> index(){
		Map<String, Object> response = new HashMap<>();
		try {
			List<Proceso> procesos = this.serviceProceso.findAllProcess();
			response.put("procesos", procesos);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/subprocesos/{id}")
	public ResponseEntity<?> show(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();

		try {
			Proceso proceso = this.serviceProceso.findById(id);

			if (proceso == null) {
				response.put("mensaje", "Error: no se pudo consultar el proceso ID: "
						.concat(id.toString().concat(" no existe en la base de datos!")));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}

			List<Proceso> subprocesos = this.serviceProceso.findAllSubProcess(id);
			response.put("subProcesos", subprocesos);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
