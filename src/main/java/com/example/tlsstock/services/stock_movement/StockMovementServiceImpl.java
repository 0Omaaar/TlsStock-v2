package com.example.tlsstock.services.stock_movement;

import com.example.tlsstock.dtos.StockMovementDto;
import com.example.tlsstock.entities.Article;
import com.example.tlsstock.entities.ArticleColor;
import com.example.tlsstock.entities.OrderClient;
import com.example.tlsstock.entities.StockMovement;
import com.example.tlsstock.enums.TypeMvtStk;
import com.example.tlsstock.repositories.ArticleColorRepository;
import com.example.tlsstock.repositories.ArticleRepository;
import com.example.tlsstock.repositories.OrderClientRepository;
import com.example.tlsstock.repositories.StockMovementRepository;
import com.example.tlsstock.services.QRCode.QRCodeGeneratorService;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class StockMovementServiceImpl implements StockMovementService{

    @Autowired
    private StockMovementRepository stockMovementRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private QRCodeGeneratorService qrCodeGeneratorService;

    @Autowired
    private OrderClientRepository orderClientRepository;

    @Autowired
    private ArticleColorRepository articleColorRepository;

    public StockMovementServiceImpl(StockMovementRepository stockMovementRepository,
                                    OrderClientRepository orderClientRepository) {
        this.stockMovementRepository = stockMovementRepository;
        this.orderClientRepository = orderClientRepository;
    }

    @Override
    public StockMovementDto correctionStock(StockMovementDto stockMovementDto) throws IOException, WriterException {
        if(stockMovementDto != null){
            StockMovement stockMovement = new StockMovement();
            stockMovement.setMvtDate(LocalDate.now());
            stockMovement.setQuantity(stockMovementDto.getQuantity());
            stockMovement.setTypeMvt(stockMovementDto.getTypeMvt());
            Article article = articleRepository.findById(stockMovementDto.getArticleId()).orElse(null);
            if(article != null){
                stockMovement.setArticle(article);
                if(stockMovementDto.getTypeMvt().equals(TypeMvtStk.CORRECTION_POS)
                        || stockMovementDto.getTypeMvt().equals(TypeMvtStk.ENTREE)){
                    article.setDispoQuantity(article.getDispoQuantity() + stockMovementDto.getQuantity());

                    if(stockMovementDto.getArticleColorId() != null){
                        ArticleColor articleColor = articleColorRepository.findById(stockMovementDto.getArticleColorId()).orElse(null);
                        if(articleColor != null){
                            articleColor.setDispoQuantity(articleColor.getDispoQuantity() + stockMovementDto.getQuantity());

                            articleColorRepository.save(articleColor);
                        }
                    }
                    // Generate QR code image
                    String qrCodeText = "Code Article: " + article.getCode() + ", Nom: " + article.getName() +
                            ", Quantité Initiale: " + article.getQuantity() + ", Quantité Disponible: " + (article.getDispoQuantity());
                    byte[] qrCodeImage = qrCodeGeneratorService.generateQRCodeImage(qrCodeText, 200, 200);
                    article.setQrCodeImage(qrCodeImage);
                    article.setQrCodeText(qrCodeText);

                }
                else if(stockMovementDto.getTypeMvt().equals(TypeMvtStk.CORRECTION_NEG)){
                    article.setDispoQuantity(article.getDispoQuantity() - stockMovementDto.getQuantity());
                    String qrCodeText = "Code Article: " + article.getCode() + ", Nom: " + article.getName() +
                            ", Quantité Initiale: " + article.getQuantity() + ", Quantité Disponible: " + (article.getDispoQuantity());
                    byte[] qrCodeImage = qrCodeGeneratorService.generateQRCodeImage(qrCodeText, 200, 200);
                    article.setQrCodeImage(qrCodeImage);
                    article.setQrCodeText(qrCodeText);

                }


                articleRepository.save(article);
            }

            return stockMovementRepository.save(stockMovement).getDto();
        }
        return null;
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
