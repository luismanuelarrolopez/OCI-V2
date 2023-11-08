package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.ActividadEstadistica_Dto;
import co.edu.unicauca.oci.backend.apirest.dto_mepdm.Actividad_Dto;
import co.edu.unicauca.oci.backend.apirest.models.Actividad;
import co.edu.unicauca.oci.backend.apirest.models.Person;

public interface IActividadService {

	public List<Actividad> getActividadesByIdAccion(int idAccion);
	public List<Actividad> getActividadesByIdAccionByResponsable(int idAccion,int idResponsable);
	public List<Actividad> findAll();
	public Actividad save(Actividad actividad);
	public Actividad findById(int idActividad);
	public void deleteByIdActividad(Integer id);
	public Person obtenerAuditorResponsable (Integer idActividad);
	public List<Actividad_Dto> getActividadesByIdPlan(String idPlan);
	public List<ActividadEstadistica_Dto> getActividadesPorProceso(Integer idProceso);
	public List<Actividad> getAllActividadesByPlan(String idPlan);
	public List<Object> countEstadoAllActividades();
	public List<Object> countEstadoActividadesProceso(Integer idProceso);
	public List<Object> countEstadoActividadesPlan(String idPlan);
	public boolean verificarCumplimiento(Actividad actividad);
	public List<Actividad> updateEstadoActividades();
	public String getEstadoActividad(Actividad actividad);
	public List<Actividad> getActividadesActivas();
}
