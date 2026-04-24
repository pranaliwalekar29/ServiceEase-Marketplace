package com.serviceease.service.impl;

import com.serviceease.dto.AddAvailabilityRequestDTO;
import com.serviceease.entity.*;
import com.serviceease.enums.Role;
import com.serviceease.exception.ResourceNotFoundException;
import com.serviceease.exception.UnauthorizedActionException;
import com.serviceease.repository.ProviderAvailabilityRepository;
import com.serviceease.repository.ProviderProfileRepository;
import com.serviceease.repository.ServiceRepository;
import com.serviceease.repository.TimeSlotRepository;
import com.serviceease.service.ProviderAvailabilityService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ProviderAvailabilityServiceImpl implements ProviderAvailabilityService{
    private final ProviderAvailabilityRepository availabilityRepository;
    private final ProviderProfileRepository providerProfileRepository;
    private final ServiceRepository serviceRepository;


    public ProviderAvailabilityServiceImpl(ProviderAvailabilityRepository availabilityRepository, ProviderProfileRepository providerProfileRepository, TimeSlotRepository timeSlotRepository, ServiceRepository serviceRepository) {
        this.availabilityRepository = availabilityRepository;
        this.providerProfileRepository = providerProfileRepository;
        this.serviceRepository = serviceRepository;
    }
    @Override
    public void addAvailability(User providerUser, AddAvailabilityRequestDTO request) {
        if (providerUser.getRole() != Role.PROVIDER) {
            throw new UnauthorizedActionException("Only providers can add availability");
        }

        ProviderProfile provider =
                providerProfileRepository.findByUserId(providerUser.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Provider profile not found"));

        OfferedServices service =
                serviceRepository.findById(request.getServiceId())
                        .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        boolean exists = availabilityRepository
                .existsByProviderAndServiceAndAvailableDate(
                        provider,
                        service,
                        request.getDate()
                );

        if (exists) {
            throw new IllegalStateException("Availability already set for this date");
        }

        ProviderAvailability availability = new ProviderAvailability();
        availability.setProvider(provider);
        availability.setService(service);
        availability.setAvailableDate(request.getDate());

        availabilityRepository.save(availability);
    }

    @Override
    public List<ProviderAvailability> getAvailability(User providerUser, LocalDate date) {
        if (providerUser.getRole() != Role.PROVIDER) {
            throw new UnauthorizedActionException("Only providers can view availability");
        }

        ProviderProfile provider =
                providerProfileRepository.findByUserId(providerUser.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Provider profile not found"));

        return availabilityRepository.findByProviderAndAvailableDate(provider, date);
    }
}
