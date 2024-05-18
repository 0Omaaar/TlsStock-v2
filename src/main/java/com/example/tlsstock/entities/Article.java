package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.ArticleDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Article extends AbstractClass{

    private String code;

    private String name;

    private String description;

    private Long quantity;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] image;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    private Category category;

    public ArticleDto getDto(){
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(getId());
        articleDto.setCode(code);
        articleDto.setName(name);
        articleDto.setDescription(description);
        articleDto.setQuantity(quantity);
        articleDto.setByteImage(image);
        articleDto.setCategoryId(category.getId());
        articleDto.setCategoryName(category.getName());

        return articleDto;
    }
}
