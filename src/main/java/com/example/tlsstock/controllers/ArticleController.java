package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.entities.Article;
import com.example.tlsstock.entities.ClientOrderLine;
import com.example.tlsstock.entities.OrderClient;
import com.example.tlsstock.repositories.OrderClientRepository;
import com.example.tlsstock.services.article.ArticleService;
import com.google.zxing.WriterException;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController @RequestMapping("/api")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private OrderClientRepository orderClientRepository;

    @GetMapping("/articles")
    public ResponseEntity<?> getArticles(){
        List<ArticleDto> articleDtos = articleService.getArticles();
        if(articleDtos != null){
//            System.out.println(articleDtos);
            return ResponseEntity.ok(articleDtos);
        }
//        System.out.println("second");
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/article/{id}/orders")
    public ResponseEntity<?> findOrdersByArticle(@PathVariable Long id){
        List<OrderClient> orderClients = orderClientRepository.findAll();
        ArticleDto article = articleService.getArticle(id);
        List<OrderClientDto> orderClientDtos = new ArrayList<>();

        for(OrderClient orderClient : orderClients){
            for(ClientOrderLine clientOrderLine : orderClient.getClientOrderLines()){
                if(Objects.equals(clientOrderLine.getArticle().getId(), article.getId()) &&
                        !orderClientDtos.contains(orderClient.getDto())){
                    orderClientDtos.add(orderClient.getDto());
                }
            }
        }
        return ResponseEntity.ok(orderClientDtos);
    }

    @GetMapping("/articles/search")
    public ResponseEntity<?> searchArticles(@RequestParam(name = "keyword", defaultValue = "") String keyword){
        List<ArticleDto> articleDtos = articleService.searchArticlesByKeyword(keyword);
        if(articleDtos != null){
            return ResponseEntity.ok(articleDtos);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/article/{id}")
    public ResponseEntity<?> findArticle(@PathVariable Long id){
        ArticleDto articleDto = articleService.getArticle(id);
        if(articleDto != null){
            return ResponseEntity.ok(articleDto);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/article/delete")
    public boolean deleteArticle(@RequestBody ArticleDto articleDto){
        return articleService.deleteArticle(articleDto);
    }

    @PostMapping("/article/save")
    public ResponseEntity<?> addArticle(@ModelAttribute ArticleDto articleDto) throws IOException, WriterException {
        System.out.println(articleDto);
        if(articleDto != null){
            ArticleDto savedArticle = articleService.saveArticle(articleDto);
            return ResponseEntity.ok(savedArticle);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PutMapping("/article/update")
    public ResponseEntity<?> updateArticle(@ModelAttribute ArticleDto articleDto) throws IOException, WriterException {
        if(articleDto != null){
            ArticleDto articleDto1 = articleService.updateArticle(articleDto);
            return ResponseEntity.ok(articleDto1);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/article/upload")
    public ResponseEntity<String> uploadCSVFile(@RequestParam("file") MultipartFile file) {
        articleService.save(file);
        return ResponseEntity.ok("File uploaded and processed successfully");
    }

}
