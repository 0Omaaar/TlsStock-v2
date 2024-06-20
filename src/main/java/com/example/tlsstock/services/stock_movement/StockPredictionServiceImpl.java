package com.example.tlsstock.services.stock_movement;

import com.example.tlsstock.dtos.StockMovementDto;
import com.example.tlsstock.entities.StockMovement;
import com.example.tlsstock.enums.TypeMvtStk;
import com.example.tlsstock.repositories.StockMovementRepository;
import com.example.tlsstock.services.stockPrediction.StockPredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockPredictionServiceImpl implements StockPredictionService {

    @Autowired
    private StockMovementRepository stockMovementRepository;

    @Override
    public double predictRecommendedQuantity(Long articleId) {
        List<StockMovement> stockMovements = stockMovementRepository.findAllByArticleId(articleId);
        if(stockMovements != null){
            List<StockMovementDto> stockMovementDtos = stockMovements.stream().map(StockMovement::getDto).toList();
            int n = stockMovements.size();
            double sum = 0.0;
            for(StockMovementDto movement : stockMovementDtos){
                if(movement.getTypeMvt().equals(TypeMvtStk.SORTIE)){
                    sum -= movement.getQuantity();
                }else if(movement.getTypeMvt().equals(TypeMvtStk.ENTREE)){
                    sum += movement.getQuantity();
                }
            }
            double prediction = sum/n;
            return Math.max(prediction, 1);
        }
        return 0;
    }
}
