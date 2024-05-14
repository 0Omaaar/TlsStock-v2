package com.example.tlsstock.services.category;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.dtos.CategoryDto;
import com.example.tlsstock.entities.Category;

import java.util.List;

public interface CategoryService {

    CategoryDto saveCategory(CategoryDto categoryDto);

    List<CategoryDto> getCategories();

    CategoryDto updateCategory(CategoryDto categoryDto);

    boolean deleteCategory(CategoryDto categoryDto);

    List<CategoryDto> getCategoriesByName(String name);

    List<ArticleDto> getArticlesByCategoryId(Long id);
}
