package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.CategoryDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity @Data
public class Category extends AbstractClass {

    private String name;

    private String description;

    @OneToMany(mappedBy = "category",  orphanRemoval = true, fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Article> articles;

    public CategoryDto getDto(){
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(getId());
        categoryDto.setName(name);
        categoryDto.setDescription(description);
        categoryDto.setArticles(articles);

        return categoryDto;
    }
}
