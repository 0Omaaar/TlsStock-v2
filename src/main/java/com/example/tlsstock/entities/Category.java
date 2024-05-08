package com.example.tlsstock.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity @Data @EqualsAndHashCode(callSuper = true)
public class Category extends AbstractClass {

    private String name;

    private String description;

    @OneToMany(mappedBy = "category")
    private List<Article> articles;
}
