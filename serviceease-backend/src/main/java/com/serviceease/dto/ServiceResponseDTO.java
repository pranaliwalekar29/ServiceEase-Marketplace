package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@Schema(description = "Response payload for a service listing")
public class ServiceResponseDTO {
    @Schema(description = "Service identifier", example = "12")
    private Long id;

    @Schema(description = "Name of the service", example = "Grocery Delivery")
    private String serviceName;

    @Schema(description = "Description of the service")
    private String description;

    @Schema(description = "Service price", example = "499.99")
    private BigDecimal price;

    @Schema(description = "Provider identifier for the service", example = "7")
    private Long providerId;

    @Schema(description = "Provider name", example = "Asha Singh")
    private String providerName;

    @Schema(description = "Category name for the service", example = "Delivery")
    private String categoryName;

}