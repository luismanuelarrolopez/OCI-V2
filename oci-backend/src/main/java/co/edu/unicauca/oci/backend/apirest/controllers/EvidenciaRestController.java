package co.edu.unicauca.oci.backend.apirest.controllers;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

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
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.EvidenciaSoportes_Dto;
import co.edu.unicauca.oci.backend.apirest.dto_mepdm.tableroAuditor_Dto;
import co.edu.unicauca.oci.backend.apirest.dto_mepdm.tableroResponsable_Dto;
import co.edu.unicauca.oci.backend.apirest.models.Evidencia;
import co.edu.unicauca.oci.backend.apirest.models.PlanMejoramiento;
import co.edu.unicauca.oci.backend.apirest.services.IActividadService;
import co.edu.unicauca.oci.backend.apirest.services.IEvidenciaService;
import co.edu.unicauca.oci.backend.apirest.services.IPlanMejoramientoService;
import co.edu.unicauca.oci.backend.apirest.utils.AESEncriptarDesencriptar;
import co.edu.unicauca.oci.backend.apirest.utils.EstadoPDM;

@RestController
@RequestMapping("api/evidencia")
@CrossOrigin(origins = "*")
public class EvidenciaRestController {

	@Autowired
	private IEvidenciaService evidenciaService;
	@Autowired
	private IPlanMejoramientoService planService;
	@Autowired
	private IActividadService actividadService;
	
	@GetMapping("/listar")
	public ResponseEntity<?> listar(){
		List<Evidencia> evidencias = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		try {
			evidencias.addAll(evidenciaService.findAll());
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage()+" "+ e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
		}
		
		if(evidencias.isEmpty()) {
			response.put("mensaje", "No existen evidencias registradas en la base de datos");
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);//Error 404
			return objRespuesta;
		}
		else {
			return new ResponseEntity<List<Evidencia>>(evidencias, HttpStatus.OK);//correcto 200
		}
	}
	
	@GetMapping("/actividad/{idActividad}")
	public ResponseEntity<?> listarPorId(@PathVariable("idActividad") int idActividad){
		List<Evidencia> evidencias = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		
		evidencias.addAll(evidenciaService.findIdActividad(idActividad));
		
		return new ResponseEntity<List<Evidencia>>(evidencias, HttpStatus.OK);
		
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody Evidencia evidencia) {
		Map<String, Object> response = new HashMap<>();
		boolean status = false;
		try {
			Optional<Evidencia> objEvidencia = evidenciaService.findById(evidencia.getId());
			if(objEvidencia.isPresent()) {
				evidencia.setFechaCargue(objEvidencia.get().getFechaCargue());
				evidenciaService.update(evidencia);
				status = true;
			}
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la actualización en la base de datos");
			response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if(status)
			return new ResponseEntity<Evidencia>(evidencia, HttpStatus.OK);
		
		response.put("mensaje", "No existe un registro previo para actualizar con el ID: "+evidencia.getId());
		return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Evidencia evidencia) {
		Map<String, Object> response = new HashMap<>();
		Evidencia objEvidencia;
		try {
			evidencia.setFechaCargue(this.convertToDateViaInstant(LocalDate.now()));
			objEvidencia = this.evidenciaService.save(evidencia);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la inserción en la base de datos");
			response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<Evidencia>(objEvidencia,HttpStatus.OK);
	}

	public Date convertToDateViaInstant(LocalDate dateToConvert) {
		return java.util.Date.from(dateToConvert.atStartOfDay()
				.atZone(ZoneId.of("America/Bogota"))
				.toInstant());
	}
	
	@DeleteMapping("/delete/{idEvidencia}")
	public ResponseEntity<?> delete(@PathVariable("idEvidencia") int idEvidencia) {
		Map<String, Object> response = new HashMap<>();
		boolean status = true;
		try {
			evidenciaService.delete(idEvidencia);
			Optional<Evidencia> objEvidencia = evidenciaService.findById(idEvidencia);
			
			if(objEvidencia.isPresent()) {
				status = false;
			}
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la eliminación del registro en la base de datos");
			response.put("Error", e.getMessage()+" "+e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(status)
			return new ResponseEntity<Boolean>(status, HttpStatus.OK);
		
		response.put("mensaje", "El registro no fue eliminado, el ID: "+idEvidencia+" aún persiste");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_MODIFIED);
	}
	
	
	@GetMapping("/getEvidenciasPorIdActividad/{idActividad}")
	public ResponseEntity<?> getEvidenciasPorIdActividad(@PathVariable("idActividad") int idActividad){
		List<EvidenciaSoportes_Dto> tableroAuditor = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		try {
			tableroAuditor.addAll(evidenciaService.getEvidenciasPorIdActividad(idActividad));
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage()+" "+ e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
		}
		
		if(tableroAuditor.isEmpty()) {
			response.put("mensaje", "No existen evidencias asociadas a la actividad "+idActividad);
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);//Error 404
			return objRespuesta;
		}
		else {
			return new ResponseEntity<List<EvidenciaSoportes_Dto>>(tableroAuditor, HttpStatus.OK);//correcto 200
		}
	}
	
	
	/*
	 * ==============================================================================================================
	 * ==============================================================================================================*/
	
	/**
	 * Función que obtiene los planes de mejoramiento de un auditor. 
	 * Este controller debe ir en el controller Planes de mejoramiento, pero existe un inconveniente
	 * con la integración
	 * 
	 * @param idPersona
	 * @return
	 */
	@GetMapping("/getTablaAuditor/{idPersona}")
	public ResponseEntity<?> getTablaAuditor(@PathVariable("idPersona") int idPersona){
		List<tableroAuditor_Dto> tableroAuditor = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		try {
			tableroAuditor.addAll(evidenciaService.getTableroAuditor(idPersona));
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage()+" "+ e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
		}
		
		if(tableroAuditor.isEmpty()) {
			response.put("mensaje", "No existen planes de mejoramiento asociados al usuario "+idPersona);
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);//Error 404
			return objRespuesta;
		}
		else {
			return new ResponseEntity<List<tableroAuditor_Dto>>(tableroAuditor, HttpStatus.OK);//correcto 200
		}
	}
	
	@GetMapping("/getTablaResponsable/{idPersona}")
	public ResponseEntity<?> getTablaResponsable(@PathVariable("idPersona") int idPersona){
		List<tableroResponsable_Dto> tableroAuditor = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		System.out.println(response);
		try {
			System.out.println("entrando al try");
			tableroAuditor.addAll(evidenciaService.getTableroResponsable(idPersona));
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datosjjj");
			response.put("error", e.getMessage()+" "+ e.getMostSpecificCause().getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Error 500
		}
		
		if(tableroAuditor.isEmpty()) {
			response.put("mensaje", "No existen planes de mejoramiento asociados al usuario "+idPersona);
			ResponseEntity<Map<String, Object>> objRespuesta = new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);//Error 404
			return objRespuesta;
		}
		else {
			return new ResponseEntity<List<tableroResponsable_Dto>>(tableroAuditor, HttpStatus.OK);//correcto 200
		}
	}
	
	/*
	 * ==============================================================================================================
	 * ==============================================================================================================*/
}
