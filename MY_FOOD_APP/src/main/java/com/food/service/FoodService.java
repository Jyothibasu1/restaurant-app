package com.food.service;

import java.util.List;

import com.food.entity.Category;
import com.food.entity.Food;
import com.food.entity.Restaurant;
import com.food.request.CreateFoodRequest;

public interface FoodService {

	public Food createFood(CreateFoodRequest req,Category category,
						   Restaurant restaurant) throws Exception;

	void deleteFood(Long foodId) throws Exception;
	
	public List<Food> getRestaurantsFood(Long restaurantId,
			boolean isVegetarian, boolean isNonveg, boolean isSeasonal,String foodCategory) throws Exception;
	
	public List<Food> searchFood(String keyword);
	
	public Food findFoodById(Long foodId) throws Exception;

	public Food updateAvailibilityStatus(Long foodId) throws Exception;
}