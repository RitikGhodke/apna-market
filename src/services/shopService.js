import API from './api';

export const getShopBySlug = async (slug) => {
  const res = await API.get(`/shop/${slug}`);
  return res.data;
};

export const getAnalytics = async () => {
  const res = await API.get('/shop/dashboard/analytics');
  return res.data;
};

export const updateShop = async (data) => {
  const res = await API.put('/shop/update', data);
  return res.data;
};

export const updateDeliverySettings = async (data) => {
  const res = await API.put('/shop/delivery-settings', data);
  return res.data;
};

export const updateHomePage = async (data) => {
  const res = await API.put('/shop/homepage', data);
  return res.data;
};

export const getCustomers = async () => {
  const res = await API.get('/shop/dashboard/customers');
  return res.data;
};

export const searchShops = async (params) => {
  const res = await API.get('/search/shops', { params });
  return res.data;
};

export const getNearbyShops = async (params) => {
  const res = await API.get('/search/nearby', { params });
  return res.data;
};

export const getFeaturedShops = async () => {
  const res = await API.get('/ads/featured');
  return res.data;
};