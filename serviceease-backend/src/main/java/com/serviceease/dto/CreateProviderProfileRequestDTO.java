package com.serviceease.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateProviderProfileRequestDTO {
    @NotBlank
    private String bio;

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
