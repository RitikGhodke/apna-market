import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shops: [],
  currentShop: null,
  featuredShops: [],
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShops: (state, action) => {
      state.shops = action.payload;
    },
    setCurrentShop: (state, action) => {
      state.currentShop = action.payload;
    },
    setFeaturedShops: (state, action) => {
      state.featuredShops = action.payload;
    },
    setShopLoading: (state, action) => {
      state.loading = action.payload;
    },
    setShopError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setShops,
  setCurrentShop,
  setFeaturedShops,
  setShopLoading,
  setShopError
} = shopSlice.actions;

export default shopSlice.reducer;