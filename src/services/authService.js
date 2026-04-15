import API from './api';

export const registerService = async (data) => {
  const res = await API.post('/auth/register', data);
  return res.data;
};

export const loginService = async (data) => {
  const res = await API.post('/auth/login', data);
  return res.data;
};

export const getMeService = async () => {
  const res = await API.get('/auth/me');
  return res.data;
};

export const createShopService = async (data) => {
  const res = await API.post('/auth/create-shop', data);
  return res.data;
};