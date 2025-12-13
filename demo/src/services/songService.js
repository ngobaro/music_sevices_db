import api from './api';

export const getAllSongs = async (params = {}) => {
  const response = await api.get('/songs', { params });
  return response.data;
};

export const getSongById = async (id) => {
  const response = await api.get(`/songs/${id}`);
  return response.data;
};

export const searchSongs = async (query) => {
  const response = await api.get('/songs/search', { 
    params: { q: query } 
  });
  return response.data;
};

export const getTrendingSongs = async () => {
  const response = await api.get('/songs/trending');
  return response.data;
};

export const getSongsByGenre = async (genre) => {
  const response = await api.get(`/songs/genre/${genre}`);
  return response.data;
};

export const getSongStreamUrl = (songId) => {
  return `${api.defaults.baseURL}/songs/${songId}/stream`;
};

export const incrementPlayCount = async (songId) => {
  await api.post(`/songs/${songId}/play`);
};