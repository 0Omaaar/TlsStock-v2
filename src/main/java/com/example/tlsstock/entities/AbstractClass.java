package com.example.tlsstock.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.Instant;

@Data @MappedSuperclass @EntityListeners(AuditingEntityListener.class)
public class AbstractClass implements Serializable {

    @Id @GeneratedValue
    private Long id;

    @CreatedDate @JsonIgnore @Column(name = "createdAt", nullable = false)
    private Instant createdAt;

    @LastModifiedDate @JsonIgnore @Column(nullable = false)
    private Instant lastModifiedDate;
}