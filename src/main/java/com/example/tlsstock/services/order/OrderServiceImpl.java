package com.example.tlsstock.services.order;

import com.example.tlsstock.dtos.ClientOrderLineDto;
import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.dtos.StockMovementDto;
import com.example.tlsstock.entities.*;
import com.example.tlsstock.enums.OrderStatus;
import com.example.tlsstock.enums.TypeMvtStk;
import com.example.tlsstock.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private StockMovementRepository stockMovementRepository;

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

                            // implementing stock movement
//                            StockMovementDto stockMovementDto = new StockMovementDto();
//                            stockMovementDto.setMvtDate(Instant.now());
//                            stockMovementDto.setTypeMvt(TypeMvtStk.SORTIE);
//                            stockMovementDto.setArticleName(orderLine.getArticleName());
//                            stockMovementDto.setArticleId(orderLine.getArticleId());
//                            stockMovementDto.setQuantity(orderLine.getQuantity());

//                            saveStockMovement(stockMovementDto);
                        }
                    }
                    return savedOrder.getDto();
                }
            }
        }
        return null;
    }

    @Override
    @Transactional
    public List<OrderClientDto> getOrders() {
        return orderClientRepository.findAllByOrderByLastModifiedDateDesc().stream()
                .map(OrderClient::getDto).collect(Collectors.toList());
    }

    @Override
    public OrderClientDto updateStatus(OrderClientDto orderClientDto) {
        OrderClient orderClient = orderClientRepository.findById(orderClientDto.getId()).orElse(null);
        if(orderClient != null){
            orderClient.setOrderStatus(OrderStatus.LIVREE);
            OrderClient savedOrder = orderClientRepository.save(orderClient);

            //stock movement

            for(ClientOrderLineDto orderLine : orderClientDto.getClientOrderLines()){
                StockMovementDto stockMovementDto = new StockMovementDto();
                stockMovementDto.setMvtDate(Instant.now());
                stockMovementDto.setTypeMvt(TypeMvtStk.SORTIE);
                stockMovementDto.setArticleName(orderLine.getArticleName());
                stockMovementDto.setArticleId(orderLine.getArticleId());
                stockMovementDto.setQuantity(orderLine.getQuantity());

                saveStockMovement(stockMovementDto);
            }

            return savedOrder.getDto();
        }
        return null;
    }


    public void saveStockMovement(StockMovementDto stockMovementDto){
        StockMovement stockMovement = new StockMovement();
        stockMovement.setQuantity(stockMovementDto.getQuantity());
        Article article = articleRepository.findById(stockMovementDto.getArticleId()).orElse(null);
        if(article != null){
            stockMovement.setArticle(article);
            article.setDispoQuantity(article.getDispoQuantity() - stockMovement.getQuantity());
            articleRepository.save(article);
        }
        stockMovement.setTypeMvt(stockMovementDto.getTypeMvt());
        stockMovement.setMvtDate(stockMovementDto.getMvtDate());

        stockMovementRepository.save(stockMovement).getDto();
    }
}