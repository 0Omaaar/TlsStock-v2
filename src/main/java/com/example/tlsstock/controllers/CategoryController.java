package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.dtos.CategoryDto;
import com.example.tlsstock.dtos.SousCategoryDto;
import com.example.tlsstock.repositories.CategoryRepository;
import com.example.tlsstock.services.category.CategoryService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api") @CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/saveCategory")
    public ResponseEntity<?> saveCategory(@RequestBody CategoryDto categoryDto){

        if(categoryDto == null || categoryDto.getName() == null || categoryDto.getDescription() == null){
            return ResponseEntity.badRequest().body("Category is Invalid !");
        }

        CategoryDto savedCategory = categoryService.saveCategory(categoryDto);
        if(savedCategory != null){
            return ResponseEntity.ok(savedCategory);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed To Save Category !");
    }

    @PutMapping("/updateCategory")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryDto categoryDto){
        if(categoryDto == null || categoryDto.getName() == null || categoryDto.getDescription() == null){
            return ResponseEntity.badRequest().body("Category is Invalid !");
        }

        CategoryDto updatedCategory = categoryService.updateCategory(categoryDto);
        if(updatedCategory != null){
            return ResponseEntity.ok(updatedCategory);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/deleteCategory")
    public boolean deleteCategory(@RequestBody CategoryDto categoryDto){
        boolean deleted = categoryService.deleteCategory(categoryDto);
        if(deleted){
            return true;
        }
        return false;
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(){
        List<CategoryDto> categoryDtos = categoryService.getCategories();
        if(categoryDtos != null){
            return ResponseEntity.ok(categoryDtos);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed To Get Categories !");
    }

    @GetMapping("/categories/search")
    public ResponseEntity<List<CategoryDto>> getCategoriesByName(@RequestParam(name = "name", defaultValue = "") String name){
        List<CategoryDto> categoryDtos = categoryService.getCategoriesByName(name);
        if(categoryDtos != null){
            return ResponseEntity.ok(categoryDtos);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/categorie/{id}")
    public ResponseEntity<?> getArticlesByCategory(@PathVariable Long id){
        List<ArticleDto> articleDtos = categoryService.getArticlesByCategoryId(id);
        if(!articleDtos.isEmpty()){
            return ResponseEntity.ok(articleDtos);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getCategory(@PathVariable Long id){
        CategoryDto categoryDto = categoryRepository.findById(id).orElse(null).getDto();
        return ResponseEntity.ok(categoryDto);
    }

    @GetMapping("/category/{id}/sousCategories")
    public ResponseEntity<?> getSousCategoriesByCategoryId(@PathVariable Long id){
        List<SousCategoryDto> sousCategoryDtos = categoryService.getSousCategoriesByCategoryId(id);
        if(sousCategoryDtos != null){
            return ResponseEntity.ok(sousCategoryDtos);
        }
        return ResponseEntity.notFound().build();
    }
}
