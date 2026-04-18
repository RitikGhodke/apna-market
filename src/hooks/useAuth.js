// 'use client';

// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { loginSuccess, logout } from '@/redux/slices/authSlice';
// import { loginService, registerService, getMeService } from '@/services/authService';
// import toast from 'react-hot-toast';

// export const useAuth = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { user, shop, token, isAuthenticated, loading } = useSelector(state => state.auth);

//   const login = async (phone, password) => {
//     try {
//       const data = await loginService({ phone, password });
//       dispatch(loginSuccess(data));
//       toast.success('Login successful!');

//       if (data.user.role === 'shop') {
//         router.push('/dashboard');
//       } else {
//         router.push('/');
//       }
//       return data;
//     } catch (error) {
//       const msg = error.response?.data?.message || 'Login failed';
//       toast.error(msg);
//       throw error;
//     }
//   };

//   const register = async (formData) => {
//     try {
//       const data = await registerService(formData);
//       dispatch(loginSuccess(data));
//       toast.success('Registration successful!');

//       if (formData.role === 'shop') {
//         router.push('/auth/create-shop');
//       } else {
//         router.push('/');
//       }
//       return data;
//     } catch (error) {
//       const msg = error.response?.data?.message || 'Registration failed';
//       toast.error(msg);
//       throw error;
//     }
//   };

//   const logoutUser = () => {
//     dispatch(logout());
//     toast.success('Logged out!');
//     router.push('/');
//   };

//   const getMe = async () => {
//     try {
//       const data = await getMeService();
//       dispatch(loginSuccess({ ...data, token }));
//       return data;
//     } catch (error) {
//       dispatch(logout());
//     }
//   };

//   return {
//     user,
//     shop,
//     token,
//     isAuthenticated,
//     loading,
//     login,
//     register,
//     logoutUser,
//     getMe
//   };
// };






'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginSuccess, logout, setUser } from '@/redux/slices/authSlice'; // ✅ setUser import
import { loginService, registerService, getMeService } from '@/services/authService';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, shop, token, isAuthenticated, loading, isRestoring  } = useSelector(state => state.auth);

  const login = async (phone, password) => {
    try {
      const data = await loginService({ phone, password });
      dispatch(loginSuccess(data));
      toast.success('Login successful!');
      if (data.user.role === 'shop') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const data = await registerService(formData);
      dispatch(loginSuccess(data));
      toast.success('Registration successful!');
      if (formData.role === 'shop') {
        router.push('/auth/create-shop');
      } else {
        router.push('/');
      }
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      throw error;
    }
  };

  const logoutUser = () => {
    dispatch(logout());
     localStorage.removeItem('dpPreview');
    toast.success('Logged out!');
    router.push('/');
  };

  const getMe = async () => {
    try {
      const data = await getMeService();
      dispatch(loginSuccess({ ...data, token }));
      return data;
    } catch (error) {
      dispatch(logout());
    }
  };

  // ✅ naya — DP update ke baad Redux + localStorage update
  const updateUser = (updatedUser) => {
    dispatch(setUser({ user: updatedUser, shop }));
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(updatedUser)); // ✅ localStorage bhi update
    }
  };

  return {
    user,
    shop,
    token,
    isAuthenticated,
    loading,
    isRestoring,
    login,
    register,
    logoutUser,
    getMe,
    updateUser, // ✅ expose kiya
  };
};