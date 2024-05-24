package com.example.tlsstock.services.stock_movement;

import com.example.tlsstock.dtos.StockMovementDto;
import com.example.tlsstock.entities.Article;
import com.example.tlsstock.entities.StockMovement;
import com.example.tlsstock.enums.TypeMvtStk;
import com.example.tlsstock.repositories.ArticleRepository;
import com.example.tlsstock.repositories.StockMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class StockMovementServiceImpl implements StockMovementService{

    @Autowired
    private StockMovementRepository stockMovementRepository;

    @Autowired
    private ArticleRepository articleRepository;

    public StockMovementServiceImpl(StockMovementRepository stockMovementRepository) {
        this.stockMovementRepository = stockMovementRepository;
    }

    @Override
    public StockMovementDto correctionStock(StockMovementDto stockMovementDto) {
        if(stockMovementDto != null){
            StockMovement stockMovement = new StockMovement();
            stockMovement.setMvtDate(Instant.now());
            stockMovement.setQuantity(stockMovementDto.getQuantity());
            stockMovement.setTypeMvt(stockMovementDto.getTypeMvt());
            Article article = articleRepository.findById(stockMovementDto.getArticleId()).orElse(null);
            if(article != null){
                stockMovement.setArticle(article);
                if(stockMovementDto.getTypeMvt().equals(TypeMvtStk.CORRECTION_POS)){
                    article.setDispoQuantity(article.getDispoQuantity() + stockMovementDto.getQuantity());
                }
                else if(stockMovementDto.getTypeMvt().equals(TypeMvtStk.CORRECTION_NEG)){
                    article.setDispoQuantity(article.getDispoQuantity() - stockMovementDto.getQuantity());
                }

                articleRepository.save(article);
            }

            return stockMovementRepository.save(stockMovement).getDto();
        }
        return null;
    }
}
