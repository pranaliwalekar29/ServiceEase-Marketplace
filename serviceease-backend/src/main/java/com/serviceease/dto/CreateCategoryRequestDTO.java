package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Request payload to create a new service category")
public class CreateCategoryRequestDTO {
    @Schema(description = "Category name", example = "Home Services")
    @NotBlank(message = "Category name is required")
    private String name;

    @Schema(description = "Optional category description", example = "Services for home maintenance")
    private String description;

}