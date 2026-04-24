package com.serviceease.repository;

import com.serviceease.entity.Booking;
import com.serviceease.entity.ProviderProfile;
import com.serviceease.entity.User;
import com.serviceease.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByCustomer(User customer);
    List<Booking> findByProvider_user_Id(Long userId);
    List<Booking> findByStatus(BookingStatus status);
}
