package com.example.tlsstock.services.dashboard;

import com.example.tlsstock.dtos.DashboardDto;
import com.example.tlsstock.entities.OrderClient;
import com.example.tlsstock.enums.OrderStatus;
import com.example.tlsstock.repositories.ArticleRepository;
import com.example.tlsstock.repositories.ClientRepository;
import com.example.tlsstock.repositories.OrderClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private OrderClientRepository orderClientRepository;

    public DashboardDto getData(){
        DashboardDto dashboardDto = new DashboardDto();

        long articlesCount = articleRepository.findAll().size();
        long clientsCount = clientRepository.findAll().size();
        long ordersCount = orderClientRepository.findAll().size();

        long shippedOrdersCount = 0;
        long preparationOrdersCount = 0;
        long returnedOrdersCount = 0;

        List<OrderClient> orderClients = orderClientRepository.findAll();
        for(OrderClient orderClient : orderClients){
            if(orderClient.getOrderStatus().equals(OrderStatus.LIVREE)){
                shippedOrdersCount++;
            }
            else if(orderClient.getOrderStatus().equals(OrderStatus.EN_PREPARATION)){
                preparationOrdersCount++;
            }
            else if(orderClient.getOrderStatus().equals(OrderStatus.RETURNED)){
                returnedOrdersCount++;
            }
        }


        dashboardDto.setTotalArticles(articlesCount);
        dashboardDto.setTotalOrders(ordersCount);
        dashboardDto.setTotalClients(clientsCount);
        dashboardDto.setTotalShippedOrders(shippedOrdersCount);
        dashboardDto.setTotalPreparationOrders(preparationOrdersCount);
        dashboardDto.setTotalReturnedOrders(returnedOrdersCount);

        return dashboardDto;
    }
}
