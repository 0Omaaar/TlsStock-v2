package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.CategoryDto;
import com.example.tlsstock.services.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

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

    @PostMapping("/updateCategory")
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
    public ResponseEntity<?> deleteCategory(@RequestBody CategoryDto categoryDto){
        boolean deleted = categoryService.deleteCategory(categoryDto);
        if(deleted){
            return ResponseEntity.ok("Category Deleted Successfully !");
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(){
        List<CategoryDto> categoryDtos = categoryService.getCategories();
        if(categoryDtos != null){
            return ResponseEntity.ok(categoryDtos);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed To Get Categories !");
    }
}
