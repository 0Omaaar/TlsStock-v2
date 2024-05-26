package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.dtos.StockMovementDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;
import java.util.stream.Collectors;

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

    private Long dispoQuantity;

    private Long minQuantity;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] image;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    private Category category;

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<StockMovement> stockMovements;

    public ArticleDto getDto(){
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(getId());
        articleDto.setCode(code);
        articleDto.setName(name);
        articleDto.setDescription(description);
        articleDto.setQuantity(quantity);
        articleDto.setDispoQuantity(dispoQuantity);
        articleDto.setMinQuantity(minQuantity);
        articleDto.setByteImage(image);
        articleDto.setCategoryId(category.getId());
        articleDto.setCategoryName(category.getName());

        if (stockMovements != null) {
            List<StockMovementDto> stockMovementDtos = stockMovements.stream()
                    .map(StockMovement::getDto)
                    .collect(Collectors.toList());
            articleDto.setStockMovements(stockMovementDtos);
        }

        return articleDto;
    }
}
