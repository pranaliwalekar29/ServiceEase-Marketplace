package com.serviceease.repository;

import com.serviceease.dto.RegisterRequestDTO;
import com.serviceease.dto.RegisterResponseDTO;

public interface AuthService {
    RegisterResponseDTO register(RegisterRequestDTO request);
}
