package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class OrderSupplier extends AbstractClass{

    private String code;

    private LocalDate OrderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private Supplier supplier;

    @OneToMany
    private List<SupplierOrderLine> supplierOrderLines;
}
