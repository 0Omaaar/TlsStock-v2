package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity @Data @EqualsAndHashCode(callSuper = true)
public class Article extends AbstractClass{

    private String name;

    private String description;

    private Long quantity;

    private String image;

    @ManyToOne
    private Category category;
}
