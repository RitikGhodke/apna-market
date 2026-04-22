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


export const forgotPasswordService = async (email) => {
  const res = await API.post('/auth/forgot-password', { email });
  return res.data;
};

export const resetPasswordService = async (token, password) => {
  const res = await API.post('/auth/reset-password', { token, password });
  return res.data;
};