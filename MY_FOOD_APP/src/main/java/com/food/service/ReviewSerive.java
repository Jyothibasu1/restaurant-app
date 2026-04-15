package com.food.service;

import java.util.List;

import com.food.entity.Review;
import com.food.entity.User;
import com.food.request.ReviewRequest;

public interface ReviewSerive {
	
    public Review submitReview(ReviewRequest review,User user);
    public void deleteReview(Long reviewId) throws Exception;
    public double calculateAverageRating(List<Review> reviews);
}