package com.example.tlsstock.services.articleColor;

import com.example.tlsstock.dtos.ArticleColorDto;
import com.example.tlsstock.entities.ArticleColor;
import com.example.tlsstock.repositories.ArticleColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleColorServiceImpl implements ArticleColorService {

    @Autowired
    private ArticleColorRepository articleColorRepository;

    @Override
    public ArticleColorDto getArticleColors(Long id) {
        ArticleColor articleColor = articleColorRepository.findById(id).orElse(null);
        if(articleColor != null){
            return articleColor.getDto();
        }
        return null;
    }
}
