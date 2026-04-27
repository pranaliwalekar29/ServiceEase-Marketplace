package com.serviceease.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Standard API error response payload")
public class ApiErrorResponse {
    @Schema(description = "HTTP status code", example = "400")
    private int status;

    @Schema(description = "Error message describing the problem", example = "Validation failed")
    private String message;

    @Schema(description = "Timestamp when the error occurred")
    private LocalDateTime timestamp;

}
