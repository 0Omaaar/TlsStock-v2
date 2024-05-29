package com.example.tlsstock.dtos;

import com.example.tlsstock.enums.OrderStatus;
import lombok.Data;

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

}
