package com.food.service;

import java.util.List;

import com.food.entity.Order;
import com.food.entity.PaymentResponse;
import com.food.entity.User;
import com.food.request.CreateOrderRequest;

public interface OrderService {
	
	 public PaymentResponse createOrder(CreateOrderRequest order, User user) throws Exception;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws Exception;
	 
	 public void cancelOrder(Long orderId) throws Exception;
	 
	 public List<Order> getUserOrders(Long userId) throws Exception;
	 
	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws Exception;
	 

}