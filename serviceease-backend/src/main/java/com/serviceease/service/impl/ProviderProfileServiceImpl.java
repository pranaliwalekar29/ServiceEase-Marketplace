package com.serviceease.service.impl;

import com.serviceease.dto.CreateProviderProfileRequestDTO;
import com.serviceease.dto.ProviderProfileResponseDTO;
import com.serviceease.entity.ProviderProfile;
import com.serviceease.entity.User;
import com.serviceease.enums.Role;
import com.serviceease.exception.ResourceNotFoundException;
import com.serviceease.exception.UnauthorizedActionException;
import com.serviceease.repository.ProviderProfileRepository;
import com.serviceease.service.ProviderProfileService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class ProviderProfileServiceImpl implements ProviderProfileService {
    private final ProviderProfileRepository providerProfileRepository;

    public ProviderProfileServiceImpl(ProviderProfileRepository providerProfileRepository) {
        this.providerProfileRepository = providerProfileRepository;
    }

    @Override
    public ProviderProfileResponseDTO createProfile(CreateProviderProfileRequestDTO request, User providerUser) {
        if (providerUser.getRole() != Role.PROVIDER) {
            throw new UnauthorizedActionException("Only providers can create a profile");
        }

        if (providerProfileRepository.existsByUserId(providerUser.getId())) {
            throw new UnauthorizedActionException("Provider profile already exists");
        }

        ProviderProfile profile = new ProviderProfile();
        profile.setUser(providerUser);
        profile.setBio(request.getBio());
        profile.setApproved(false);
        profile.setAverageRating(BigDecimal.ZERO);
        profile.setCreatedAt(LocalDateTime.now());

        ProviderProfile saved = providerProfileRepository.save(profile);

        return mapToResponse(saved);
    }

    @Override
    public ProviderProfileResponseDTO getMyProfile(User providerUser) {
        ProviderProfile profile = providerProfileRepository
                .findByUserId(providerUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Provider profile not found"));

        return mapToResponse(profile);
    }

    private ProviderProfileResponseDTO mapToResponse(ProviderProfile profile) {
        ProviderProfileResponseDTO dto = new ProviderProfileResponseDTO();
        dto.setId(profile.getId());
        dto.setBio(profile.getBio());
        dto.setApproved(profile.isApproved());
        dto.setAverageRating(profile.getAverageRating());
        dto.setRejectionReason(profile.getRejectionReason());
        return dto;
    }
}
