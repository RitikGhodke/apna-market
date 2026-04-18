// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   shop: null,
//   token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//       state.shop = action.payload.shop || null;
//       state.token = action.payload.token;
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('user', JSON.stringify(action.payload.user));
//       }
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.shop = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     },
//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       state.shop = action.payload.shop || null;
//       state.isAuthenticated = true;
//     },
//     updateShop: (state, action) => {
//       state.shop = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     }
//   }
// });

// export const {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
//   setUser,
//   updateShop,
//   clearError
// } = authSlice.actions;

// export default authSlice.reducer;










// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   shop: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
//   isRestoring: true,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//       state.shop = action.payload.shop || null;
//       state.token = action.payload.token;
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('token', action.payload.token);
//         const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const mergedUser = { ...existingUser, ...action.payload.user };
//         localStorage.setItem('user', JSON.stringify(action.payload.user));
//         localStorage.setItem('shop', JSON.stringify(action.payload.shop || null));
//       }
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.shop = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         localStorage.removeItem('shop');
//       }
//     },
//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       state.shop = action.payload.shop || null;
//       state.isAuthenticated = true;
//       if (typeof window !== 'undefined') {
//     const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const mergedUser = { ...existingUser, ...action.payload.user };
//     localStorage.setItem('user', JSON.stringify(mergedUser));
//   }
//     },
//     // ✅ Yeh nayi reducer add ki — localStorage se restore karne ke liye
//     restoreAuth: (state) => {
//       const token = localStorage.getItem('token');
//       const user = JSON.parse(localStorage.getItem('user') || 'null');
//       const shop = JSON.parse(localStorage.getItem('shop') || 'null');
//       if (token && user) {
//         state.token = token;
//         state.user = user;
//         state.shop = shop;
//         state.isAuthenticated = true;
//       }
//       state.isRestoring = false;
//     },
//     updateShop: (state, action) => {
//       state.shop = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     }
//   }
// });

// export const {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
//   setUser,
//   restoreAuth,
//   updateShop,
//   clearError
// } = authSlice.actions;

// export default authSlice.reducer;









import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  shop: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isRestoring: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.shop = action.payload.shop || null;
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        // ✅ Existing address + profilePic ke saath merge karo
        const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
        const mergedUser = { ...existingUser, ...action.payload.user };
        localStorage.setItem('user', JSON.stringify(mergedUser));
        localStorage.setItem('shop', JSON.stringify(action.payload.shop || null));
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.shop = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        // ✅ Address aur profilePic preserve karo — poora user mat hatao
        const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
        const preserved = {
          address: existingUser.address || null,
          profilePic: existingUser.profilePic || null,
        };
        localStorage.removeItem('token');
        localStorage.removeItem('shop');
        localStorage.removeItem('dpPreview');
        localStorage.setItem('user', JSON.stringify(preserved));
      }
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.shop = action.payload.shop || null;
      state.isAuthenticated = true;
      // ✅ localStorage mein bhi merge karo
      if (typeof window !== 'undefined') {
        const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
        const mergedUser = { ...existingUser, ...action.payload.user };
        localStorage.setItem('user', JSON.stringify(mergedUser));
      }
    },
    restoreAuth: (state) => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const shop = JSON.parse(localStorage.getItem('shop') || 'null');
      if (token && user) {
        state.token = token;
        state.user = user;
        state.shop = shop;
        state.isAuthenticated = true;
      }
      state.isRestoring = false;
    },
    updateShop: (state, action) => {
      state.shop = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  restoreAuth,
  updateShop,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;