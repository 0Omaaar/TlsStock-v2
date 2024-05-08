package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.Instant;
import java.util.List;

@Entity @Data @EqualsAndHashCode(callSuper = true)
public class OrderSupplier extends AbstractClass{

    private String code;

    private Instant OrderDate;

    @ManyToOne
    private Supplier supplier;

    @OneToMany
    private List<SupplierOrderLine> supplierOrderLines;
}
