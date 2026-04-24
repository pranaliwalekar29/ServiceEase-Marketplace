package com.serviceease.dto;

import jakarta.validation.constraints.NotBlank;

public class RejectProviderRequestDTO {
    @NotBlank
    private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
