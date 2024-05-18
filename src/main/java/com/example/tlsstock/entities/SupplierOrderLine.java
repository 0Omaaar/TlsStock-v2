package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class SupplierOrderLine extends AbstractClass{

    @ManyToOne(fetch = FetchType.LAZY)
    private Article article;

    private Long quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    private OrderSupplier orderSupplier;
}
