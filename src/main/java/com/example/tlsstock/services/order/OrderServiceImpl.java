package com.example.tlsstock.services.order;

import com.example.tlsstock.dtos.ClientOrderLineDto;
import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.entities.Article;
import com.example.tlsstock.entities.Client;
import com.example.tlsstock.entities.ClientOrderLine;
import com.example.tlsstock.entities.OrderClient;
import com.example.tlsstock.enums.OrderStatus;
import com.example.tlsstock.repositories.ArticleRepository;
import com.example.tlsstock.repositories.ClientOrderLineRepository;
import com.example.tlsstock.repositories.ClientRepository;
import com.example.tlsstock.repositories.OrderClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderClientRepository orderClientRepository;

    @Autowired
    private ClientOrderLineRepository clientOrderLineRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    @Transactional
    public OrderClientDto saveOrder(OrderClientDto orderClientDto) {
        System.out.println(orderClientDto);
        if (orderClientDto == null) {
            throw new IllegalArgumentException("OrderClientDto cannot be null");
        }else{
            // saving the order first
            OrderClient orderClient = new OrderClient();
            orderClient.setCode(orderClientDto.getCode());

            Client client = clientRepository.findById(orderClientDto.getClientId()).orElse(null);
            if(client != null){
                orderClient.setClient(client);
                orderClient.setOrderStatus(OrderStatus.EN_PREPARATION);
                orderClient.setOrderDate(Instant.now());
                OrderClient savedOrder = orderClientRepository.save(orderClient);

                // client order lines impl
                if(orderClientDto.getClientOrderLines() != null){
                    for(ClientOrderLineDto orderLine : orderClientDto.getClientOrderLines()){
                        orderLine.setOrderClientId(savedOrder.getId());

                        ClientOrderLine clientOrderLine = new ClientOrderLine();

                        // finding article to save in order line
                        Article article = articleRepository.findById(orderLine.getArticleId()).orElse(null);
                        if(article != null){
                            clientOrderLine.setArticle(article);
                            clientOrderLine.setQuantity(orderLine.getQuantity());
                            clientOrderLine.setOrderClient(savedOrder);
                            clientOrderLineRepository.save(clientOrderLine);
                        }
                    }
                    return savedOrder.getDto();
                }
            }
        }
        return null;
    }
}