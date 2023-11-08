package co.edu.unicauca.oci.backend.apirest.services;

import java.util.List;

import co.edu.unicauca.oci.backend.apirest.models.TipoControl;


public interface ITipoControlService {
	public List<TipoControl> findAllTipoControl();
}
