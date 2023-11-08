package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import co.edu.unicauca.oci.backend.apirest.models.Accion;

public interface IAccionService {

    public List<Accion> getAccionesPorIdCausa(int idCausa);

    public List<Accion> findAll();

    public Accion save(Accion accion);

    public Accion findById(int id);

    public void deleteByIdAccion(Integer id);

    public Integer countAccionesPorProceso(Integer idProceso);

    public Integer countAccionesPorPlan(String idPlan);

    public Integer countAccionesActivas();
}
