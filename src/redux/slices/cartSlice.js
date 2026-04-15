import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  shopId: null,
  shopName: '',
  totalProductPrice: 0,
  deliveryCharge: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      const cart = action.payload;
      if (cart) {
        state.items = cart.items || [];
        state.shopId = cart.shopId;
        state.totalProductPrice = cart.totalProductPrice;
        state.deliveryCharge = cart.deliveryCharge;
        state.totalAmount = cart.totalAmount;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.shopId = null;
      state.shopName = '';
      state.totalProductPrice = 0;
      state.deliveryCharge = 0;
      state.totalAmount = 0;
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCartError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setCart, clearCart, setCartLoading, setCartError } = cartSlice.actions;
export default cartSlice.reducer;