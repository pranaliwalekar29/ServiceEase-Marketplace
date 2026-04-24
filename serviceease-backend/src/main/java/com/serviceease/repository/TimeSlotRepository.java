package com.serviceease.repository;

import com.serviceease.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TimeSlotRepository extends JpaRepository<TimeSlot,Long> {
    Optional<TimeSlot> findByLabel(String label);
}
