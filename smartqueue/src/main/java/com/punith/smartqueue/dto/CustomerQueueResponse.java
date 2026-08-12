package com.punith.smartqueue.dto;

import com.punith.smartqueue.entity.CustomerStatus;

public class CustomerQueueResponse {

    private Integer tokenNumber;
    private String name;
    private String serviceType;
    private CustomerStatus status;
    private Integer queuePosition;

    public CustomerQueueResponse(
            Integer tokenNumber,
            String name,
            String serviceType,
            CustomerStatus status,
            Integer queuePosition) {

        this.tokenNumber = tokenNumber;
        this.name = name;
        this.serviceType = serviceType;
        this.status = status;
        this.queuePosition = queuePosition;
    }

    public Integer getTokenNumber() {
        return tokenNumber;
    }

    public String getName() {
        return name;
    }

    public String getServiceType() {
        return serviceType;
    }

    public CustomerStatus getStatus() {
        return status;
    }

    public Integer getQueuePosition() {
        return queuePosition;
    }
}