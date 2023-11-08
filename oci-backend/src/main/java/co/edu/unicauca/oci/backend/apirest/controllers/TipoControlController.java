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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.models.TipoControl;
import co.edu.unicauca.oci.backend.apirest.services.ITipoControlService;


@RestController
@RequestMapping("/api/tipoControl")
@CrossOrigin(origins = "*")
public class TipoControlController {

	@Autowired
	private ITipoControlService serviceTipoControl;
	
	@GetMapping("/tipo")
	public ResponseEntity<?> index(){
		Map<String, Object> response = new HashMap<>();
		try {
			List<TipoControl> tipoControl = this.serviceTipoControl.findAllTipoControl();
			response.put("tipoControl", tipoControl);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error, no ha sido posible realizar la consulta.");
			response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
