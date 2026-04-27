package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
@Schema(description = "Public profile data for a provider")
public class ProviderPublicProfileDTO {

    @Schema(description = "Provider identifier", example = "5")
    private Long providerId;

    @Schema(description = "Provider display name", example = "Suresh Kumar")
    private String name;

    @Schema(description = "Provider biography", example = "Plumbing and electrical expert")
    private String bio;

    @Schema(description = "Whether provider is approved for public listing", example = "true")
    private boolean approved;

    @Schema(description = "Average rating of provider", example = "4.5")
    private BigDecimal averageRating;

    @Schema(description = "List of services offered by the provider")
    private List<ProviderServiceDTO> services;

}