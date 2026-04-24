package com.serviceease.service.impl;

import com.serviceease.dto.CreateServiceRequestDTO;
import com.serviceease.dto.ServiceResponseDTO;
import com.serviceease.entity.OfferedServices;
import com.serviceease.entity.ProviderProfile;
import com.serviceease.entity.ServiceCategory;
import com.serviceease.entity.User;
import com.serviceease.enums.Role;
import com.serviceease.exception.ResourceNotFoundException;
import com.serviceease.exception.UnauthorizedActionException;
import com.serviceease.mapper.ServiceMapper;
import com.serviceease.repository.ProviderProfileRepository;
import com.serviceease.repository.ServiceCategoryRepository;
import com.serviceease.repository.ServiceRepository;
import com.serviceease.service.OfferedServicesService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class OfferedServiceServiceImpl implements OfferedServicesService {

    private final ServiceRepository serviceRepository;
    private final ProviderProfileRepository providerProfileRepository;
    private final ServiceCategoryRepository categoryRepository;
    private final ServiceMapper serviceMapper;

    public OfferedServiceServiceImpl(
            ServiceRepository serviceRepository,
            ProviderProfileRepository providerProfileRepository,
            ServiceCategoryRepository categoryRepository,
            ServiceMapper serviceMapper
    ) {
        this.serviceRepository = serviceRepository;
        this.providerProfileRepository = providerProfileRepository;
        this.categoryRepository = categoryRepository;
        this.serviceMapper = serviceMapper;
    }

    @Override
    public OfferedServices createService(CreateServiceRequestDTO request, User providerUser) {
        if (providerUser.getRole() != Role.PROVIDER) {
            throw new UnauthorizedActionException("Only providers can create services");
        }

        ProviderProfile providerProfile = providerProfileRepository
                .findByUserId(providerUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Provider profile not found"));

        if (!providerProfile.isApproved()) {
            throw new UnauthorizedActionException("Provider is not approved yet");
        }

        ServiceCategory category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Service category not found"));

        OfferedServices service = new OfferedServices();
        service.setProvider(providerProfile);
        service.setCategory(category);
        service.setServiceName(request.getServiceName());
        service.setDescription(request.getDescription());
        service.setPrice(request.getPrice());
        service.setActive(true);
        service.setCreatedAt(LocalDateTime.now());

        return serviceRepository.save(service);
    }

    @Override
    public List<OfferedServices> getServices(User providerUser) {
        if (providerUser.getRole() != Role.PROVIDER) {
            throw new UnauthorizedActionException("Only providers can view their services");
        }

        ProviderProfile providerProfile = providerProfileRepository
                .findByUserId(providerUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Provider profile not found"));

        return serviceRepository.findByProvider(providerProfile);
    }

    // ✅ FIXED METHOD
    @Override
    public List<ServiceResponseDTO> getActiveServices() {
        return serviceRepository.findByActiveTrue()
                .stream()
                .map(serviceMapper::toResponse)
                .toList();
    }
}
