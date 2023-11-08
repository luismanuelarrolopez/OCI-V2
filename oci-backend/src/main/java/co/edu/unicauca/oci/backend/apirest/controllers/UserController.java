package co.edu.unicauca.oci.backend.apirest.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.models.Evaluacion;
import co.edu.unicauca.oci.backend.apirest.models.User;
import co.edu.unicauca.oci.backend.apirest.services.IMailService;
import co.edu.unicauca.oci.backend.apirest.services.IUserService;
import co.edu.unicauca.oci.backend.apirest.services.IEvaluacionService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private IUserService serviceUser;

    @Autowired
    private IMailService serviceMail;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IEvaluacionService serviceEvaluacion;

    @PostMapping("/saveUser")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result) {

        user.setUserName(user.getObjPerson().getEmail());

        String password = user.getObjPerson().getIdPerson().toString();
        String passwordEncode = this.passwordEncoder.encode(password);

        user.setPassword(passwordEncode);

        Map<String, Object> response = new HashMap<>();

        User objUser;

        if (this.serviceUser.verifyMailExistence(user.getObjPerson().getEmail())) {
            response.put("mensaje", "El correo ya se encuentra registrado");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if (result.hasErrors()) {

            List<String> listaErrores = new ArrayList<>();

            for (FieldError error : result.getFieldErrors()) {
                listaErrores.add("El campo '" + error.getField() + "‘ " + error.getDefaultMessage());
            }

            response.put("errors", listaErrores);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);

        }

        try {
            objUser = this.serviceUser.saveUser(user);

            // enviar correo con la contraseña
            String userMail = objUser.getObjPerson().getEmail();

            this.serviceMail.sendMailCreate(userMail, objUser.getObjPerson().getNames(),
                    objUser.getObjRole().getRoleName(), objUser.getUsername(), password);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la inserción en la base de datos, la identificación ya existe!");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El usuario ha sido creado con éxito!");
        response.put("Usuario", objUser);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

    }

    @GetMapping("/users")
    public ResponseEntity<?> showUsers() {
        return ResponseEntity.ok(this.serviceUser.findAllUsers());

    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Integer id) {

        User user = null;
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<User> o = this.serviceUser.findByIdUser(id);
            if (o.isPresent()) {
                user = o.get();
            }
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (user == null) {
            response.put("mensaje", "El usuario ID: " + id + " no existe en la base de datos!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<User>(user, HttpStatus.OK);

    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> o = this.serviceUser.findByIdUser(id);
        User user = o.get();
        Evaluacion evaluacion = null;
        evaluacion = this.serviceEvaluacion.findByIdPerson(user.getObjPerson().getId());
        if (evaluacion != null) {
            response.put("mensaje", "Error: no se pudo eliminar, el Usuario "
                    .concat(user.getObjPerson().getNames().concat(" se encuentra realizando una evaluación")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_ACCEPTABLE);
        }

        // Evaluacion evaluacion = serviceEvaluacion.findByIdPerson(idPerson);

        try {
            this.serviceUser.deleteByIdUser(id);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el cliente de la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El usuario ha sido eliminado con éxito!");

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable Integer id, BindingResult result) {
        Optional<User> o = this.serviceUser.findByIdUser(id);
        
        //Para saber si el usuario cambio de correo
        Boolean correoDiferentes = false;
        String correoEntrante = user.getObjPerson().getEmail();
        String correoBD = o.get().getUsername();
        if (!correoBD.equals(correoEntrante)) {
        	correoDiferentes = true;
		}


        Map<String, Object> response = new HashMap<>();
        if (!o.isPresent()) {
            response.put("mensaje", "Error: no se pudo editar, el usuario ID: "
                    .concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        User currentUser = new User();
        currentUser = o.get();

        User updateUser = null;

        if (result.hasErrors()) {

            List<String> listaErrores = new ArrayList<>();

            for (FieldError error : result.getFieldErrors()) {
                listaErrores.add("El campo '" + error.getField() + "‘ " + error.getDefaultMessage());
            }

            response.put("errors", listaErrores);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        try {
        	
            currentUser.setUserName(user.getObjPerson().getEmail());
            currentUser.setObjPerson(user.getObjPerson());
            currentUser.setObjRole(user.getObjRole());
            if (correoDiferentes) {
            	String password = user.getObjPerson().getIdPerson().toString();
                String passwordEncode = this.passwordEncoder.encode(password);
                currentUser.setPassword(passwordEncode);
			}
            updateUser = this.serviceUser.saveUser(currentUser);
            
            
            
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al actualizar el usuario");
            response.put("mensajeDuplicacion", e.getMostSpecificCause().getLocalizedMessage());
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        try {
        	if (correoDiferentes) {
        		// enviar correo con la contraseña
                String userMail = user.getObjPerson().getEmail();
                String password = user.getObjPerson().getIdPerson().toString();

                this.serviceMail.sendMailCreate(userMail, user.getObjPerson().getNames(),
                		user.getObjRole().getRoleName(), user.getUsername(), password);
			}
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al enviar el correo con las credenciales a: "+ correoEntrante);
            response.put("mensajeDuplicacion", "''");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

        response.put("mensaje", "El usuario ha sido actualizado con éxito!");
        response.put("user", updateUser);

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @GetMapping("/roles")
    public ResponseEntity<?> getRoles() {
        return ResponseEntity.ok(serviceUser.findAllRoles());
    }

    @PostMapping("/recoverPassword")
    public ResponseEntity<?> recoverPassword(@RequestParam("email") String email) {

        User user = null;
        user = this.serviceUser.findByUsername(email);
        Map<String, Object> response = new HashMap<>();

        if (user == null) {
            response.put("mensaje", "El usuario EMAIL: " + email + " no existe en la base de datos!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        String password = user.getObjPerson().getIdPerson().toString();
        String passwordEncode = this.passwordEncoder.encode(password);

        user.setPassword(passwordEncode);

        try {
            this.serviceUser.saveUser(user);
            this.serviceMail.sendMailRecoverPassword(email, user.getObjPerson().getNames(),
                    user.getObjPerson().getIdPerson().toString());

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage() + "" + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "La contraseña ha sido recuperada con éxito!");

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }

    @PutMapping("/changePassword/{id}")
    public ResponseEntity<?> changePassword(@PathVariable Integer id, @RequestParam("newPassword") String newPassword) {
        Optional<User> o = this.serviceUser.findByIdUser(id);

        Map<String, Object> response = new HashMap<>();
        if (!o.isPresent()) {
            response.put("mensaje", "Error: no se pudo cambiar la contraseña, el usuario ID: "
                    .concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        User currentUser = o.get();

        String password = newPassword;
        String passwordEncode = this.passwordEncoder.encode(password);

        try {

            currentUser.setPassword(passwordEncode);
            this.serviceUser.saveUser(currentUser);
            this.serviceMail.sendMailChangePassword(currentUser.getUsername(), currentUser.getObjPerson().getNames(),
                    newPassword);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al actualizar la contraseña en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "La contraseña ha sido actualizada con éxito!");

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
    
    @GetMapping("/usersRol")
    public ResponseEntity<?> showUsersRol(@RequestParam("rol") String rol) {
        return ResponseEntity.ok(this.serviceUser.findByUserRol(rol));

    }

}