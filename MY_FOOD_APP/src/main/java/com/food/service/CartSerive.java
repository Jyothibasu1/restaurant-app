package com.food.service;

import com.food.entity.Cart;
import com.food.entity.CartItem;
import com.food.request.AddCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws Exception;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

	public Long calculateCartTotals(Cart cart) throws Exception;
	
	public Cart findCartById(Long id) throws Exception;
	
	public Cart findCartByUserId(Long userId) throws Exception;
	
	public Cart clearCart(Long userId) throws Exception;
	

	

}