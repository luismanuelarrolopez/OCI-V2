package co.edu.unicauca.oci.backend.apirest.services;

import co.edu.unicauca.oci.backend.apirest.dto_mepdm.ActividadEstadistica_Dto;
import co.edu.unicauca.oci.backend.apirest.dto_mepdm.Actividad_Dto;
import co.edu.unicauca.oci.backend.apirest.models.Actividad;
import co.edu.unicauca.oci.backend.apirest.models.Evidencia;
import co.edu.unicauca.oci.backend.apirest.models.Person;
import co.edu.unicauca.oci.backend.apirest.repositories.ActividadRepository;
import co.edu.unicauca.oci.backend.apirest.repositories.EvidenciaRepository;
import co.edu.unicauca.oci.backend.apirest.utils.EstadoActividad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ActividadServiceImpl implements IActividadService {

    private final double avanceCumplimiento = 100;
    @Autowired
    private ActividadRepository serviceAccessDbActividad;
    @Autowired
    private EvidenciaRepository evidenciaAccessDb;

    @Override
    public List<Actividad> getActividadesByIdAccion(int idAccion) {
        return serviceAccessDbActividad.getActividadesByIdAccion(idAccion);
    }

    @Override
    public List<Actividad> getActividadesByIdAccionByResponsable(int idAccion,int idResponsable) {
        return serviceAccessDbActividad.getActividadesByIdAccionByResponsable(idAccion,idResponsable);
    }

    @Override
    public List<Actividad> findAll() {
        return (List<Actividad>) serviceAccessDbActividad.findAll();
    }

    @Override
    public Actividad save(Actividad actividad) {
        return serviceAccessDbActividad.save(actividad);
    }

    @Override
    public Actividad findById(int idActividad) {
        return serviceAccessDbActividad.findById(idActividad).orElse(null);
    }

    @Override
    public void deleteByIdActividad(Integer id) {
        serviceAccessDbActividad.deleteById(id);
    }

    @Override
    public Person obtenerAuditorResponsable(Integer idActividad) {
        List<Object> respuesta = serviceAccessDbActividad.getAuditorEncargadoActividad(idActividad);
        Object[] object;
        object = (Object[]) respuesta.get(0);
        Person auditor = new Person();
        auditor.setIdPerson((Integer) object[0]);
        return auditor;
    }

    @Override
    public List<Actividad_Dto> getActividadesByIdPlan(String idPlan) {
        List<Object> tablero = serviceAccessDbActividad.getActividadesPorIdPlan(idPlan);
        List<Actividad_Dto> tableroActividad = new ArrayList<>();
        Object[] object;

        for (int i = 0; i < tablero.size(); i++) {
            Actividad_Dto objTablero = new Actividad_Dto();
            object = (Object[]) tablero.get(i);

            objTablero.setIdActividad(object[0] != null ? Integer.parseInt(object[0].toString()) : 0);
            objTablero.setActividad(object[1] != null ? object[1].toString() : "");

            tableroActividad.add(objTablero);
        }

        return tableroActividad;
    }

    @Override
    public List<ActividadEstadistica_Dto> getActividadesPorProceso(Integer idProceso) {
        List<Object> objActividades = serviceAccessDbActividad.getActividadesPorProceso(idProceso);
        List<ActividadEstadistica_Dto> actividades = new ArrayList<>();
        if (!objActividades.isEmpty()) {
            for (Object obj : objActividades) {
                ActividadEstadistica_Dto actividad = new ActividadEstadistica_Dto();
                Object[] objectArray = (Object[]) obj;
                actividad.setIdActividad(Integer.parseInt(objectArray[0].toString()));
                actividad.setEstado(objectArray[1].toString());
                actividad.setAvance(Double.parseDouble(objectArray[2].toString()));
                actividades.add(actividad);
            }
        }
        return actividades;
    }

    @Override
    public List<Actividad> getAllActividadesByPlan(String idPlan) {
        return serviceAccessDbActividad.getAllActividadesPorPlan(idPlan);
    }

    @Override
    public List<Object> countEstadoAllActividades() {
        return serviceAccessDbActividad.countEstadoActividades();
    }

    @Override
    public List<Object> countEstadoActividadesProceso(Integer idProceso) {
        return serviceAccessDbActividad.countEstadoActividadesProceso(idProceso);
    }

    @Override
    public List<Object> countEstadoActividadesPlan(String idPlan) {
        return serviceAccessDbActividad.countEstadoActividadesPlan(idPlan);
    }

    @Override
    public boolean verificarCumplimiento(Actividad actividad) {
        boolean cumplimientoEvidencias = false;
        ArrayList<Evidencia> evidenciasActividad = (ArrayList<Evidencia>) evidenciaAccessDb.
                findIdActividad(actividad.getId_Actividad());
        if (evidenciasActividad.size() > 0) {
            cumplimientoEvidencias = this.evidenciasEnCumplimiento(actividad, evidenciasActividad);
        }
        return (actividad.getAvance() == this.avanceCumplimiento && cumplimientoEvidencias);
    }

    @Override
    public List<Actividad> updateEstadoActividades() {
        ArrayList<Actividad> actividades = (ArrayList<Actividad>) serviceAccessDbActividad.getActividadesActivas();
        List<Actividad> actualizaciones = new ArrayList<>();

        for (Actividad actividad : actividades) {
            if (!actividad.getEstado().equals(EstadoActividad.TERMINADA.getNombre())) {
                String estadoActividad = this.getEstadoActividad(actividad);
                if (!estadoActividad.equals(actividad.getEstado())) {
                    actividad.setEstado(estadoActividad);
                    actualizaciones.add(this.serviceAccessDbActividad.save(actividad));
                }
            }
        }

        return actualizaciones;
    }

    @Override
    public String getEstadoActividad(Actividad actividad) {
        LocalDate currentDate = LocalDate.now();
        LocalDate fechaTerminacion = this.convertToLocalDateViaInstant(actividad.getFechaTerminacion());
        String estado = EstadoActividad.ACTIVA.getNombre();

        if (actividad.getAvance() < this.avanceCumplimiento) {

            ArrayList<Evidencia> evidencias = (ArrayList<Evidencia>) this.evidenciaAccessDb.findIdActividad(actividad.getId_Actividad());
            if (evidencias.isEmpty()) {
                if (currentDate.isAfter(fechaTerminacion)) {
                    estado = EstadoActividad.INCUMPLIDA.getNombre();
                } else if (this.porVencerse(currentDate, fechaTerminacion, this.convertToLocalDateViaInstant(actividad.getFechaEjecucion()))) {
                    estado = EstadoActividad.POR_VENCERSE.getNombre();
                }
            } else {
                if (currentDate.isAfter(fechaTerminacion)) {
                    if (!this.evidenciasEnCumplimiento(actividad, evidencias)) {
                        estado = EstadoActividad.INCUMPLIDA.getNombre();
                    }
                }
            }
        }
        return estado;
    }


    @Override
    public List<Actividad> getActividadesActivas() {
        return serviceAccessDbActividad.getActividadesActivas();
    }

    public boolean porVencerse(LocalDate currentDate, LocalDate fechaTerminacion, LocalDate fechaInicio) {
        Period periodo = Period.between(fechaInicio, fechaTerminacion);
        int diasDiferencia = periodo.getDays();
        int diasCuarto = (int) Math.round((double) diasDiferencia / 4);

        LocalDate fechaCuarto = fechaTerminacion.minusDays(diasCuarto);

        return currentDate.isAfter(fechaCuarto) || currentDate.isEqual(fechaCuarto);
    }

    public LocalDate convertToLocalDateViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    public boolean evidenciasEnCumplimiento(Actividad actividad, ArrayList<Evidencia> evidencias) {

        boolean enFecha = true;
        //LocalDate fechaFin = this.convertToLocalDateViaInstant(actividad.getFechaTerminacion());
        LocalDate fechaFin = LocalDate.now();
        for (Evidencia evidencia : evidencias) {
            //LocalDate fechaCargue = this.convertToLocalDateViaInstant(evidencia.getFechaCargue());
            LocalDate fechaCargue = LocalDate.now();
            if (fechaCargue.isAfter(fechaFin)) {
                enFecha = false;
            }
        }
        return enFecha;
    }

}
