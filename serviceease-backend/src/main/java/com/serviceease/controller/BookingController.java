package com.serviceease.controller;

import com.serviceease.dto.BookingRequestDTO;
import com.serviceease.dto.BookingResponseDTO;
import com.serviceease.entity.Booking;
import com.serviceease.entity.User;
import com.serviceease.mapper.BookingMapper;
import com.serviceease.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final BookingMapper bookingMapper;

    public BookingController(BookingService bookingService,BookingMapper bookingMapper) {
        this.bookingService = bookingService;
        this.bookingMapper=bookingMapper;
    }

    //checked
    //request booking
    @PostMapping("/request")
    public ResponseEntity<BookingResponseDTO> requestBooking(
            @Valid @RequestBody BookingRequestDTO request,
            @AuthenticationPrincipal User customer){
        Booking booking=bookingService.requestBooking(
                customer,
                request.getServiceId(),
                request.getDate());

        return ResponseEntity.status(HttpStatus.CREATED).body(bookingMapper.toResponse(booking));
    }

    //checked
    //accept Booking
    @PutMapping("/{bookingId}/accept")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<BookingResponseDTO> acceptBooking(@PathVariable Long bookingId,  @AuthenticationPrincipal User providerUser){
        Booking booking=bookingService.acceptBooking(bookingId,providerUser);
        return ResponseEntity.ok(bookingMapper.toResponse(booking));
    }

    //checked
    //reject Booking
    @PutMapping("/{bookingId}/reject")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<BookingResponseDTO> rejectBooking(@PathVariable Long bookingId,@RequestParam String reason,@AuthenticationPrincipal User providerUser){
        Booking booking=bookingService.rejectBooking(bookingId,providerUser,reason);
        return ResponseEntity.ok(bookingMapper.toResponse(booking));
    }

    //checked
    //fetch Booking for customers
    @GetMapping("/customer")
    public ResponseEntity<List<BookingResponseDTO>> getCustomerBookings(@AuthenticationPrincipal User customer){
        List<Booking> bookingList=bookingService.getBookingsForCustomer(customer);
        return ResponseEntity.ok(bookingMapper.toResponseList(bookingList));
    }

    //checked
    //fetch Bookings for providers
    @GetMapping("/provider")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<List<BookingResponseDTO>> getProviderBookings
    (@AuthenticationPrincipal User providerUser){
        List<Booking> booking=bookingService.getBookingsForProvider(providerUser);
        return ResponseEntity.ok(bookingMapper.toResponseList(booking));
    }

    //checked
    @PutMapping("/{bookingId}/complete")
    @PreAuthorize("hasRole('PROVIDER')")
    public ResponseEntity<BookingResponseDTO> completeBooking(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal User providerUser) {

        Booking booking = bookingService.completeBooking(bookingId, providerUser);
        return ResponseEntity.ok(bookingMapper.toResponse(booking));
    }

    //checked
    @PutMapping("/{bookingId}/cancel")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<BookingResponseDTO> cancelBooking(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal User customer) {

        Booking booking = bookingService.cancelBooking(bookingId, customer);
        return ResponseEntity.ok(bookingMapper.toResponse(booking));
    }



}
