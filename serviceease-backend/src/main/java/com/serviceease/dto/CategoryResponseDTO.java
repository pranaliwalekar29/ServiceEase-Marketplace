package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Category response containing category details")
public class CategoryResponseDTO {
    @Schema(description = "Category identifier", example = "5")
    private Long id;

    @Schema(description = "Category name", example = "Home Services")
    private String name;

    @Schema(description = "Category description", example = "Services for home maintenance")
    private String description;

    @Schema(description = "Whether the category is active", example = "true")
    private boolean active;

}
