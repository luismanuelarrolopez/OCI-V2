package co.edu.unicauca.oci.backend.apirest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unicauca.oci.backend.apirest.models.Person;
import co.edu.unicauca.oci.backend.apirest.repositories.PersonRepository;

@Service
public class PersonServiceImpl implements IPersonService {

    @Autowired
    private PersonRepository objRepository;

    @Override
    public Iterable<Person> findAllPersons() {
        return objRepository.findAll();
    }

}