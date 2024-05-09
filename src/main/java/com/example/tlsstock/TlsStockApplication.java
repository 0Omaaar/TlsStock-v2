package com.example.tlsstock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication @EnableJpaAuditing
public class TlsStockApplication {

    public static void main(String[] args) {
        SpringApplication.run(TlsStockApplication.class, args);
    }

}
