package com.example.tlsstock.dtos;

import com.example.tlsstock.entities.StockMovement;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ArticleDto {

    private Long id;

    private String code;

    private String name;

    private String description;

    private Long quantity;

    private Long dispoQuantity;

    //    @JsonIgnore
    private byte[] byteImage;

    private MultipartFile image;

    private Long categoryId;

    private String categoryName;

    private List<StockMovementDto> stockMovements;
}
