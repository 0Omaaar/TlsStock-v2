package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.CategoryDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity

public class Category extends AbstractClass {

    private String name;

    private String description;

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

        return categoryDto;
    }
}
