package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unicauca.oci.backend.apirest.models.Accion;
import co.edu.unicauca.oci.backend.apirest.repositories.AccionRepository;

@Service
public class AccionServiceImpl implements IAccionService {

    @Autowired
    private AccionRepository servicioAccessDbAccion;

    @Override
    public List<Accion> getAccionesPorIdCausa(int idCausa) {
        return servicioAccessDbAccion.getAccionByIdCauca(idCausa);
    }

    @Override
    public Accion save(Accion accion) {
        return servicioAccessDbAccion.save(accion);
    }

    @Override
    public Accion findById(int id) {
        return servicioAccessDbAccion.findById(id).orElse(null);
    }

    @Override
    public List<Accion> findAll() {
        return (List<Accion>) servicioAccessDbAccion.findAll();
    }

    @Override
    public void deleteByIdAccion(Integer id) {
        servicioAccessDbAccion.deleteById(id);
    }

    @Override
    public Integer countAccionesPorProceso(Integer idProceso) {
        return servicioAccessDbAccion.countAccionesPorProceso(idProceso);
    }

    @Override
    public Integer countAccionesPorPlan(String idPlan) {
        return servicioAccessDbAccion.countAccionesPorPlan(idPlan);
    }

    @Override
    public Integer countAccionesActivas(){
        return servicioAccessDbAccion.countAccionesActivas();
    }
}
