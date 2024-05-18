package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.ClientDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Client extends AbstractClass {

    private String name;

    private String email;

    private String phone;

    @OneToMany(mappedBy = "client", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<OrderClient> orderClients;


    public ClientDto getDto(){
        ClientDto clientDto = new ClientDto();
        clientDto.setId(getId());
        clientDto.setName(name);
        clientDto.setEmail(email);
        clientDto.setPhone(phone);
        clientDto.setOrderClients(orderClients);
        if(orderClients != null){
            clientDto.setNbOrders(orderClients.stream().count());
        }

        return clientDto;
    }
}
