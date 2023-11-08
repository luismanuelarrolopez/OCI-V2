package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import co.edu.unicauca.oci.backend.apirest.models.Hallazgo;

public interface IHallazgoService {

	public List<Hallazgo> getHallazgosPorIdPlan(String idPlan);
	public List<Hallazgo> findAll();
	public Hallazgo save(Hallazgo hallazgo);
	public Hallazgo findById(Integer idHallazgo);
    public Integer contarHallazgos(int idPlan);
    public void deleteByIdHallazgo(Integer id);
	public List<Integer> findHallazgosPorProceso(int idProceso);
	public List<Integer> findHallazgosActivos();

}
