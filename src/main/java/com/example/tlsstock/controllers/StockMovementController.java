package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.StockMovementDto;
import com.example.tlsstock.services.stock_movement.StockMovementService;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class StockMovementController {

    @Autowired
    private StockMovementService stockMovementService;

    @PostMapping("/correct-stock")
    public ResponseEntity<?> correctStock(@RequestBody StockMovementDto stockMovementDto) throws IOException, WriterException {
        StockMovementDto stockMovementDto1 = stockMovementService.correctionStock(stockMovementDto);
        if(stockMovementDto1 != null){
            return ResponseEntity.ok(stockMovementDto1);
        }
        return ResponseEntity.badRequest().build();
    }
}
