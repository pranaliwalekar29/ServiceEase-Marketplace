package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Request payload for rejecting a provider application")
public class RejectProviderRequestDTO {
    @Schema(description = "Reason for rejecting the provider", example = "Incomplete documents")
    @NotBlank(message = "Rejection reason is required")
    private String reason;

}
