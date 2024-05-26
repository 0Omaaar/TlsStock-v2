package com.example.tlsstock.dtos;

import com.example.tlsstock.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private UserRole userRole;
}