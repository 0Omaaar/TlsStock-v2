package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.dtos.StockMovementDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
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
    private byte[] qrCodeImage;

    private String qrCodeText;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] image;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @ToString.Exclude
    private Category category;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    private List<StockMovement> stockMovements;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    private List<ClientOrderLine> clientOrderLines;

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
        articleDto.setQrCodeImage(qrCodeImage);
        articleDto.setQrCodeText(qrCodeText);

        if (stockMovements != null) {
            List<StockMovementDto> stockMovementDtos = stockMovements.stream()
                    .map(StockMovement::getDto)
                    .collect(Collectors.toList());
            articleDto.setStockMovements(stockMovementDtos);
        }

        return articleDto;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Article article = (Article) o;
        return getId() != null && Objects.equals(getId(), article.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
