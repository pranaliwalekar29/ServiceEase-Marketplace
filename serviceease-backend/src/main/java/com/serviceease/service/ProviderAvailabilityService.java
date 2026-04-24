package com.serviceease.service;

import com.serviceease.dto.AddAvailabilityRequestDTO;
import com.serviceease.entity.ProviderAvailability;
import com.serviceease.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface ProviderAvailabilityService {
    void addAvailability(User providerUser, AddAvailabilityRequestDTO request);
    List<ProviderAvailability> getAvailability(
            User providerUser,
            LocalDate date
    );
}
