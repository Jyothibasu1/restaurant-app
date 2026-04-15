package com.food.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.food.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}