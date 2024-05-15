package com.example.tlsstock.dtos;

import com.example.tlsstock.entities.ClientOrderLine;
import com.example.tlsstock.enums.OrderStatus;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class OrderClientDto {

    private Long id;

    private String code;

    private Instant orderDate;

    private OrderStatus orderStatus;

    private Long clientId;

    private String clientName;

    private List<ClientOrderLineDto> clientOrderLines;

}
