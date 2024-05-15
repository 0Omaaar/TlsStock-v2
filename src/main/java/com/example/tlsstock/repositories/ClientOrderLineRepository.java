package com.example.tlsstock.repositories;

import com.example.tlsstock.entities.ClientOrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientOrderLineRepository extends JpaRepository<ClientOrderLine, Long> {
}
