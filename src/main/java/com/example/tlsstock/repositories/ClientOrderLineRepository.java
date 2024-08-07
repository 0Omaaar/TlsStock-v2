package com.example.tlsstock.repositories;

import com.example.tlsstock.entities.ClientOrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientOrderLineRepository extends JpaRepository<ClientOrderLine, Long> {

    List<ClientOrderLine> findAllByArticleId(Long articleId);
}
