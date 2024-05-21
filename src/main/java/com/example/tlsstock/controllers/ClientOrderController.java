package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.services.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api/")
public class ClientOrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(){
        List<OrderClientDto> orderClientDtos = orderService.getOrders();
//        System.out.println(orderClientDtos);
        if(orderClientDtos != null){
            return ResponseEntity.ok(orderClientDtos);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/order/update/status")
    public ResponseEntity<?> updateOrderStatus(@RequestBody OrderClientDto orderClientDto){
        OrderClientDto orderClientDto1 = orderService.updateStatus(orderClientDto);
        if(orderClientDto1 != null){
            return ResponseEntity.ok(orderClientDto1);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("order/save")
    public ResponseEntity<?> saveOrder(@RequestBody OrderClientDto orderClientDto){
        OrderClientDto savedOrder = orderService.saveOrder(orderClientDto);
        if(savedOrder != null){
            return ResponseEntity.ok(savedOrder);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
