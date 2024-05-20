package com.example.tlsstock.entities;


import com.example.tlsstock.dtos.StockMovementDto;
import com.example.tlsstock.enums.TypeMvtStk;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class StockMovement extends AbstractClass{

    private Instant mvtDate;

    @Enumerated(EnumType.STRING)
    private TypeMvtStk typeMvt;

    @ManyToOne(fetch = FetchType.LAZY)
    private Article article;

    private Long quantity;

    public StockMovementDto getDto(){
        StockMovementDto stockMovementDto = new StockMovementDto();
        stockMovementDto.setId(getId());
        stockMovementDto.setQuantity(quantity);
        stockMovementDto.setArticleId(article.getId());
        stockMovementDto.setArticleName(article.getName());
        stockMovementDto.setTypeMvt(typeMvt);
//        stockMovementDto.setMvtDate(Instant.now());

        return stockMovementDto;
    }
}
