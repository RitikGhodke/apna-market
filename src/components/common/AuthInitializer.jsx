'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, logout } from '@/redux/slices/authSlice';
import { getMeService } from '@/services/authService';

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(logout());
        return;
      }
      try {
        const data = await getMeService();
        dispatch(setUser({
          user: data.user,
          shop: data.shop
        }));
      } catch (error) {
        dispatch(logout());
      }
    };
    initAuth();
  }, []);

  return null;
}