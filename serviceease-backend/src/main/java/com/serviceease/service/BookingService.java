package com.serviceease.service;

import com.serviceease.entity.Booking;
import com.serviceease.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    Booking requestBooking(User customer, Long serviceId, LocalDate date);
    Booking acceptBooking(Long bookingId,User providerUser);
    Booking rejectBooking(Long bookingId,User providerUser,String reason);
    List<Booking> getBookingsForCustomer(User customer);
    List<Booking> getBookingsForProvider(User providerUser);
    Booking completeBooking(Long bookingId, User providerUser);

    Booking cancelBooking(Long bookingId, User customer);

}
