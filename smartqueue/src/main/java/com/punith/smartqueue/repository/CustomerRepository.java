package com.punith.smartqueue.repository;

import com.punith.smartqueue.entity.Customer;
import com.punith.smartqueue.entity.CustomerStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByStatus(CustomerStatus status);

    List<Customer> findByStatusOrderByTokenNumberAsc(CustomerStatus status);

    Optional<Customer> findFirstByStatusOrderByTokenNumberAsc(CustomerStatus status);

    Optional<Customer> findByTokenNumber(Integer tokenNumber);

    long countByStatus(CustomerStatus status);

    List<Customer> findByNameContainingIgnoreCase(String name);

    Optional<Customer> findByPhoneNumber(String phoneNumber);

    List<Customer> findByServiceTypeContainingIgnoreCase(String serviceType);
}