package com.example.tlsstock.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity @Data @EqualsAndHashCode(callSuper = true)
public class stockMovement extends AbstractClass{

    @ManyToOne
    private Article Article;

    private Long quantity;
}
