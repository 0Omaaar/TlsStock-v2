package com.example.tlsstock.dtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ArticleDto {

    private Long id;

    private String code;

    private String name;

    private String description;

    private Long quantity;

    private byte[] byteImage;

    private MultipartFile image;

    private Long categoryId;

    private String categoryName;
}
