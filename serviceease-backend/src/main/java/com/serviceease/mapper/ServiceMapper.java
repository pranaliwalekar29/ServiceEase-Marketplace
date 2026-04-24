package com.serviceease.mapper;

import com.serviceease.dto.ServiceResponseDTO;
import com.serviceease.entity.OfferedServices;
import org.springframework.stereotype.Component;

@Component
public class ServiceMapper {

    public ServiceResponseDTO toResponse(OfferedServices service) {

        ServiceResponseDTO dto = new ServiceResponseDTO();

        dto.setId(service.getId());
        dto.setServiceName(service.getServiceName());
        dto.setDescription(service.getDescription());
        dto.setPrice(service.getPrice());

        // ✅ Provider details (THIS FIXES YOUR ISSUE)
        dto.setProviderId(service.getProvider().getId());
        dto.setProviderName(service.getProvider().getUser().getName());

        // ✅ Category (safe)
        if (service.getCategory() != null) {
            dto.setCategoryName(service.getCategory().getName());
        }

        return dto;
    }
}
