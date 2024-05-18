package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Supplier extends AbstractClass{

    private String name;

    private String email;

    private String phone;

    @OneToMany(mappedBy = "supplier")
    private List<OrderSupplier> orderSuppliers;
}
