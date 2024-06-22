package com.example.tlsstock.services.stockPrediction;

public interface StockPredictionService {

    double predictRecommendedQuantityByArithmeticAverage(Long articleId);

    double predictRecommendedQuantityByTrainedModel(Long articleId);
}
