package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Schema(description = "Login request payload")
@Getter
@Setter
public class LoginRequestDTO {
    @Schema(description = "Registered user email address", example = "user@example.com")
    @Email
    @NotBlank
    private String email;

    @Schema(description = "User password", example = "P@ssw0rd")
    @NotBlank
    private String password;

}
