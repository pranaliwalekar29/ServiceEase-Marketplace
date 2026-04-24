package com.serviceease.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
@Entity
@Table(
        name = "provider_availability",
        uniqueConstraints = @UniqueConstraint(
                columnNames = { "provider_id", "service_id", "available_date" }
        )
)
public class ProviderAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private ProviderProfile provider;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private OfferedServices service;

    @Column(name = "available_date", nullable = false)
    private LocalDate availableDate;



    // getters & setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProviderProfile getProvider() {
        return provider;
    }

    public void setProvider(ProviderProfile provider) {
        this.provider = provider;
    }

    public OfferedServices getService() {
        return service;
    }

    public void setService(OfferedServices service) {
        this.service = service;
    }

    public LocalDate getAvailableDate() {
        return availableDate;
    }

    public void setAvailableDate(LocalDate availableDate) {
        this.availableDate = availableDate;
    }


}
