package com.example.tlsstock.services.order;

import com.example.tlsstock.dtos.OrderClientDto;

public interface OrderService {

    OrderClientDto saveOrder(OrderClientDto orderClientDto);
}
