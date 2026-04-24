package com.serviceease.controller;

import com.serviceease.dto.ProviderPublicProfileDTO;
import com.serviceease.service.ProviderPublicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/providers")
public class ProviderPublicController {

    private final ProviderPublicService providerPublicService;

    public ProviderPublicController(ProviderPublicService providerPublicService) {
        this.providerPublicService = providerPublicService;
    }

    @GetMapping("/{providerId}/public")
    public ResponseEntity<ProviderPublicProfileDTO> getProviderProfile(
            @PathVariable Long providerId) {

        return ResponseEntity.ok(
                providerPublicService.getProviderPublicProfile(providerId)
        );
    }
}