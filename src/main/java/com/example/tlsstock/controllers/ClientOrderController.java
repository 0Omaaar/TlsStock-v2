package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.ClientOrderLineDto;
import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.services.order.OrderService;
import com.google.zxing.WriterException;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController @RequestMapping("/api")
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

    @GetMapping("/order/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id){
        OrderClientDto orderClientDto = orderService.getOrderById(id);
        if(orderClientDto != null){
            return ResponseEntity.ok(orderClientDto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/orderLines/{id}")
    public ResponseEntity<?> getOrderLinesById(@PathVariable Long id){
        List<ClientOrderLineDto> clientOrderLineDtos = orderService.getOrderLinesByArticleId(id);
        if(clientOrderLineDtos != null){
            return ResponseEntity.ok(clientOrderLineDtos);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/order/update/status")
    public ResponseEntity<?> updateOrderStatus(@RequestBody OrderClientDto orderClientDto) throws IOException, WriterException {
        OrderClientDto orderClientDto1 = orderService.updateStatus(orderClientDto);
        if(orderClientDto1 != null){
            return ResponseEntity.ok(orderClientDto1);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/order/save")
    public ResponseEntity<?> saveOrder(@RequestBody OrderClientDto orderClientDto){
        OrderClientDto savedOrder = orderService.saveOrder(orderClientDto);
        if(savedOrder != null){
            return ResponseEntity.ok(savedOrder);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PutMapping("/order/update")
    public ResponseEntity<?> updateOrder(@RequestBody OrderClientDto orderClientDto){
        OrderClientDto updatedOrder = orderService.updateOrder(orderClientDto);
        if(updatedOrder != null){
            return ResponseEntity.ok(updatedOrder);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/return-order-auto/{id}")
    public ResponseEntity<?> returnOrderAuto(@PathVariable Long id){
        try{
            orderService.autoOrderReturn(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/return-order-manual")
    public ResponseEntity<?> returnOrderManual(@RequestBody OrderClientDto orderClientDto){
        try{
            orderService.manualOrderReturn(orderClientDto);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
