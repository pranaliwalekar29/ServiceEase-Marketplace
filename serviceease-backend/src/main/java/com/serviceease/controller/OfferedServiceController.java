package com.serviceease.controller;

import com.serviceease.dto.CreateServiceRequestDTO;
import com.serviceease.dto.ServiceResponseDTO;
import com.serviceease.entity.OfferedServices;
import com.serviceease.entity.User;
import com.serviceease.service.OfferedServicesService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class OfferedServiceController {
    private final OfferedServicesService offeredServicesService;

    public OfferedServiceController(OfferedServicesService offeredServicesService) {
        this.offeredServicesService = offeredServicesService;
    }

    //postman checked
    @PostMapping
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<OfferedServices> createService(
            @Valid @RequestBody CreateServiceRequestDTO request,
            @AuthenticationPrincipal User providerUser ){
        return ResponseEntity.ok(offeredServicesService.createService(request,providerUser));
    }

    //postman checked
    @GetMapping("/me")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<List<OfferedServices>> getMyServices
            (@AuthenticationPrincipal User providerUser){
        return ResponseEntity.ok(offeredServicesService.getServices(providerUser));
    }

    //postman checked
    @GetMapping("/active")
    public List<ServiceResponseDTO> getActiveServices() {
        return offeredServicesService.getActiveServices();
    }
}
