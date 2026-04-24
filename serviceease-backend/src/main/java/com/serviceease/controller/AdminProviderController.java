package com.serviceease.controller;

import com.serviceease.dto.ProviderApprovalResponseDTO;
import com.serviceease.dto.RejectProviderRequestDTO;
import com.serviceease.service.AdminProviderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/providers")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProviderController {
    private final AdminProviderService adminProviderService;

    public AdminProviderController(AdminProviderService adminProviderService) {
        this.adminProviderService = adminProviderService;
    }

    //postman approved
    @GetMapping("/pending")
    public ResponseEntity<List<ProviderApprovalResponseDTO>> getPendingProviders(){
        return ResponseEntity.ok(adminProviderService.getPendingProviders());
    }

    //postman checked
    @PutMapping("/{providerId}/approve")
    public ResponseEntity<Void> approveProvider(@PathVariable Long providerId) {
        adminProviderService.approveProvider(providerId);
        return ResponseEntity.ok().build();
    }

    //pending 1
    @PutMapping("/{providerId}/reject")
    public ResponseEntity<Void> rejectProvider(
            @PathVariable Long providerId,
            @RequestBody RejectProviderRequestDTO request
    ) {
        adminProviderService.rejectProvider(providerId, request.getReason());
        return ResponseEntity.ok().build();
    }
}
