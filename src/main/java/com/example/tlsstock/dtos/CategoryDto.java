package com.example.tlsstock.dtos;

import com.example.tlsstock.entities.Article;
import com.example.tlsstock.entities.SousCategory;
import lombok.Data;

import java.util.List;

@Data
public class CategoryDto {

    private Long id;

    private String name;

    private String description;

    private List<SousCategory> sousCategories;

    private Long nbSousCategories;

    private List<Article> articles;

    private Long nbArticles;
}
