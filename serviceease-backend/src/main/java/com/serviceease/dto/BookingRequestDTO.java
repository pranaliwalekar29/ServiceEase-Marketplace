package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Schema(description = "Booking request payload")
public class BookingRequestDTO {
    @Schema(description = "ID of the service being booked", example = "1")
    @NotNull(message = "Service ID is required")
    @Positive(message = "Service ID must be positive")
    private Long serviceId;

    @Schema(description = "Desired booking date", example = "2026-05-10")
    @NotNull(message = "Booking date is required")
    @FutureOrPresent(message = "Booking date cannot be in the past")
    private LocalDate date;

}
