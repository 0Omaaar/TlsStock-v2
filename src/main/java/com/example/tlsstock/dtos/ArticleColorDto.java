package com.example.tlsstock.dtos;

import lombok.Data;

@Data
public class ArticleColorDto {

    private Long id;

    private String color;

    private Long quantity;

    private Long articleId;

    private String articleName;

    private byte[] image;
}
