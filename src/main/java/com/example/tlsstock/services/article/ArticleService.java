package com.example.tlsstock.services.article;

import com.example.tlsstock.dtos.ArticleDto;
import com.google.zxing.WriterException;

import java.io.IOException;
import java.util.List;
import java.util.ListIterator;

public interface ArticleService {

    ArticleDto saveArticle(ArticleDto articleDto) throws IOException, WriterException;

    ArticleDto updateArticle(ArticleDto articleDto) throws IOException, WriterException;

    List<ArticleDto> getArticles();

    List<ArticleDto> searchArticlesByKeyword(String keyword);

    ArticleDto getArticle(Long id);

    boolean deleteArticle(ArticleDto articleDto);
}
