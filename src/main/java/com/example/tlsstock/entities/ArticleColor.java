package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.ArticleColorDto;
import jakarta.persistence.*;
import lombok.Data;

@Data @Entity
public class ArticleColor {

    @Id @GeneratedValue
    private Long id;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] image;

    @ManyToOne @JoinColumn(nullable = false)
    private Article article;

    private String color;

    private Long quantity;

    public ArticleColorDto getDto(){
        ArticleColorDto dto = new ArticleColorDto();
        dto.setId(id);
        dto.setArticleId(article.getId());
        dto.setColor(color);
        dto.setArticleName(article.getName());
        dto.setQuantity(quantity);
        dto.setImage(image);

        return dto;
    }
}
