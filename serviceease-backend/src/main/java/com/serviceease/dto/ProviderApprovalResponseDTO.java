package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Response payload for provider approval details")
public class ProviderApprovalResponseDTO {
    @Schema(description = "Provider profile identifier", example = "5")
    private Long providerId;

    @Schema(description = "Associated user identifier", example = "10")
    private Long userId;

    @Schema(description = "Provider full name", example = "Anita Patel")
    private String name;

    @Schema(description = "Provider email address", example = "anita@example.com")
    private String email;

    @Schema(description = "Provider biography or description")
    private String bio;

    @Schema(description = "Provider approval status", example = "true")
    private boolean approved;

    @Schema(description = "Timestamp when the provider profile was created")
    private LocalDateTime createdAt;

    // Nested user object for frontend compatibility
    @Schema(description = "User details for the provider")
    private UserDTO user;

    // Inner DTO for user information
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Schema(description = "User details associated with approved provider")
    public static class UserDTO {
        @Schema(description = "User identifier", example = "10")
        private Long id;

        @Schema(description = "User full name", example = "Anita Patel")
        private String name;

        @Schema(description = "User email address", example = "anita@example.com")
        private String email;

    }
}