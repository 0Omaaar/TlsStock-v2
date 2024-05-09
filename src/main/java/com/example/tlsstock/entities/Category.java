package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.CategoryDto;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity @Data @EqualsAndHashCode(callSuper = true)
public class Category extends AbstractClass {

    private String name;

    private String description;

    @OneToMany(mappedBy = "category")
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
