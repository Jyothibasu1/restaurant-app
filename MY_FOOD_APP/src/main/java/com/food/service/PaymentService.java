package com.food.service;

import com.food.entity.Order;
import com.food.entity.PaymentResponse;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws Exception;

}