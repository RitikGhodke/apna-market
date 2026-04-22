// import API from './api';

// export const addProduct = async (data) => {
//   const res = await API.post('/products/add', data);
//   return res.data;
// };

// export const getMyProducts = async () => {
//   const res = await API.get('/products/my-products');
//   return res.data;
// };

// export const getShopProducts = async (shopId, params) => {
//   const res = await API.get(`/products/shop/${shopId}`, { params });
//   return res.data;
// };

// export const updateProduct = async (id, data) => {
//   const res = await API.put(`/products/${id}`, data);
//   return res.data;
// };

// export const deleteProduct = async (id) => {
//   const res = await API.delete(`/products/${id}`);
//   return res.data;
// };

// export const toggleProduct = async (id) => {
//   const res = await API.put(`/products/${id}/toggle`);
//   return res.data;
// };

// export const searchProducts = async (params) => {
//   const res = await API.get('/search/products', { params });
//   return res.data;
// };


// export const uploadProductImage = async (productId, file) => {
//   const formData = new FormData();
//   formData.append('image', file);
//   const res = await API.post(`/upload/product-image/${productId}`, formData);
//   return res.data;
// };











import API from './api';

export const addProduct = async (data) => {
  const res = await API.post('/products/add', data);
  return res.data;
};

export const getMyProducts = async () => {
  const res = await API.get('/products/my-products');
  return res.data;
};

export const getShopProducts = async (shopId, params) => {
  const res = await API.get(`/products/shop/${shopId}`, { params });
  return res.data;
};

// NEW — Amazon style single product detail
export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await API.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};

export const toggleProduct = async (id) => {
  const res = await API.put(`/products/${id}/toggle`);
  return res.data;
};

export const searchProducts = async (params) => {
  const res = await API.get('/search/products', { params });
  return res.data;
};

export const uploadProductImage = async (productId, file) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await API.post(`/upload/product-image/${productId}`, formData);
  return res.data;
};

// NEW — Featured products set karo (with optional offer)
// productIds: [id1, id2]
// offers: { "id1": 10, "id2": 20 }  (discount %)
export const setFeaturedProducts = async (productIds, offers = {}) => {
  const res = await API.put('/products/featured', { productIds, offers });
  return res.data;
};

// NEW — Feed ke liye shop ke featured products lao
export const getFeaturedByShop = async (shopId) => {
  const res = await API.get(`/products/featured/${shopId}`);
  return res.data;
};