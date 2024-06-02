package com.example.tlsstock.services.stock_movement;

import com.example.tlsstock.dtos.StockMovementDto;
import com.google.zxing.WriterException;

import java.io.IOException;

public interface StockMovementService {

    StockMovementDto correctionStock(StockMovementDto stockMovementDto) throws IOException, WriterException;
}
