package com.example.tlsstock.dtos;

import com.example.tlsstock.entities.ClientOrderLine;
import com.example.tlsstock.repositories.ArticleColorRepository;
import com.example.tlsstock.repositories.ArticleRepository;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class ClientOrderLineConverter {
    public static ClientOrderLine dtoToEntity(ClientOrderLineDto clientOrderLineDto, ArticleRepository articleRepository, ArticleColorRepository articleColorRepository) {
        ClientOrderLine clientOrderLine = new ClientOrderLine();
        clientOrderLine.setId(clientOrderLineDto.getId());
        clientOrderLine.setQuantity(clientOrderLineDto.getQuantity());
        if (clientOrderLineDto.getArticleId() != null) {
            clientOrderLine.setArticle(articleRepository.findById(clientOrderLineDto.getArticleId()).orElse(null));
        }
        if(clientOrderLineDto.getArticleColorId() != null) {
            clientOrderLine.setArticleColor(articleColorRepository.findById(clientOrderLineDto.getArticleColorId()).orElse(null));
        }

        return clientOrderLine;
    }


    public static List<ClientOrderLine> dtoToEntityList(List<ClientOrderLineDto> dtos, ArticleRepository articleRepo, ArticleColorRepository articleColorRepo) {
        return dtos.stream()
                .map(dto -> dtoToEntity(dto, articleRepo, articleColorRepo))
                .collect(Collectors.toList());
    }
}
