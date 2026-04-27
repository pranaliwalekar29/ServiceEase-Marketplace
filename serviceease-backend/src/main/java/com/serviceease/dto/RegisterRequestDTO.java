package com.serviceease.dto;

import com.serviceease.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Schema(description = "User registration request payload")
@Setter
@Getter
public class RegisterRequestDTO {

    @Schema(description = "Full name of the new user", example = "Priya Sharma")
    @NotBlank
    private String name;

    @Schema(description = "User email for login", example = "user@example.com")
    @Email
    @NotBlank
    private String email;

    @Schema(description = "Password for the new account", example = "P@ssw0rd")
    @NotBlank
    private String password;

    @Schema(description = "Role assigned to the user", example = "CUSTOMER")
    @NotNull
    private Role role;

}
