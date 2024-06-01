package com.example.tlsstock.dtos;

import lombok.Data;

import java.util.List;

@Data
public class DashboardDto {

    private Long totalOrders;
    private Long totalShippedOrders;
    private Long totalPreparationOrders;
    private Long totalReturnedOrders;
    private Long totalArticles;
    private Long totalShippedArticles;
    private Long totalPreparationArticles;
    private Long totalClients;
    private List<OrderClientDto> orders;


}
