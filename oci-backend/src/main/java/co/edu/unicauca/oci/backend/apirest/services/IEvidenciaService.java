package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;
import java.util.Optional;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.EvidenciaSoportes_Dto;
import co.edu.unicauca.oci.backend.apirest.dto_mepdm.tableroAuditor_Dto;
import co.edu.unicauca.oci.backend.apirest.dto_mepdm.tableroResponsable_Dto;
import co.edu.unicauca.oci.backend.apirest.models.Evidencia;

public interface IEvidenciaService {

	public List<Evidencia> findAll();
	
	public List<Evidencia> findIdActividad(int idActividad);
	
	public Evidencia save(Evidencia objEvidencia);
	
	public Evidencia update(Evidencia objEvidencia);
	
	public void delete(int idEvidencia);
	
	public Optional<Evidencia> findById(int idEvidencia);
	
	public List<EvidenciaSoportes_Dto> getEvidenciasPorIdActividad(int idActividad);
	
	/**
	 * Función que debe ir en IPlanesMejoramientoService
	 * Obtiene los datos de los planes de mejoramiento para mostrar en la tabla del auditor
	 * @param idPersona
	 * @return
	 */
	public List<tableroAuditor_Dto> getTableroAuditor(int idPersona);
	
	/**
	 * Función que debe ir en IPlanesMejoramientoService
	 * Obtiene los datos de los planes de mejoramiento para mostrar en la tabla del responsable
	 * @param idPersona
	 * @return
	 */
	public List<tableroResponsable_Dto> getTableroResponsable(int idPersona);
}
