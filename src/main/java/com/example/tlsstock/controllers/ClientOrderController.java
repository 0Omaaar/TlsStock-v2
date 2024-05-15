package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.services.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequestMapping("/api/")
public class ClientOrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("order/save")
    public ResponseEntity<?> saveOrder(@RequestBody OrderClientDto orderClientDto){
        OrderClientDto savedOrder = orderService.saveOrder(orderClientDto);
        if(savedOrder != null){
            return ResponseEntity.ok(savedOrder);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
