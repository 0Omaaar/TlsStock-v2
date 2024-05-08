package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.Instant;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class OrderClient extends AbstractClass{

    private String code;

    private Instant OrderDate;

    @ManyToOne
    private Client client;

    @OneToMany
    private List<ClientOrderLine> clientOrderLines;
}
