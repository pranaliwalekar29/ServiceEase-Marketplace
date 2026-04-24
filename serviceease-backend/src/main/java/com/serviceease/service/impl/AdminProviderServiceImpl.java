package com.serviceease.service.impl;

import com.serviceease.dto.ProviderApprovalResponseDTO;
import com.serviceease.entity.ProviderProfile;
import com.serviceease.exception.ResourceNotFoundException;
import com.serviceease.repository.ProviderProfileRepository;
import com.serviceease.service.AdminProviderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AdminProviderServiceImpl implements AdminProviderService {

    private final ProviderProfileRepository providerProfileRepository;

    public AdminProviderServiceImpl(ProviderProfileRepository providerProfileRepository) {
        this.providerProfileRepository = providerProfileRepository;
    }

    @Override
    public List<ProviderApprovalResponseDTO> getPendingProviders() {
        return providerProfileRepository.findByApprovedFalse().stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public void approveProvider(Long providerProfileId) {
        ProviderProfile profile = providerProfileRepository
                .findById(providerProfileId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider profile not found"));

        profile.setApproved(true);
        profile.setRejectionReason(null);

        providerProfileRepository.save(profile);
    }

    @Override
    public void rejectProvider(Long providerProfileId, String reason) {
        ProviderProfile profile = providerProfileRepository
                .findById(providerProfileId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider profile not found"));

        profile.setApproved(false);
        profile.setRejectionReason(reason);
        providerProfileRepository.save(profile);
    }

    private ProviderApprovalResponseDTO mapToDto(ProviderProfile profile) {
        ProviderApprovalResponseDTO dto = new ProviderApprovalResponseDTO();
        dto.setProviderId(profile.getId());
        dto.setUserId(profile.getUser().getId());
        dto.setName(profile.getUser().getName());
        dto.setEmail(profile.getUser().getEmail());
        dto.setBio(profile.getBio());
        dto.setApproved(profile.isApproved());
        dto.setCreatedAt(profile.getCreatedAt());

        // Set nested user object for frontend compatibility
        dto.setUser(new ProviderApprovalResponseDTO.UserDTO(
                profile.getUser().getId(),
                profile.getUser().getName(),
                profile.getUser().getEmail()));

        return dto;
    }
}
