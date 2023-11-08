package co.edu.unicauca.oci.backend.apirest.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unicauca.oci.backend.apirest.models.Login;
import co.edu.unicauca.oci.backend.apirest.repositories.LoginRepository;

@Service
public class LoginServiceImpl implements ILoginService {

    @Autowired
    private LoginRepository objRepository;

    @Override
    public Iterable<Login> findAllLogins() {
        return objRepository.findAllDesc();
    }

    @Override
    public Login saveLogin(Login login) {
        return objRepository.save(login);
    }

    @Override
    public Iterable<Login> findLoginsByDate(Date fechaInicio, Date fechaFin) {
        return objRepository.filtrateLoginsByDate(fechaInicio, fechaFin);
    }

}