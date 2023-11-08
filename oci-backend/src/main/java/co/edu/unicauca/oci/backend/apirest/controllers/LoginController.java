package co.edu.unicauca.oci.backend.apirest.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.oci.backend.apirest.models.Login;
import co.edu.unicauca.oci.backend.apirest.models.User;
import co.edu.unicauca.oci.backend.apirest.services.ILoginService;
import co.edu.unicauca.oci.backend.apirest.services.IUserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private ILoginService serviceLogin;

    @Autowired
    private IUserService serviceUser;

    @GetMapping("/logins")
    public ResponseEntity<?> findAllLogins() {
        return ResponseEntity.ok(this.serviceLogin.findAllLogins());
    }

    @PostMapping("/saveLogin")
    public ResponseEntity<?> saveLogin(@RequestParam("username") String username) {

        User user = this.serviceUser.findByUsername(username);
        Login login = null;
        Login objLogin = new Login();

        Map<String, Object> response = new HashMap<>();

        if (user == null) {
            response.put("mensaje", "Error: no se pudo guardar, el usuario ID: "
                    .concat(username.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        try {

            objLogin.setLoginDate(new Date());
            objLogin.setHistoricalRole(user.getObjRole().getRoleName());
            objLogin.setObjUser(user);
            login = this.serviceLogin.saveLogin(objLogin);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al guardar el login en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El login ha sido guardado con éxito!");
        response.put("login", login);

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @GetMapping("/loginsByDate")
    public ResponseEntity<?> findLoginsByDate(@RequestParam("fechaInicio") Date fechaInicio,
            @RequestParam("fechaFin") Date fechaFin) {

        return ResponseEntity.ok(this.serviceLogin.findLoginsByDate(fechaInicio, fechaFin));
    }

}