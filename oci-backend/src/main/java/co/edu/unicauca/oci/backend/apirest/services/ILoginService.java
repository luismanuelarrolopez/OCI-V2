package co.edu.unicauca.oci.backend.apirest.services;

import java.util.Date;

import co.edu.unicauca.oci.backend.apirest.models.Login;

public interface ILoginService {

    public Iterable<Login> findAllLogins();

    public Login saveLogin(Login login);

    public Iterable<Login> findLoginsByDate(Date fechaInicio, Date fechaFin);
}