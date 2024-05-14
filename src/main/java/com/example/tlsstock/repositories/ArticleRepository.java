package com.example.tlsstock.repositories;

import com.example.tlsstock.entities.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("SELECT a FROM Article a WHERE a.code LIKE %:keyword% OR a.name LIKE %:keyword%")
    List<Article> findByCodeContainingOrNameContaining(@Param("keyword") String keyword);

    @Query("SELECT a FROM Article a WHERE a.category.id = :id")
    List<Article> findArticlesByCategory(Long id);
}
