package co.edu.unicauca.oci.backend.apirest.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.xml.bind.ParseConversionEvent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.EvidenciaSoportes_Dto;
import co.edu.unicauca.oci.backend.apirest.dto_mepdm.tableroAuditor_Dto;
import co.edu.unicauca.oci.backend.apirest.dto_mepdm.tableroResponsable_Dto;
import co.edu.unicauca.oci.backend.apirest.models.Evidencia;
import co.edu.unicauca.oci.backend.apirest.repositories.EvidenciaRepository;

@Service
public class EvidenciaServiceImpl implements IEvidenciaService{

	@Autowired
	private EvidenciaRepository servicioAccesoBDEvidencia;
	
	@Override
	@Transactional(readOnly = true)
	public List<Evidencia> findAll() {
		return (List<Evidencia>) servicioAccesoBDEvidencia.findAll();
	}

	@Override
	public Evidencia save(Evidencia objEvidencia) {
		return servicioAccesoBDEvidencia.save(objEvidencia);
	}

	@Override
	public Evidencia update(Evidencia objEvidencia) {
		return servicioAccesoBDEvidencia.save(objEvidencia);
	}

	@Override
	public void delete(int idEvidencia) {
		servicioAccesoBDEvidencia.deleteById(idEvidencia);
	}

	@Override
	public List<Evidencia> findIdActividad(int idActividad) {
		return servicioAccesoBDEvidencia.findIdActividad(idActividad);
	}

	@Override
	public Optional<Evidencia> findById(int idEvidencia) {
		return servicioAccesoBDEvidencia.findById(idEvidencia);
	}

	/*
	 * Estas funciones se recomiendas que esten en la implementación de de planes de mejora
	 * =========================================================================================*/
	
	
	@Override
	public List<tableroAuditor_Dto> getTableroAuditor(int idPersona) {
		List<Object> tableroAuditor = servicioAccesoBDEvidencia.getTablaAuditor(idPersona);
		return buildTableroAuditor(tableroAuditor);
	}
	
	public List<tableroAuditor_Dto> buildTableroAuditor(List<Object> tablero){
		List<tableroAuditor_Dto> tableroAuditor = new ArrayList<>();
		Object object[] = null;
		
		for (int i = 0; i < tablero.size(); i++) {
			tableroAuditor_Dto objTablero = new tableroAuditor_Dto();
			object = (Object[]) tablero.get(i);
			
			objTablero.setIdPlan(object[0].toString());
			objTablero.setNombreResponsable(object[1] != null ? object[1].toString() : "");
			objTablero.setNombreAuditor(object[2] != null ? object[2].toString() : "");
			objTablero.setNombrePlan(object[3] != null ? object[3].toString() : "");
			objTablero.setEstado(object[4] != null ? object[4].toString() : "");
			objTablero.setFechaUltimoSeguimiento(object[5] != null ? (Date) object[5] : null);
			objTablero.setFechaLimite(object[6] != null ? (Date) object[6] : null);
			objTablero.setEfectividad(object[7] != null ? Double.parseDouble(object[7].toString()) : 0);
			objTablero.setAvance(object[8] != null ? Double.parseDouble(object[8].toString()): 0);
			
			tableroAuditor.add(objTablero);
		}
		
		
		return tableroAuditor;
	}

	@Override
	public List<tableroResponsable_Dto> getTableroResponsable(int idPersona) {
		List<Object> tableroResponsable = servicioAccesoBDEvidencia.getTablaResponsable(idPersona);
		return buildTableroResponsable(tableroResponsable);
	}
	
	public List<tableroResponsable_Dto> buildTableroResponsable(List<Object> tablero){
		List<tableroResponsable_Dto> tableroResponsable = new ArrayList<>();
		Object object[] = null;
		
		for (int i = 0; i < tablero.size(); i++) {
			tableroResponsable_Dto objTablero = new tableroResponsable_Dto();
			object = (Object[]) tablero.get(i);
			
			objTablero.setIdPlan(object[0].toString());
			objTablero.setNombreAuditor(object[1] != null ? object[1].toString() : "");
			objTablero.setNombrePlan(object[2] != null ? object[2].toString() : "");
			objTablero.setEstado(object[3] != null ? object[3].toString() : "");
			objTablero.setFechaUltimoSeguimiento(object[4] != null ? (Date) object[4] : null);
			objTablero.setFechaLimite(object[5] != null ? (Date) object[5] : null);
			objTablero.setEfectividad(object[6] != null ? object[6].toString() : "");
			objTablero.setAvance(Float.parseFloat(object[7].toString()));
			objTablero.setTipoAccion(object[8] != null ? object[8].toString() : "");
			objTablero.setIdAccion(object[9] != null ? (int) object[9] : 0);
			
			tableroResponsable.add(objTablero);
		}
		
		
		return tableroResponsable;
	}
	
	/*
	 * =========================================================================================*/
	
	
	@Override
	public List<EvidenciaSoportes_Dto> getEvidenciasPorIdActividad(int idActividad) {
		List<Object> evidencias = servicioAccesoBDEvidencia.getEvidenciasPorIdActividad(idActividad);
		return buildEvidenciasPorIdActividad(evidencias);
	}
	
	public List<EvidenciaSoportes_Dto> buildEvidenciasPorIdActividad(List<Object> evidencias){
		List<EvidenciaSoportes_Dto> listEvidencias = new ArrayList<>();
		Object object[] = null;
		
		for (int i = 0; i < evidencias.size(); i++) {
			EvidenciaSoportes_Dto objEvidencia = new EvidenciaSoportes_Dto();
			object = (Object[]) evidencias.get(i);
			
			objEvidencia.setIdActividad(Integer.parseInt(object[0].toString()));
			objEvidencia.setIdEvidencia(Integer.parseInt(object[1].toString()));
			objEvidencia.setIdSoporte(object[2] != null ? Integer.parseInt(object[2].toString()): 0);
			objEvidencia.setIdEvaluacion(object[3] != null ? Integer.parseInt(object[3].toString()): 0);
			objEvidencia.setNombreEvidencia(object[4] != null ? object[4].toString() : "");
			objEvidencia.setFechaCargue(object[5] != null ? (Date) object[5] : new Date());
			objEvidencia.setLinkDescarga(object[6] != null ? object[6].toString() : "");
			objEvidencia.setEstadoEvaluacion(object[7] != null ? object[7].toString() : "");
			objEvidencia.setObservaciones(object[8] != null ? object[8].toString() : "");
			
			listEvidencias.add(objEvidencia);
		}
		
		return listEvidencias;
	}
}
