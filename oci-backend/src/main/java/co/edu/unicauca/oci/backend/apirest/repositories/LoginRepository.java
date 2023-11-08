package co.edu.unicauca.oci.backend.apirest.repositories;

import java.util.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.unicauca.oci.backend.apirest.models.Login;

public interface LoginRepository extends CrudRepository<Login, Integer> {

    @Query("SELECT l from Login l where l.loginDate BETWEEN :fechaInicio AND :fechaFin ")
    public Iterable<Login> filtrateLoginsByDate(Date fechaInicio, Date fechaFin);
    
    @Query(value = "SELECT * from ingresos i order by i.FECHA_INGRESO desc", nativeQuery = true)
    public Iterable<Login> findAllDesc();
}