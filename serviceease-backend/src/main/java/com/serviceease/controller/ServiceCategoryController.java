package com.serviceease.controller;

import com.serviceease.dto.CreateCategoryRequestDTO;
import com.serviceease.entity.ServiceCategory;
import com.serviceease.service.ServiceCategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Categories")
public class ServiceCategoryController {
    private final ServiceCategoryService service;

    public ServiceCategoryController(ServiceCategoryService service) {
        this.service = service;
    }
    //postman checked
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceCategory> create(
            @Valid @RequestBody CreateCategoryRequestDTO request) {

        return ResponseEntity.ok(service.create(request));
    }

    //postman checked
    @GetMapping("/active")
    public ResponseEntity<List<ServiceCategory>> getActive() {
        return ResponseEntity.ok(service.getActiveCategories());
    }
}
