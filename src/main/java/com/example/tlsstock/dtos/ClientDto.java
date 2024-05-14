package com.example.tlsstock.dtos;

import com.example.tlsstock.entities.OrderClient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor
public class ClientDto {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private List<OrderClient> orderClients;

    private Long nbOrders;
}
