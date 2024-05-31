package com.example.tlsstock.dtos;

import lombok.Data;

@Data
public class DashboardDto {

    private Long totalOrders;
    private Long totalShippedOrders;
    private Long totalPreparationOrders;
    private Long totalReturnedOrders;
    private Long totalArticles;
    private Long totalClients;


}
