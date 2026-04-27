package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Booking response payload")
public class BookingResponseDTO {
    @Schema(description = "Booking identifier", example = "10")
    private Long bookingId;

    @Schema(description = "Booked service name", example = "Home Cleaning")
    private String serviceName;

    @Schema(description = "Provider name for the booked service", example = "Anita Patel")
    private String providerName;

    @Schema(description = "Date of the booking", example = "2026-05-10")
    private LocalDate bookingDate;

    @Schema(description = "Current booking status", example = "REQUESTED")
    private String status;

}
