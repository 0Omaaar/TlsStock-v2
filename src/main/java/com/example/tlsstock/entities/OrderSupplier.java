package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class OrderSupplier extends AbstractClass{

    private String code;

    private Instant OrderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private Supplier supplier;

    @OneToMany
    private List<SupplierOrderLine> supplierOrderLines;
}
