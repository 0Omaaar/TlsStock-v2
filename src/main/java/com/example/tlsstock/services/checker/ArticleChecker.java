package com.example.tlsstock.services.checker;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.services.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ArticleChecker {

    @Autowired
    private EmailService emailService;

    @Async
    public void minArticleQuantityChecker(Long dispoQuantity, ArticleDto articleDto){
        if(dispoQuantity <= articleDto.getMinQuantity()){
            String sujet = "Notification : Article Proche du Seuil de Quantité Minimale";
            String message = "<p>Bonjour,</p>" +
                    "<p>Nous tenons à vous informer qu'un article récemment demandé par une commande client approche de son seuil de quantité minimale.</p>" +
                    "<p>Veuillez prendre les mesures nécessaires pour régler cette situation.</p>" +
                    "<p>Cordialement,</p>";
            emailService.sendSimpleMessage("omar.elkhotri@uit.ac.ma", "Article Arrive A son Quantite Minimale", message);
        }
    }
}
