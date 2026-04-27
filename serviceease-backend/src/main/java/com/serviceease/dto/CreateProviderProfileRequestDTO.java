package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Request payload to create or update a provider profile")
public class CreateProviderProfileRequestDTO {
    @Schema(description = "Provider biography or profile summary", example = "Experienced electrician with 10+ years")
    @NotBlank(message = "Provider bio is required")
    private String bio;

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
