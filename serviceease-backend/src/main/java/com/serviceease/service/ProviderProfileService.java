package com.serviceease.service;

import com.serviceease.dto.CreateProviderProfileRequestDTO;
import com.serviceease.dto.ProviderProfileResponseDTO;
import com.serviceease.entity.User;

public interface ProviderProfileService {

    ProviderProfileResponseDTO createProfile(
            CreateProviderProfileRequestDTO request,
            User providerUser
    );

    ProviderProfileResponseDTO getMyProfile(User providerUser);
}