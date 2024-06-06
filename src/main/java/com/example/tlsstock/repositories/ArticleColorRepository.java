package com.example.tlsstock.repositories;

import com.example.tlsstock.entities.ArticleColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleColorRepository extends JpaRepository<ArticleColor, Long> {
}
