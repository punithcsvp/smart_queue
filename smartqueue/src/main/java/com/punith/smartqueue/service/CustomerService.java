package com.punith.smartqueue.service;

import com.punith.smartqueue.entity.Customer;
import com.punith.smartqueue.entity.CustomerStatus;
import com.punith.smartqueue.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.punith.smartqueue.dto.DashboardResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Add customer to queue and generate token
    public Customer addCustomer(Customer customer) {

        long count = customerRepository.count();

        customer.setTokenNumber((int) count + 1);
        customer.setQueuePosition((int) count + 1);
        customer.setStatus(CustomerStatus.WAITING);

        return customerRepository.save(customer);
    }

    // Get all customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get current waiting queue
    public List<Customer> getQueue() {
        return customerRepository.findByStatus(CustomerStatus.WAITING);
    }

    // Call next customer
    public Customer callNextCustomer() {

        Customer customer = customerRepository
                .findFirstByStatusOrderByTokenNumberAsc(CustomerStatus.WAITING)
                .orElseThrow(() -> new RuntimeException("Queue is empty"));

        customer.setStatus(CustomerStatus.SERVING);

        return customerRepository.save(customer);
    }
    // Complete customer service
    public Customer completeService(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setStatus(CustomerStatus.COMPLETED);
        customer.setQueuePosition(0);

        Customer updatedCustomer = customerRepository.save(customer);

        updateQueuePositions();

        return updatedCustomer;
    }
    // Cancel customer
    public Customer cancelCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setStatus(CustomerStatus.CANCELLED);
        customer.setQueuePosition(0);

        Customer updatedCustomer = customerRepository.save(customer);

        updateQueuePositions();

        return updatedCustomer;
    }
    // Get customer by token number
    public Customer getCustomerByToken(Integer token) {

        return customerRepository.findByTokenNumber(token)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
    // Update queue positions of all waiting customers
    private void updateQueuePositions() {

        List<Customer> waitingCustomers =
                customerRepository.findByStatusOrderByTokenNumberAsc(CustomerStatus.WAITING);

        int position = 1;

        for (Customer customer : waitingCustomers) {
            customer.setQueuePosition(position);
            customerRepository.save(customer);
            position++;
        }
    }
    // Dashboard Statistics
    public DashboardResponse getDashboardStats() {

        long total = customerRepository.count();

        long waiting = customerRepository.countByStatus(CustomerStatus.WAITING);

        long serving = customerRepository.countByStatus(CustomerStatus.SERVING);

        long completed = customerRepository.countByStatus(CustomerStatus.COMPLETED);

        long cancelled = customerRepository.countByStatus(CustomerStatus.CANCELLED);

        return new DashboardResponse(
                total,
                waiting,
                serving,
                completed,
                cancelled
        );
    }
    // Search customers by name
    public List<Customer> searchByName(String name) {
        return customerRepository.findByNameContainingIgnoreCase(name);
    }
    // Get customers by status
    public List<Customer> getCustomersByStatus(CustomerStatus status) {
        return customerRepository.findByStatus(status);
    }

    // Search customer by phone number
    public Customer searchByPhoneNumber(String phoneNumber) {
        return customerRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    // Search customers by service type
    public List<Customer> searchByServiceType(String serviceType) {
        return customerRepository.findByServiceTypeContainingIgnoreCase(serviceType);
    }
    // Get customers with pagination and sorting
    public Page<Customer> getCustomers(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending()
        );

        return customerRepository.findAll(pageable);
    }
    // Update customer details
    public Customer updateCustomer(Long id, Customer updatedCustomer) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setName(updatedCustomer.getName());
        customer.setPhoneNumber(updatedCustomer.getPhoneNumber());
        customer.setServiceType(updatedCustomer.getServiceType());

        return customerRepository.save(customer);
    }
    // Delete customer
    public String deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customerRepository.delete(customer);

        updateQueuePositions();

        return "Customer deleted successfully";
    }
}