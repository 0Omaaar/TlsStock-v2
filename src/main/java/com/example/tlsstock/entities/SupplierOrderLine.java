package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity @Data @EqualsAndHashCode(callSuper = true)
public class SupplierOrderLine extends AbstractClass{

    @ManyToOne
    private Article article;

    private Long quantity;

    @ManyToOne
    private OrderSupplier orderSupplier;
}
