import api from './api';

// Lấy tất cả users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Lấy user theo ID
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Tạo user mới
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Cập nhật user
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Xóa user
export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};