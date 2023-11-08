package co.edu.unicauca.oci.backend.apirest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements IMailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendMailCreate(String to, String names, String role, String username, String password) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom("albeiro9712@gmail.com");
        mail.setTo(to);
        mail.setSubject("Credenciales para ingresar al sistema OCI");
        String body = "Estimado usuario: " + names + "\n\nSe le ha registrado con el rol de: " + role
                + "\n\nPara ingresar al sistema utilice los siguientes credenciales:" + "\n\nUsuario = " + username
                + "\nContraseña = " + password
                + "\nEl link para ingresar a la aplicación es https://control-interno-unicauca.netlify.app/";
        mail.setText(body);

        javaMailSender.send(mail);

    }

    @Override
    public void sendMailRecoverPassword(String to, String names, String password) {
        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom("albeiro9712@gmail.com");
        mail.setTo(to);
        mail.setSubject("Recuperación de contraseña OCI");
        String body = "Estimado usuario: " + names + "\n\nSu contraseña para ingresar al sistema es: " + password;
        mail.setText(body);

        javaMailSender.send(mail);

    }

    @Override
    public void sendMailChangePassword(String to, String names, String password) {
        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom("albeiro9712@gmail.com");
        mail.setTo(to);
        mail.setSubject("Cambio de contraseña OCI");
        String body = "Estimado usuario: " + names + "\n\nUsted ha cambiado su contraseña con éxito"
                + "\nNUEVA CONTRASEÑA = " + password;

        mail.setText(body);

        javaMailSender.send(mail);

    }

}