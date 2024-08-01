package com.example.tlsstock.dtos;

import com.example.tlsstock.entities.Client;
import com.example.tlsstock.entities.OrderClient;
import com.example.tlsstock.enums.OrderStatus;
import com.example.tlsstock.repositories.ClientRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
public class OrderClientDto {

    private Long id;

    private String code;

    private LocalDate orderDate;

    private LocalDate returnDate;

    private OrderStatus orderStatus;

    private Long clientId;

    private String clientName;

    private String clientEmail;

    private String clientPhone;

    private List<ClientOrderLineDto> clientOrderLines;

    private ClientRepository clientRepository;


}
