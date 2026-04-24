package com.serviceease.repository;

import com.serviceease.entity.Booking;
import com.serviceease.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    Optional<Booking> findByBooking(Booking booking);
}
