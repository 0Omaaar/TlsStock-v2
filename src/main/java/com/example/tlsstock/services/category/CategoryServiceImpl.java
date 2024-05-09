package com.example.tlsstock.services.category;

import com.example.tlsstock.dtos.CategoryDto;
import com.example.tlsstock.entities.Category;
import com.example.tlsstock.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryDto saveCategory(CategoryDto categoryDto) {

        if(categoryDto.getName() != null && categoryDto.getDescription() != null){
            Category category = new Category();
            category.setName(categoryDto.getName());
            category.setDescription(categoryDto.getDescription());
            return categoryRepository.save(category).getDto();
        }
        return null;
    }

    @Override
    public List<CategoryDto> getCategories() {
        return categoryRepository.findAll().stream().map(Category::getDto).collect(Collectors.toList());
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto) {
        Category category = categoryRepository.findById(categoryDto.getId()).orElse(null);
        if(category != null){
            category.setName(categoryDto.getName());
            category.setDescription(categoryDto.getDescription());

            return categoryRepository.save(category).getDto();
        }
        return null;
    }

    @Override
    public boolean deleteCategory(CategoryDto categoryDto) {
        Category category = categoryRepository.findById(categoryDto.getId()).orElse(null);
        if(category != null){
            categoryRepository.deleteById(categoryDto.getId());
            return true;
        }
        return false;
    }
}