package co.edu.unicauca.oci.backend.apirest.scheduled;

import co.edu.unicauca.oci.backend.apirest.models.Actividad;
import co.edu.unicauca.oci.backend.apirest.services.IActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ScheduledTasks {

    @Autowired
    private IActividadService actividadService;


    @Scheduled(cron = "0 0 3 * * *")
    public void verificarEstadoActividades() {
        List<Actividad> actividades;
        actividades = this.actividadService.updateEstadoActividades();
    }

}
