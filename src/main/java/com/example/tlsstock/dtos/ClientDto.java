package com.example.tlsstock.dtos;

import com.example.tlsstock.entities.OrderClient;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    private List<OrderClient> orderClients;

    private Long nbOrders;
}
