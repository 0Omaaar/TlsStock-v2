package com.example.tlsstock.services.sousCategory;


import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.dtos.SousCategoryDto;

import java.util.List;

public interface SousCategoryService {

    SousCategoryDto saveSousCategory(SousCategoryDto sousCategoryDto);

    List<SousCategoryDto> getSousCategories();

    SousCategoryDto updateSousCategory(SousCategoryDto sousCategoryDto);

    boolean deleteSousCategory(SousCategoryDto sousCategoryDto);

    List<ArticleDto> getArticlesBySousCategoryId(Long id);

}
