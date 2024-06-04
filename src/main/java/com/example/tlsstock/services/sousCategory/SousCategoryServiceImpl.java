package com.example.tlsstock.services.sousCategory;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.dtos.SousCategoryDto;
import com.example.tlsstock.entities.Article;
import com.example.tlsstock.entities.Category;
import com.example.tlsstock.entities.SousCategory;
import com.example.tlsstock.repositories.ArticleRepository;
import com.example.tlsstock.repositories.CategoryRepository;
import com.example.tlsstock.repositories.SousCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SousCategoryServiceImpl implements SousCategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SousCategoryRepository sousCategoryRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public SousCategoryDto saveSousCategory(SousCategoryDto sousCategoryDto) {
        if(sousCategoryDto.getName() != null && sousCategoryDto.getDescription() != null){
            SousCategory sousCategory = new SousCategory();
            sousCategory.setName(sousCategoryDto.getName());
            sousCategory.setDescription(sousCategoryDto.getDescription());
            Category category = categoryRepository.findById(sousCategoryDto.getCategoryId()).orElse(null);
            if(category != null){
                sousCategory.setCategory(category);
            }

            return sousCategoryRepository.save(sousCategory).getDto();
        }
        return null;
    }

    @Override
    public List<SousCategoryDto> getSousCategories() {
        List<SousCategory> sousCategories = sousCategoryRepository.findAll();
        return sousCategories.stream().map(SousCategory::getDto).collect(Collectors.toList());
    }

    @Override
    public SousCategoryDto updateSousCategory(SousCategoryDto sousCategoryDto) {
        return null;
    }

    @Override
    public boolean deleteSousCategory(SousCategoryDto sousCategoryDto) {
        SousCategory sousCategory = sousCategoryRepository.findById(sousCategoryDto.getId()).orElse(null);
        if(sousCategory != null){
            sousCategoryRepository.deleteById(sousCategoryDto.getId());
            return true;
        }
        return false;
    }

    @Override
    public List<ArticleDto> getArticlesBySousCategoryId(Long id) {
        List<Article> articles = articleRepository.findArticlesBySousCategory(id);
        if(articles != null){
            return articles.stream().map(Article::getDto).collect(Collectors.toList());
        }
        return null;
    }
}
