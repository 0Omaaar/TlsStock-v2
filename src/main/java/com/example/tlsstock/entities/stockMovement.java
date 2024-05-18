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
public class stockMovement extends AbstractClass{

    @ManyToOne(fetch = FetchType.LAZY)
    private Article Article;

    private Long quantity;
}
