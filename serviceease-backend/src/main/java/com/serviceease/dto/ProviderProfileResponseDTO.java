package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Schema(description = "Response payload for provider profile details")
public class ProviderProfileResponseDTO {

    @Schema(description = "Provider profile identifier", example = "7")
    private Long id;

    @Schema(description = "Provider biography", example = "Experienced home cleaning specialist")
    private String bio;

    @Schema(description = "Whether the provider is approved", example = "true")
    private boolean approved;

    @Schema(description = "Average rating for provider", example = "4.8")
    private BigDecimal averageRating;

    @Schema(description = "Reason for provider rejection, if any")
    private String rejectionReason;

}