package com.serviceease.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class AddAvailabilityRequestDTO {

    @NotNull
    private LocalDate date;

    @NotNull
    private Long serviceId;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
}
