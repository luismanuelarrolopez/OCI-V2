package co.edu.unicauca.oci.backend.apirest.repositories;

import org.springframework.data.repository.CrudRepository;

import co.edu.unicauca.oci.backend.apirest.models.Person;

public interface PersonRepository extends CrudRepository<Person, Integer> {
}