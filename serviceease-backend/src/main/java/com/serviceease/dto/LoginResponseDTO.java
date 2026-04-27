package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Response returned after successful login")
public class LoginResponseDTO {
    @Schema(description = "User display name")
    private String name;
    @Schema(description = "User email address")
    private String email;
    @Schema(description = "User role")
    private String role;
    @Schema(description = "JWT token for authenticated requests")
    private String token;

}
