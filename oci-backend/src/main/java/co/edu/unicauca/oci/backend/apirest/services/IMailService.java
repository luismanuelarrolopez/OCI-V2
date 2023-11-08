package co.edu.unicauca.oci.backend.apirest.services;

public interface IMailService {

    public void sendMailCreate(String to, String names, String role, String username, String password);

    public void sendMailRecoverPassword(String to, String names, String password);

    public void sendMailChangePassword(String to, String names, String password);
}