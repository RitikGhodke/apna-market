import API from './api';

export const placeOrder = async (data) => {
  const res = await API.post('/orders/place', data);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await API.get('/orders/my-orders');
  return res.data;
};

export const getShopOrders = async (params) => {
  const res = await API.get('/orders/shop-orders', { params });
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await API.put(`/orders/${id}/status`, { status });
  return res.data;
};

export const cancelOrder = async (id) => {
  const res = await API.put(`/orders/${id}/cancel`);
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await API.get(`/orders/${id}`);
  return res.data;
};