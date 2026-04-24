package com.serviceease.repository;

import com.serviceease.entity.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProviderProfileRepository extends JpaRepository<ProviderProfile,Long> {

    Optional<ProviderProfile> findByUserId(Long userId);


    Optional<ProviderProfile> findByUserEmail(String email);

    boolean existsByUserId(Long userId);
    List<ProviderProfile> findByApprovedFalse();
}
