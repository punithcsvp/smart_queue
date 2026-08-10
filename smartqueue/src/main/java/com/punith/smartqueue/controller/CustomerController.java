package com.punith.smartqueue.controller;

import jakarta.validation.Valid;

import com.punith.smartqueue.entity.Customer;
import com.punith.smartqueue.service.CustomerService;
import com.punith.smartqueue.dto.DashboardResponse;
import com.punith.smartqueue.entity.CustomerStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;


    // =========================
    // Add Customer
    // ADMIN only
    // =========================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Customer addCustomer(@Valid @RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }


    // =========================
    // Get All Customers
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }


    // =========================
    // Get Waiting Queue
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/queue")
    public List<Customer> getQueue() {
        return customerService.getQueue();
    }


    // =========================
    // Call Next Customer
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PutMapping("/next")
    public Customer callNextCustomer() {
        return customerService.callNextCustomer();
    }


    // =========================
    // Complete Service
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PutMapping("/{id}/complete")
    public Customer completeService(@PathVariable Long id) {
        return customerService.completeService(id);
    }


    // =========================
    // Cancel Customer
    // ADMIN only
    // =========================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/cancel")
    public Customer cancelCustomer(@PathVariable Long id) {
        return customerService.cancelCustomer(id);
    }


    // =========================
    // Search by Token
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/token/{token}")
    public Customer getCustomerByToken(@PathVariable Integer token) {
        return customerService.getCustomerByToken(token);
    }


    // =========================
    // Dashboard Statistics
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/dashboard")
    public DashboardResponse getDashboardStats() {
        return customerService.getDashboardStats();
    }


    // =========================
    // Search by Name
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/search/name/{name}")
    public List<Customer> searchByName(@PathVariable String name) {
        return customerService.searchByName(name);
    }


    // =========================
    // Search by Phone Number
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/search/phone/{phoneNumber}")
    public Customer searchByPhoneNumber(@PathVariable String phoneNumber) {
        return customerService.searchByPhoneNumber(phoneNumber);
    }


    // =========================
    // Search by Service Type
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/search/service/{serviceType}")
    public List<Customer> searchByServiceType(@PathVariable String serviceType) {
        return customerService.searchByServiceType(serviceType);
    }


    // =========================
    // Get Customers by Status
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/status/{status}")
    public List<Customer> getCustomersByStatus(
            @PathVariable CustomerStatus status) {

        return customerService.getCustomersByStatus(status);
    }


    // =========================
    // Pagination and Sorting
    // ADMIN + STAFF
    // =========================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/page")
    public Page<Customer> getCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "tokenNumber") String sortBy) {

        return customerService.getCustomers(page, size, sortBy);
    }


    // =========================
    // Update Customer
    // ADMIN only
    // =========================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody Customer customer) {

        return customerService.updateCustomer(id, customer);
    }


    // =========================
    // Delete Customer
    // ADMIN only
    // =========================
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {
        return customerService.deleteCustomer(id);
    }
}