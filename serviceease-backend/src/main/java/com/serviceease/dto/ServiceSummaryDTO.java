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
@Schema(description = "Summary view of a service listing")
public class ServiceSummaryDTO {
    @Schema(description = "Service identifier", example = "12")
    private Long serviceId;

    @Schema(description = "Service name", example = "Plumbing")
    private String serviceName;

    @Schema(description = "Service category name", example = "Home Repair")
    private String categoryName;

    @Schema(description = "Service price", example = "1200")
    private Integer price;

    @Schema(description = "Short service description")
    private String description;

}
