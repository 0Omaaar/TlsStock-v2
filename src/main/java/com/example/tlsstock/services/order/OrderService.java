package com.example.tlsstock.services.order;

import com.example.tlsstock.dtos.ClientOrderLineDto;
import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.entities.OrderClient;
import com.google.zxing.WriterException;

import java.io.IOException;
import java.util.List;

public interface OrderService {

    OrderClientDto saveOrder(OrderClientDto orderClientDto);

    OrderClientDto updateOrder(OrderClientDto orderClientDto);

    List<OrderClientDto> getOrders();

    OrderClientDto getOrderById(Long id);

    OrderClientDto updateStatus(OrderClientDto orderClientDto) throws IOException, WriterException;

    List<ClientOrderLineDto> getOrderLinesByArticleId(Long id);

    void autoOrderReturn(Long id) throws IOException, WriterException;

    void manualOrderReturn(OrderClientDto orderClientDto);
}
