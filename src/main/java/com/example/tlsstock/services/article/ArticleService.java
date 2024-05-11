package com.example.tlsstock.services.article;

import com.example.tlsstock.dtos.ArticleDto;

import java.io.IOException;

public interface ArticleService {

    ArticleDto saveArticle(ArticleDto articleDto) throws IOException;
}
