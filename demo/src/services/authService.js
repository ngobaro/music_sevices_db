import api from './api';

// Đăng nhập
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  const { token, user } = response.data;

  // Lưu token vào localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return { token, user };
};

// Đăng ký
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Đăng xuất
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Lấy thông tin user hiện tại
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Kiểm tra trạng thái đăng nhập
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};