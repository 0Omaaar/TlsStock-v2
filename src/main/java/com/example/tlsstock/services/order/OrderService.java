package com.example.tlsstock.services.order;

import com.example.tlsstock.dtos.OrderClientDto;

import java.util.List;

public interface OrderService {

    OrderClientDto saveOrder(OrderClientDto orderClientDto);

    OrderClientDto updateOrder(OrderClientDto orderClientDto);

    List<OrderClientDto> getOrders();

    OrderClientDto getOrderById(Long id);

    OrderClientDto updateStatus(OrderClientDto orderClientDto);
}
