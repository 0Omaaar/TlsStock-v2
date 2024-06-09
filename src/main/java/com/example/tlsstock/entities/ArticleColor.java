package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.ArticleColorDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data @Entity
public class ArticleColor {

    @Id @GeneratedValue
    private Long id;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] image;

    @ManyToOne @JoinColumn(nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Article article;

    private String color;

    private Long quantity;

    private Long dispoQuantity;

    public ArticleColorDto getDto(){
        ArticleColorDto dto = new ArticleColorDto();
        dto.setId(id);
        dto.setArticleId(article.getId());
        dto.setColor(color);
        dto.setArticleName(article.getName());
        dto.setQuantity(quantity);
        dto.setDispoQuantity(dispoQuantity);
        dto.setByteImage(image);

        return dto;
    }
}
