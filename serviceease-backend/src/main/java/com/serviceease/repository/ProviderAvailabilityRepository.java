package com.serviceease.repository;

import com.serviceease.entity.OfferedServices;
import com.serviceease.entity.ProviderAvailability;
import com.serviceease.entity.ProviderProfile;
import com.serviceease.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProviderAvailabilityRepository extends JpaRepository<ProviderAvailability,Long> {
    List<ProviderAvailability> findByProviderAndAvailableDate(ProviderProfile provider, LocalDate date);

    boolean existsByProviderAndServiceAndAvailableDate(
            ProviderProfile provider,
            OfferedServices service,
            LocalDate date
    );
}
