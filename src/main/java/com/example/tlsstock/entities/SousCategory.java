package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.SousCategoryDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class SousCategory extends AbstractClass{

    private String name;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @ToString.Exclude
    private Category category;

    @OneToMany(mappedBy = "sousCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Article> articles;

    public SousCategoryDto getDto(){
        SousCategoryDto sousCategoryDto = new SousCategoryDto();
        sousCategoryDto.setCategoryId(category.getId());
        sousCategoryDto.setCategoryName(category.getName());
        if(articles != null){
            sousCategoryDto.setArticles(articles.stream().map(Article::getDto).collect(Collectors.toList()));
            sousCategoryDto.setNbArticles(articles.stream().count());
        }
        sousCategoryDto.setName(name);
        sousCategoryDto.setDescription(description);
        sousCategoryDto.setId(getId());

        return sousCategoryDto;
    }
}
