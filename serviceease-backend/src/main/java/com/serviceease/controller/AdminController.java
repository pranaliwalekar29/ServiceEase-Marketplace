package com.serviceease.controller;

import com.serviceease.entity.ProviderProfile;
import com.serviceease.entity.User;
import com.serviceease.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    //postman checked
    @GetMapping("/providers")
    public ResponseEntity<List<ProviderProfile>> getAllProviders() {
        return ResponseEntity.ok(adminService.getAllProviders());
    }

    //postman checked
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }
}
