package com.serviceease.repository;

import com.serviceease.entity.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory,Long> {
    Optional<ServiceCategory> findByName(String name);
    List<ServiceCategory> findByActiveTrue();
}
