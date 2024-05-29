package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class OrderClient extends AbstractClass{

    private String code;

    private LocalDate orderDate;

    private LocalDate returnDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    private Client client;

    @OneToMany(mappedBy = "orderClient", cascade = CascadeType.REMOVE)
    private List<ClientOrderLine> clientOrderLines;

    public OrderClientDto getDto(){
        OrderClientDto orderClientDto = new OrderClientDto();
        orderClientDto.setId(getId());
        orderClientDto.setCode(code);
        orderClientDto.setOrderDate(orderDate);
        orderClientDto.setReturnDate(returnDate);
        orderClientDto.setOrderStatus(orderStatus);
        orderClientDto.setClientId(client.getId());
        orderClientDto.setClientName(client.getName());
        orderClientDto.setClientEmail(client.getEmail());
        orderClientDto.setClientPhone(client.getPhone());
        if(clientOrderLines != null){
            orderClientDto.setClientOrderLines(clientOrderLines.stream()
                    .map(ClientOrderLine::getDto).collect(Collectors.toList()));
        }
        return orderClientDto;
    }
}
