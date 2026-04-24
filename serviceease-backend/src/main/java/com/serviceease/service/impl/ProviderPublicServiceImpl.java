package com.serviceease.service.impl;

import com.serviceease.dto.ProviderPublicProfileDTO;
import com.serviceease.dto.ProviderServiceDTO;
import com.serviceease.entity.OfferedServices;
import com.serviceease.entity.ProviderProfile;
import com.serviceease.exception.ResourceNotFoundException;
import com.serviceease.exception.UnauthorizedActionException;
import com.serviceease.repository.ProviderProfileRepository;
import com.serviceease.repository.ServiceRepository;
import com.serviceease.service.ProviderPublicService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderPublicServiceImpl implements ProviderPublicService {

    private final ProviderProfileRepository providerProfileRepository;
    private final ServiceRepository serviceRepository;

    public ProviderPublicServiceImpl(
            ProviderProfileRepository providerProfileRepository,
            ServiceRepository serviceRepository) {
        this.providerProfileRepository = providerProfileRepository;
        this.serviceRepository = serviceRepository;
    }
    @Override
    public ProviderPublicProfileDTO getProviderPublicProfile(Long providerId) {

        ProviderProfile provider = providerProfileRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider not found"));

        if (!provider.isApproved()) {
            throw new UnauthorizedActionException("Provider not approved");
        }

        List<OfferedServices> services =
                serviceRepository.findByProvider(provider);

        ProviderPublicProfileDTO dto = new ProviderPublicProfileDTO();
        dto.setProviderId(provider.getId());
        dto.setName(provider.getUser().getName());
        dto.setBio(provider.getBio());
        dto.setApproved(provider.isApproved());
        dto.setAverageRating(provider.getAverageRating());

        dto.setServices(
                services.stream().map(s -> {
                    ProviderServiceDTO sd = new ProviderServiceDTO();
                    sd.setServiceId(s.getId());
                    sd.setServiceName(s.getServiceName());
                    sd.setDescription(s.getDescription());
                    sd.setPrice(s.getPrice());
                    sd.setCategoryName(s.getCategory().getName());
                    return sd;
                }).toList()
        );

        return dto;
    }
}