package com.serviceease.service;

import com.serviceease.dto.ProviderApprovalResponseDTO;

import java.util.List;

public interface AdminProviderService {
    List<ProviderApprovalResponseDTO> getPendingProviders();

    void approveProvider(Long providerId);
    void rejectProvider(Long providerProfileId, String reason);
}
