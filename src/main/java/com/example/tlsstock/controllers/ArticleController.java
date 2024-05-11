package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.services.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController @RequestMapping("/api")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PostMapping("/article/save")
    public ResponseEntity<?> addArticle(@ModelAttribute ArticleDto articleDto) throws IOException {
        if(articleDto != null){
            ArticleDto savedArticle = articleService.saveArticle(articleDto);
            return ResponseEntity.ok(savedArticle);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
