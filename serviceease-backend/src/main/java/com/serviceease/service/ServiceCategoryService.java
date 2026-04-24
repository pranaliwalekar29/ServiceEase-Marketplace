package com.serviceease.service;

import com.serviceease.dto.CreateCategoryRequestDTO;
import com.serviceease.entity.ServiceCategory;

import java.util.List;

public interface ServiceCategoryService {

    ServiceCategory create(CreateCategoryRequestDTO request);
    List<ServiceCategory> getActiveCategories();
}
