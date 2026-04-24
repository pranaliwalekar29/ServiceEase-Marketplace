package com.serviceease.service.impl;

import com.serviceease.entity.ProviderProfile;
import com.serviceease.entity.User;
import com.serviceease.repository.ProviderProfileRepository;
import com.serviceease.repository.UserRepository;
import com.serviceease.service.AdminService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class AdminServiceImpl implements AdminService {

    private final ProviderProfileRepository providerProfileRepository;
    private final UserRepository userRepository;

    public AdminServiceImpl(ProviderProfileRepository providerProfileRepository, UserRepository userRepository) {
        this.providerProfileRepository = providerProfileRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ProviderProfile> getPendingProviders() {
        return providerProfileRepository.findByApprovedFalse();
    }

    @Override
    public List<ProviderProfile> getAllProviders() {
        return providerProfileRepository.findAll();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
