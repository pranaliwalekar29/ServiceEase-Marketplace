package com.serviceease.repository;

import com.serviceease.entity.OfferedServices;
import com.serviceease.entity.ProviderProfile;
import com.serviceease.entity.OfferedServices;
import com.serviceease.entity.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<OfferedServices,Long> {
    List<OfferedServices> findByCategory(ServiceCategory category);
    List<OfferedServices> findByProvider(ProviderProfile provider);
    List<OfferedServices> findByActiveTrue();
}
