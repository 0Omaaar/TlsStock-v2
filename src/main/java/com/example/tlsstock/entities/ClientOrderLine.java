package com.example.tlsstock.entities;

import com.example.tlsstock.dtos.ClientOrderLineDto;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity @Data @EqualsAndHashCode(callSuper = true)
public class ClientOrderLine extends AbstractClass {

    @ManyToOne
    private Article article;

    private Long quantity;

    @ManyToOne
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
