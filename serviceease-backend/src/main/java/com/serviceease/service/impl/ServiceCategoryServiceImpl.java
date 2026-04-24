package com.serviceease.service.impl;

import com.serviceease.dto.CreateCategoryRequestDTO;
import com.serviceease.entity.ServiceCategory;
import com.serviceease.exception.UnauthorizedActionException;
import com.serviceease.repository.ServiceCategoryRepository;
import com.serviceease.service.ServiceCategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ServiceCategoryServiceImpl implements ServiceCategoryService {
    private final ServiceCategoryRepository repository;

    public ServiceCategoryServiceImpl(ServiceCategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public ServiceCategory create(CreateCategoryRequestDTO request) {
        repository.findByName(request.getName())
                .ifPresent(c -> {
                    throw new UnauthorizedActionException("Category already exists");
                });

        ServiceCategory category = new ServiceCategory();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setActive(true);

        return repository.save(category);
    }

    @Override
    public List<ServiceCategory> getActiveCategories() {
        return repository.findByActiveTrue();
    }
}
