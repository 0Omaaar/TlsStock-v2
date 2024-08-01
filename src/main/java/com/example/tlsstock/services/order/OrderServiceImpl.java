package com.example.tlsstock.services.order;

import com.example.tlsstock.dtos.ClientOrderLineConverter;
import com.example.tlsstock.dtos.ClientOrderLineDto;
import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.dtos.StockMovementDto;
import com.example.tlsstock.entities.*;
import com.example.tlsstock.enums.OrderStatus;
import com.example.tlsstock.enums.TypeMvtStk;
import com.example.tlsstock.repositories.*;
import com.example.tlsstock.services.QRCode.QRCodeGeneratorService;
import com.example.tlsstock.services.checker.ArticleChecker;
import com.example.tlsstock.services.stock_movement.StockMovementService;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.plaf.basic.BasicInternalFrameTitlePane;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
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

    @Autowired
    private StockMovementService stockMovementService;

    @Autowired
    private ArticleChecker articleChecker;

    @Autowired
    private QRCodeGeneratorService qrCodeGeneratorService;

    @Autowired
    private ArticleColorRepository articleColorRepository;


    @Override
    @Transactional
    public OrderClientDto saveOrder(OrderClientDto orderClientDto) {
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
                orderClient.setOrderDate(LocalDate.now());
                orderClient.setReturnDate(orderClientDto.getReturnDate());
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

                            Long dispoQuantity = article.getDispoQuantity() - orderLine.getQuantity();

                            articleChecker.minArticleQuantityChecker(dispoQuantity, article.getDto());

                            if(orderLine.getArticleColorId() != null){
                                ArticleColor articleColor = articleColorRepository.findById(orderLine.getArticleColorId()).orElse(null);
                                clientOrderLine.setArticleColor(articleColor);
                            }
                            clientOrderLineRepository.save(clientOrderLine);
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
    public OrderClientDto updateOrder(OrderClientDto orderClientDto) {
        if (orderClientDto == null) {
            throw new IllegalArgumentException("OrderClientDto cannot be null");
        }else{
            // saving the order first
            OrderClient orderClient = orderClientRepository.findById(orderClientDto.getId()).orElse(null);
            if(orderClient != null){
                orderClient.setCode(orderClientDto.getCode());

                Client client = clientRepository.findById(orderClientDto.getClientId()).orElse(null);
                if(client != null){
                    orderClient.setClient(client);
                    orderClient.setOrderStatus(OrderStatus.EN_PREPARATION);
                    orderClient.setOrderDate(LocalDate.now());
                    OrderClient savedOrder = orderClientRepository.save(orderClient);

                    // clear order lines before adding new ones
                    clientOrderLineRepository.deleteAll(orderClient.getClientOrderLines());

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
    public OrderClientDto getOrderById(Long id) {
        OrderClient orderClient = orderClientRepository.findById(id).orElse(null);
        if(orderClient != null){
            return orderClient.getDto();
        }
        return null;
    }

    @Override
    public OrderClientDto updateStatus(OrderClientDto orderClientDto) throws IOException, WriterException {
        OrderClient orderClient = orderClientRepository.findById(orderClientDto.getId()).orElse(null);
        if(orderClient != null){
            orderClient.setOrderStatus(OrderStatus.LIVREE);
            OrderClient savedOrder = orderClientRepository.save(orderClient);

            //stock movement

            for(ClientOrderLineDto orderLine : orderClientDto.getClientOrderLines()){
                StockMovementDto stockMovementDto = new StockMovementDto();
                stockMovementDto.setMvtDate(LocalDate.now());
                stockMovementDto.setTypeMvt(TypeMvtStk.SORTIE);
                stockMovementDto.setArticleName(orderLine.getArticleName());
                stockMovementDto.setArticleId(orderLine.getArticleId());
                stockMovementDto.setQuantity(orderLine.getQuantity());

                if(orderLine.getArticleColorId() != null && orderLine.getArticleColor() != null){
                    stockMovementDto.setArticleColorId(orderLine.getArticleColorId());
                    stockMovementDto.setArticleColor(orderLine.getArticleColor());
                }

                saveStockMovement(stockMovementDto);
            }

            return savedOrder.getDto();
        }
        return null;
    }

    @Override
    public List<ClientOrderLineDto> getOrderLinesByArticleId(Long id) {
        List<ClientOrderLine> orderLines = clientOrderLineRepository.findAllByArticleId(id);
        if(orderLines != null){
            return orderLines.stream().map(ClientOrderLine::getDto).collect(Collectors.toList());
        }
        return null;
    }


    public void saveStockMovement(StockMovementDto stockMovementDto) throws IOException, WriterException {
        System.out.println("inside function");
        StockMovement stockMovement = new StockMovement();
        stockMovement.setQuantity(stockMovementDto.getQuantity());
        Article article = articleRepository.findById(stockMovementDto.getArticleId()).orElse(null);
        if(article != null){
            System.out.println("Article : " + article);
            stockMovement.setArticle(article);
            article.setDispoQuantity(article.getDispoQuantity() - stockMovement.getQuantity());

            Article savedArticle = generateAndSetQRCode(article);

            if (stockMovementDto.getArticleColorId() != null) {
                ArticleColor articleColor = articleColorRepository.findById(stockMovementDto.getArticleColorId()).orElse(null);
                if(articleColor != null){
                    System.out.println("Article Color : " + articleColor);
                    stockMovement.setArticleColor(articleColor);
                    articleColor.setDispoQuantity(articleColor.getDispoQuantity() - stockMovement.getQuantity());

                    articleColorRepository.save(articleColor);
                }
            }
        }
        stockMovement.setTypeMvt(stockMovementDto.getTypeMvt());
        stockMovement.setMvtDate(stockMovementDto.getMvtDate());

        stockMovementRepository.save(stockMovement).getDto();
    }


//    @Scheduled(cron = "0 */2 * * * *")
//    @Transactional
//    public void checkReturnDate() throws IOException, WriterException {
//        List<OrderClient> orderClients = orderClientRepository.findAll();
//        for(OrderClient orderClient : orderClients){
//            if(Objects.equals(orderClient.getReturnDate(), LocalDate.now())){
//               if(orderClient.getOrderStatus() == OrderStatus.LIVREE ){
//                   orderClient.setOrderStatus(OrderStatus.RETURNED);
//                   makeStockMovementEnter(orderClient);
//                   try {
//                       orderClientRepository.save(orderClient);
//                       System.out.println("Order status updated successfully for order: " + orderClient.getId());
//                   } catch (Exception e) {
//                       System.err.println("Error updating order status for order: " + orderClient.getId());
//                       e.printStackTrace();
//                   }
//               }
//            }
//        }
//    }

    @Override @Transactional
    public void autoOrderReturn(Long id) throws IOException, WriterException {
        OrderClient orderClient = orderClientRepository.findById(id).orElse(null);
        if(orderClient != null && orderClient.getOrderStatus().equals(OrderStatus.LIVREE)
                && Objects.equals(orderClient.getReturnDate(), LocalDate.now())){
            orderClient.setOrderStatus(OrderStatus.RETURNED);
            try{
                makeStockMovementEnter(orderClient);
                orderClientRepository.save(orderClient);

            }catch (Exception e){
                e.printStackTrace();
            }


        }
    }

    @Override @Transactional
    public void manualOrderReturn(OrderClientDto orderClientDto) {
        if(orderClientDto != null){
            try{
                OrderClient orderClient = orderClientRepository.findById(orderClientDto.getId()).orElse(null);
                if(orderClient != null && orderClient.getOrderStatus().equals(OrderStatus.LIVREE)){
                    orderClient.setOrderStatus(OrderStatus.RETURNED);
                    orderClientRepository.save(orderClient);
                    List<ClientOrderLine> clientOrderLines = ClientOrderLineConverter.dtoToEntityList(orderClientDto.getClientOrderLines(), articleRepository, articleColorRepository);
                    orderClient.setClientOrderLines(clientOrderLines);
                    makeStockMovementEnter(orderClient);
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    @Transactional
    public void makeStockMovementEnter(OrderClient orderClient) throws IOException, WriterException {
        for(ClientOrderLine clientOrderLine : orderClient.getClientOrderLines()){
            StockMovementDto stockMovementDto = new StockMovementDto();
            stockMovementDto.setQuantity(clientOrderLine.getQuantity());
            stockMovementDto.setArticleName(clientOrderLine.getArticle().getName());
            stockMovementDto.setTypeMvt(TypeMvtStk.ENTREE);
            stockMovementDto.setMvtDate(LocalDate.now());
            stockMovementDto.setArticleId(clientOrderLine.getArticle().getId());

            if(clientOrderLine.getArticleColor() != null){
                stockMovementDto.setArticleColor(String.valueOf(clientOrderLine.getArticleColor()));
                stockMovementDto.setArticleColorId(clientOrderLine.getArticleColor().getId());
            }

            stockMovementService.correctionStock(stockMovementDto);
        }
    }

    private Article generateAndSetQRCode(Article article) throws IOException, WriterException {
        String qrCodeText = "Code Article: " + article.getCode() + ", Nom: " + article.getName() +
                ", Quantité Initiale: " + article.getQuantity() + ", Quantité Disponible: " + article.getDispoQuantity();
        // Check if QR code already exists
//        if (article.getQrCodeImage() == null) {
        // Generate QR code image for the first time
        byte[] qrCodeImage = qrCodeGeneratorService.generateQRCodeImage(qrCodeText, 200, 200);
        article.setQrCodeText(qrCodeText);

        article.setQrCodeImage(qrCodeImage);
//        } else {
        // Update QR code text without changing the image
//            article.setQrCodeText(qrCodeText);
//        }

        return articleRepository.save(article);
    }
}