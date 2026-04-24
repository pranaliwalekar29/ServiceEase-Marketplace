package com.serviceease.controller;

import com.serviceease.dto.CreateProviderProfileRequestDTO;
import com.serviceease.dto.ProviderProfileResponseDTO;
import com.serviceease.entity.ProviderProfile;
import com.serviceease.entity.User;
import com.serviceease.repository.ProviderProfileRepository;
import com.serviceease.service.ProviderProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/provider-profile")
@PreAuthorize("hasRole('PROVIDER')")
public class ProviderProfileController {

    private final ProviderProfileService providerProfileService;

    public ProviderProfileController(ProviderProfileService providerProfileService) {
        this.providerProfileService = providerProfileService;
    }


    //postman checked
    @PostMapping
    public ResponseEntity<ProviderProfileResponseDTO> createProfile(
            @Valid @RequestBody CreateProviderProfileRequestDTO request,
            @AuthenticationPrincipal User providerUser
    ) {
        return ResponseEntity.ok(
                providerProfileService.createProfile(request, providerUser)
        );
    }

    //postman checked
    @GetMapping("/me")
    public ResponseEntity<ProviderProfileResponseDTO> getMyProfile(
            @AuthenticationPrincipal User providerUser
    ) {
        return ResponseEntity.ok(
                providerProfileService.getMyProfile(providerUser)
        );
    }


}
