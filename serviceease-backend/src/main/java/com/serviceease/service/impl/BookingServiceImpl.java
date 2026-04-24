package com.serviceease.service.impl;

import com.serviceease.entity.*;
import com.serviceease.enums.BookingStatus;
import com.serviceease.enums.Role;
import com.serviceease.exception.ResourceNotFoundException;
import com.serviceease.exception.UnauthorizedActionException;
import com.serviceease.repository.*;
import com.serviceease.service.BookingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.serviceease.dto.BookingResponseDTO;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ServiceRepository serviceRepository;

    private final ProviderProfileRepository providerProfileRepository;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            ServiceRepository serviceRepository,
            ProviderProfileRepository providerProfileRepository) {
        this.bookingRepository = bookingRepository;
        this.serviceRepository = serviceRepository;
        this.providerProfileRepository = providerProfileRepository;
    }

    @Override
    public Booking requestBooking(User customer, Long serviceId, LocalDate date) {
        OfferedServices service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("OfferedService not found"));

        ProviderProfile provider = service.getProvider();


        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setProvider(provider);
        booking.setService(service);
        booking.setBookingDate(date);
        booking.setStatus(BookingStatus.REQUESTED);
        booking.setCreatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    @Override
    public Booking acceptBooking(Long bookingId, User providerUser) {
        // check weather booking exist in the table
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found!!"));

        // verify provider
        if (!booking.getProvider().getUser().getId().equals(providerUser.getId())) {
            throw new UnauthorizedActionException("You are not the assigned provider!!");
        }

        // verify booking status
        if (booking.getStatus() != BookingStatus.REQUESTED) {
            throw new UnauthorizedActionException("Booking cannot be accepted!!");
        }
        // CHANGING STATUS
        booking.setStatus(BookingStatus.ACCEPTED);


        return bookingRepository.save(booking);
    }

    @Override
    public Booking rejectBooking(Long bookingId, User providerUser, String reason) {
        // check weather booking exist in the table
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found!!"));

        // validating provider (only the booked provider can reject)
        if (!booking.getProvider().getUser().getId().equals(providerUser.getId())) {
            throw new UnauthorizedActionException("unauthorized provider");
        }

        if (booking.getStatus() != BookingStatus.REQUESTED) {
            throw new UnauthorizedActionException("Booking cannot be rejected!!");
        }

        // change status
        booking.setStatus(BookingStatus.REJECTED);
        booking.setRejectionReason(reason);
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingsForCustomer(User customer) {
        return bookingRepository.findByCustomer(customer);
    }

    @Override
    public List<Booking> getBookingsForProvider(User providerUser) {
        return bookingRepository.findByProvider_user_Id(providerUser.getId());
    }

    @Override
    public Booking completeBooking(Long bookingId, User providerUser) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (providerUser.getRole() != Role.PROVIDER) {
            throw new UnauthorizedActionException("Only providers can complete bookings");
        }

        if (!booking.getProvider().getUser().getId().equals(providerUser.getId())) {
            throw new UnauthorizedActionException("You are not assigned to this booking");
        }

        if (booking.getStatus() != BookingStatus.ACCEPTED) {
            throw new UnauthorizedActionException("Only accepted bookings can be completed");
        }
        booking.setStatus(BookingStatus.COMPLETED);
        Booking completedBooking = bookingRepository.save(booking);
        return completedBooking;
    }


    @Override
    public Booking cancelBooking(Long bookingId, User customer) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getCustomer().getId().equals(customer.getId())) {
            throw new UnauthorizedActionException("You can cancel only your bookings");
        }

        if (booking.getStatus() != BookingStatus.REQUESTED) {
            throw new UnauthorizedActionException("Only requested bookings can be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }

}
