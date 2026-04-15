package com.food.service;

import java.util.List;

import com.food.entity.Notification;
import com.food.entity.Order;
import com.food.entity.Restaurant;
import com.food.entity.User;

public interface NotificationService {
	
	public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);

}