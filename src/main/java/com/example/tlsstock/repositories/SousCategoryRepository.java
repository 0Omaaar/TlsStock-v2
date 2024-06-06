package com.example.tlsstock.repositories;

import com.example.tlsstock.entities.SousCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SousCategoryRepository extends JpaRepository<SousCategory, Long> {

//    boolean deleteById(long sousCategoryId);

    List<SousCategory> findAllByCategoryId(Long categoryId);
}
