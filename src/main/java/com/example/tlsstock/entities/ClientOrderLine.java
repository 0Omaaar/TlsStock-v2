package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.ClientOrderLineDto;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class ClientOrderLine extends AbstractClass {

    @ManyToOne(fetch = FetchType.LAZY)
    private Article article;

    private Long quantity;

    @ManyToOne
//    (fetch = FetchType.LAZY)
    private OrderClient orderClient;

    public ClientOrderLineDto getDto(){
        ClientOrderLineDto clientOrderLineDto = new ClientOrderLineDto();

        clientOrderLineDto.setId(getId());
        clientOrderLineDto.setOrderClientId(orderClient.getId());
        clientOrderLineDto.setQuantity(quantity);
        clientOrderLineDto.setArticleCode(article.getCode());
        clientOrderLineDto.setArticleId(article.getId());
        clientOrderLineDto.setArticleName(article.getName());

        return clientOrderLineDto;
    }
}
