// 'use client';

// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setUser, logout } from '@/redux/slices/authSlice';
// import { getMeService } from '@/services/authService';

// export default function AuthInitializer() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const initAuth = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         dispatch(logout());
//         return;
//       }
//       try {
//         const data = await getMeService();
//         dispatch(setUser({
//           user: data.user,
//           shop: data.shop
//         }));
//       } catch (error) {
//         dispatch(logout());
//       }
//     };
//     initAuth();
//   }, []);

//   return null;
// }





'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, logout, restoreAuth } from '@/redux/slices/authSlice';
import { getMeService } from '@/services/authService';

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      // ✅ Pehle localStorage se instantly restore karo
      dispatch(restoreAuth());

      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(logout());
        return;
      }
      try {
        // ✅ Phir backend se verify karo
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