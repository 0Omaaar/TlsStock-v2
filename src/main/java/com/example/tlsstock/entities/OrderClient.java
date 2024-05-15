package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class OrderClient extends AbstractClass{

    private String code;

    private Instant orderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @ManyToOne
    private Client client;

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<ClientOrderLine> clientOrderLines;

    public OrderClientDto getDto(){
        OrderClientDto orderClientDto = new OrderClientDto();
        orderClientDto.setId(getId());
        orderClientDto.setCode(code);
        orderClientDto.setOrderDate(orderDate);
        orderClientDto.setClientId(client.getId());
        orderClientDto.setClientName(client.getName());
        if(clientOrderLines != null){
            orderClientDto.setClientOrderLines(clientOrderLines.stream()
                    .map(ClientOrderLine::getDto).collect(Collectors.toList()));
        }
        return orderClientDto;
    }
}
