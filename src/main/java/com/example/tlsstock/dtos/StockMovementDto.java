package com.example.tlsstock.dtos;

import com.example.tlsstock.enums.TypeMvtStk;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;

@Getter @Setter
public class StockMovementDto {

    private Long id;

    private LocalDate mvtDate;

    private Long articleId;

    private String articleName;

    private Long articleColorId;

    private String articleColor;

    private TypeMvtStk typeMvt;

    private Long quantity;

}
