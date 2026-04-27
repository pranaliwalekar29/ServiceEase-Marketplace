package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Response returned after successful registration")
public class RegisterResponseDTO {
    @Schema(description = "Created user ID", example = "1")
    private Long id;
    @Schema(description = "Created user name")
    private String Name;
    @Schema(description = "Created user email")
    private String email;
    @Schema(description = "Created user role")
    private String role;

}
