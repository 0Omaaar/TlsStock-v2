package com.example.tlsstock.services.auth;

import com.example.tlsstock.dtos.SignupRequest;
import com.example.tlsstock.dtos.UserDto;

public interface AuthService {
    public UserDto createUser(SignupRequest signupRequest);

    boolean hasUserWithEmail(String email);
}