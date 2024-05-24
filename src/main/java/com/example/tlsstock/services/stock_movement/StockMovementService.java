package com.example.tlsstock.services.stock_movement;

import com.example.tlsstock.dtos.StockMovementDto;

public interface StockMovementService {

    StockMovementDto correctionStock(StockMovementDto stockMovementDto);
}
