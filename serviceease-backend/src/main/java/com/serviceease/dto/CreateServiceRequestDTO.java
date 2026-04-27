package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@Schema(description = "Request payload to create a new service listing")
public class CreateServiceRequestDTO {

    @Schema(description = "ID of the category for this service", example = "2")
    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @Schema(description = "Title of the service", example = "House Cleaning")
    @NotBlank(message = "Service name is required")
    private String serviceName;

    @Schema(description = "Optional description of the service", example = "Full home cleaning including kitchen and bathrooms")
    private String description;

    @Schema(description = "Price of the service", example = "199.99")
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

}