package com.example.tlsstock.repositories;

import com.example.tlsstock.entities.OrderClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderClientRepository extends JpaRepository<OrderClient, Long> {
}
