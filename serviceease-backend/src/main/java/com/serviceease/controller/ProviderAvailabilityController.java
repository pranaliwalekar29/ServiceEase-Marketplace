package com.serviceease.controller;

import com.serviceease.dto.AddAvailabilityRequestDTO;
import com.serviceease.entity.ProviderAvailability;
import com.serviceease.entity.User;
import com.serviceease.repository.ProviderAvailabilityRepository;
import com.serviceease.service.ProviderAvailabilityService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class ProviderAvailabilityController {
    private final ProviderAvailabilityService availabilityService;

    public ProviderAvailabilityController(ProviderAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    //postman checked
    @PostMapping
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<Void> addAvailability(
            @Valid @RequestBody AddAvailabilityRequestDTO request,
            @AuthenticationPrincipal User providerUser
            ){
        availabilityService.addAvailability(providerUser,request);
        return ResponseEntity.ok().build();
    }

    //postman checked
    @GetMapping
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<List<ProviderAvailability>> getAvailability(
            @RequestParam LocalDate date,
            @AuthenticationPrincipal User providerUser
            ){
        return ResponseEntity.ok(availabilityService.getAvailability(providerUser,date));
    }
}
