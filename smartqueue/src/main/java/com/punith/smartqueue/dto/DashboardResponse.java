package com.punith.smartqueue.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private long totalCustomers;
    private long waitingCustomers;
    private long servingCustomers;
    private long completedCustomers;
    private long cancelledCustomers;
}