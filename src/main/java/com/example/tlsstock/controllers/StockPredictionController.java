package com.example.tlsstock.controllers;

import com.example.tlsstock.services.stockPrediction.StockPredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequestMapping("/api/")
public class StockPredictionController {

    @Autowired
    private StockPredictionService stockPredictionService;

    @GetMapping("predict/{articleId}")
    public ResponseEntity<?> predict(@PathVariable Long articleId) {
        return ResponseEntity.ok(stockPredictionService.predictRecommendedQuantity(articleId));
    }
}
