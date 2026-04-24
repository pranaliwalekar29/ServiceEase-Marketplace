package com.serviceease.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProviderPublicProfileDTO {

        private Long providerId;
        private String name;
        private String bio;
        private boolean approved;
        private BigDecimal averageRating;

        private List<ProviderServiceDTO> services;

        // getters & setters

        public Long getProviderId() {
            return providerId;
        }

        public void setProviderId(Long providerId) {
            this.providerId = providerId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getBio() {
            return bio;
        }

        public void setBio(String bio) {
            this.bio = bio;
        }

        public boolean isApproved() {
            return approved;
        }

        public void setApproved(boolean approved) {
            this.approved = approved;
        }

        public BigDecimal getAverageRating() {
            return averageRating;
        }

        public void setAverageRating(BigDecimal averageRating) {
            this.averageRating = averageRating;
        }

        public List<ProviderServiceDTO> getServices() {
            return services;
        }

        public void setServices(List<ProviderServiceDTO> services) {
            this.services = services;
        }
    }


