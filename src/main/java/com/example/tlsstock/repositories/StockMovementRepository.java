package com.example.tlsstock.repositories;

import com.example.tlsstock.entities.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {

    List<StockMovement> findAllByArticleId(Long articleId);
}
