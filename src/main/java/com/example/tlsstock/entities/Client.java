package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;


@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Client extends AbstractClass {

    private String name;

    private String email;

    private String phone;

    @OneToMany(mappedBy = "client")
    private List<OrderClient> orderClients;
}
