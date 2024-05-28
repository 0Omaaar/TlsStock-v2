package com.example.tlsstock.dtos;

import lombok.Data;

@Data
public class    ClientOrderLineDto {

    private Long id;

    private Long quantity;

    private Long articleId;

    private String articleCode;

    private String articleName;

    private Long orderClientId;
}
