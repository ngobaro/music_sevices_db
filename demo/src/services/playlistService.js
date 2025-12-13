import api from './api';

export const getUserPlaylists = async () => {
  const response = await api.get('/playlists');
  return response.data;
};

export const createPlaylist = async (data) => {
  const response = await api.post('/playlists', data);
  return response.data;
};

export const getPlaylistById = async (id) => {
  const response = await api.get(`/playlists/${id}`);
  return response.data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const response = await api.post(`/playlists/${playlistId}/songs`, { songId });
  return response.data;
};

export const removeSongFromPlaylist = async (playlistId, songId) => {
  await api.delete(`/playlists/${playlistId}/songs/${songId}`);
};

export const updatePlaylist = async (id, data) => {
  const response = await api.put(`/playlists/${id}`, data);
  return response.data;
};

export const deletePlaylist = async (id) => {
  await api.delete(`/playlists/${id}`);
};