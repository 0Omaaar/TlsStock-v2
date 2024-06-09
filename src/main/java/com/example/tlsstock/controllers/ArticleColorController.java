package com.example.tlsstock.controllers;


import com.example.tlsstock.dtos.ArticleColorDto;
import com.example.tlsstock.services.articleColor.ArticleColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ArticleColorController {

    @Autowired
    private ArticleColorService articleColorService;

    @GetMapping("/articleColor/{id}")
    public ResponseEntity<?> getArticleColors(@PathVariable Long id){
        ArticleColorDto articleColorDto = articleColorService.getArticleColors(id);
        if(articleColorDto != null){
            return ResponseEntity.ok(articleColorDto);
        }
        return ResponseEntity.notFound().build();
    }

}
