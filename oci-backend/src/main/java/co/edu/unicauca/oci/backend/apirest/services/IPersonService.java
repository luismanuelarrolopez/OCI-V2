package co.edu.unicauca.oci.backend.apirest.services;

import co.edu.unicauca.oci.backend.apirest.models.Person;

public interface IPersonService {

    public Iterable<Person> findAllPersons();

}