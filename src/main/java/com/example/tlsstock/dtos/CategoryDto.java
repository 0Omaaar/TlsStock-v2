package com.example.tlsstock.dtos;

import com.example.tlsstock.entities.Article;
import lombok.Data;

import java.util.List;

@Data
public class CategoryDto {

    private Long id;

    private String name;

    private String description;

    private List<Article> articles;
}
