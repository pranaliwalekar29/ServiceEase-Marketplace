package com.serviceease.service;

import com.serviceease.entity.ProviderProfile;
import com.serviceease.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface AdminService {
    List<ProviderProfile> getPendingProviders();
    List<ProviderProfile> getAllProviders();
    List<User> getAllUsers();
}

