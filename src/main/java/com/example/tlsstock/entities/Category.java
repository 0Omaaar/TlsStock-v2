package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.CategoryDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity

public class Category extends AbstractClass {

    private String name;

    private String description;

    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<SousCategory> sousCategories;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Article> articles;

    public CategoryDto getDto(){
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(getId());
        categoryDto.setName(name);
        categoryDto.setDescription(description);
        if(articles != null){
            categoryDto.setArticles(articles);
            categoryDto.setNbArticles(articles.stream().count());
        }
        if(sousCategories != null){
            categoryDto.setSousCategories(sousCategories);
            categoryDto.setNbSousCategories(sousCategories.stream().count());
        }

        return categoryDto;
    }
}
