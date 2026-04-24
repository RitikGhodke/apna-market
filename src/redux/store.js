// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import cartReducer from './slices/cartSlice';
// import shopReducer from './slices/shopSlice';
// import orderReducer from './slices/orderSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     cart: cartReducer,
//     shop: shopReducer,
//     order: orderReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export default store;







import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import shopReducer from './slices/shopSlice';
import orderReducer from './slices/orderSlice';

// Next.js SSR ke liye safe storage
const createNoopStorage = () => ({
  getItem() { return Promise.resolve(null); },
  setItem() { return Promise.resolve(); },
  removeItem() { return Promise.resolve(); },
});

const storage = typeof window !== 'undefined'
  ? require('redux-persist/lib/storage').default
  : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart']
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  shop: shopReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default store;