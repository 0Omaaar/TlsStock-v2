package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.dtos.SousCategoryDto;
import com.example.tlsstock.entities.SousCategory;
import com.example.tlsstock.services.sousCategory.SousCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api") @CrossOrigin(origins = "http://localhost:4200")
public class SousCategoryController {

    @Autowired
    private SousCategoryService sousCategoryService;

    @GetMapping("/sousCategories")
    public ResponseEntity<?> getSousCategories(){
        List<SousCategoryDto> sousCategoryDtos = sousCategoryService.getSousCategories();
        if(sousCategoryDtos != null){
            return ResponseEntity.ok(sousCategoryDtos);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/sousCategory/{id}/articles")
    public ResponseEntity<?> getArticlesBySousCategory(@PathVariable Long id){
        List<ArticleDto> articleDtos = sousCategoryService.getArticlesBySousCategoryId(id);
        if(articleDtos != null){
            return ResponseEntity.ok(articleDtos);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/saveSousCategory")
    public ResponseEntity<?> saveSousCategory(@RequestBody SousCategoryDto sousCategoryDto){
        if(sousCategoryDto != null){
            SousCategoryDto savedSousCategory = sousCategoryService.saveSousCategory(sousCategoryDto);
            return ResponseEntity.ok(savedSousCategory);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/deleteSousCategory")
    public boolean deleteSousCategory(@RequestBody SousCategoryDto sousCategoryDto){
        return sousCategoryService.deleteSousCategory(sousCategoryDto);
    }

}
