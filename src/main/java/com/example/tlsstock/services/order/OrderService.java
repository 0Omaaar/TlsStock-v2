package com.example.tlsstock.services.order;

import com.example.tlsstock.dtos.OrderClientDto;

import java.util.List;

public interface OrderService {

    OrderClientDto saveOrder(OrderClientDto orderClientDto);

    List<OrderClientDto> getOrders();

    OrderClientDto updateStatus(OrderClientDto orderClientDto);
}
