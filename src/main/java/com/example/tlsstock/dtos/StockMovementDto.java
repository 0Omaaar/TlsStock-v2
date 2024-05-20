package com.example.tlsstock.dtos;

import com.example.tlsstock.enums.TypeMvtStk;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter @Setter
public class StockMovementDto {

    private Long id;

    private Instant mvtDate;

    private Long articleId;

    private String articleName;

    private TypeMvtStk typeMvt;

    private Long quantity;

}
