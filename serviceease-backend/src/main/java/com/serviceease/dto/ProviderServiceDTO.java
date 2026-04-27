package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@Schema(description = "Service details shown on provider public profile")
public class ProviderServiceDTO {
    @Schema(description = "Service identifier", example = "11")
    private Long serviceId;

    @Schema(description = "Name of the service", example = "AC Repair")
    private String serviceName;

    @Schema(description = "Service description")
    private String description;

    @Schema(description = "Service price", example = "2500.00")
    private BigDecimal price;

    @Schema(description = "Category name for the service", example = "Home Repair")
    private String categoryName;

}