package com.example.tlsstock.services.email;

public interface EmailService {

    void sendSimpleMessage(String to, String subject, String text);

}
