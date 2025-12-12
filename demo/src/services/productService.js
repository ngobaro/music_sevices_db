import api from './api';

// Lấy tất cả products
export const getAllProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// Lấy product theo ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Tạo product mới
export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

// Cập nhật product
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Xóa product
export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

// Tìm kiếm products
export const searchProducts = async (query) => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data;
};