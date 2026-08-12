package com.punith.smartqueue.controller;

import com.punith.smartqueue.dto.CustomerQueueResponse;
import com.punith.smartqueue.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public/queue")
@CrossOrigin("*")
public class PublicQueueController {

    @Autowired
    private CustomerService customerService;

    // Public customer queue status
    @GetMapping("/{token}")
    public CustomerQueueResponse getQueueStatus(
            @PathVariable Integer token) {

        return customerService.getPublicQueueStatus(token);
    }
}