package com.example.tlsstock.dtos;

import com.example.tlsstock.entities.Article;
import com.example.tlsstock.entities.SousCategory;
import lombok.Data;

import java.util.List;

@Data
public class SousCategoryDto {
    private Long id;

    private String name;

    private String description;

    private Long categoryId;

    private String categoryName;

    private List<Article> articles;

    private Long nbArticles;
}
