package com.serviceease.service;

import com.serviceease.dto.ProviderPublicProfileDTO;

public interface ProviderPublicService {
    ProviderPublicProfileDTO getProviderPublicProfile(Long providerId);
}
