package com.serviceease.service;

import com.serviceease.dto.CreateServiceRequestDTO;
import com.serviceease.dto.ServiceResponseDTO;
import com.serviceease.entity.OfferedServices;
import com.serviceease.entity.User;

import java.util.List;

public interface OfferedServicesService {
    OfferedServices createService(CreateServiceRequestDTO request, User providerUser);
    List<OfferedServices> getServices(User providerUser);
    List<ServiceResponseDTO> getActiveServices();
}
