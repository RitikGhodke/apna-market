'use client';

import { useSelector, useDispatch } from 'react-redux';
import { setCart, clearCart } from '@/redux/slices/cartSlice';
import API from '@/services/api';
import toast from 'react-hot-toast';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await API.post('/cart/add', { productId, quantity });
      dispatch(setCart(res.data.cart));
      toast.success('Added to cart!');
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add to cart';
      toast.error(msg);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await API.delete(`/cart/remove/${productId}`);
      dispatch(setCart(res.data.cart));
      toast.success('Removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const res = await API.put('/cart/update', { productId, quantity });
      dispatch(setCart(res.data.cart));
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const fetchCart = async () => {
     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) return;
    try {
      const res = await API.get('/cart');
      if (res.data.cart) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log('Cart fetch error:', error);
    }
  };

  const emptyCart = async () => {
    try {
      await API.delete('/cart/clear');
      dispatch(clearCart());
    } catch (error) {
      console.log('Cart clear error:', error);
    }
  };

  return {
    ...cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    fetchCart,
    emptyCart
  };
};