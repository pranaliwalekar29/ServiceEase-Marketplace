package com.serviceease.mapper;

import com.serviceease.dto.BookingResponseDTO;
import com.serviceease.entity.Booking;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookingMapper {
    public BookingResponseDTO toResponse(Booking booking){
        BookingResponseDTO dto=new BookingResponseDTO();
        dto.setBookingId(booking.getId());
        dto.setServiceName(booking.getService().getServiceName());
        dto.setProviderName(booking.getProvider().getUser().getName());
        dto.setBookingDate(booking.getBookingDate());
        dto.setStatus(booking.getStatus().name());
        return dto;
    }

    public List<BookingResponseDTO> toResponseList(List<Booking> bookings) {
        return bookings.stream()
                .map(this::toResponse)
                .toList();
    }

}
