package com.serviceease.service.impl;

import com.serviceease.dto.RegisterRequestDTO;
import com.serviceease.dto.RegisterResponseDTO;
import com.serviceease.entity.User;
import com.serviceease.repository.AuthService;
import com.serviceease.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public RegisterResponseDTO register(RegisterRequestDTO request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already registered!!");
        }
        User user=new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setCreatedAt(LocalDateTime.now());

        User saved=userRepository.save(user);
        return new RegisterResponseDTO(saved.getId(), saved.getName(), saved.getEmail(),saved.getRole().name());
    }
}
