export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Music Web';

export const AUDIO_FORMATS = ['mp3', 'wav', 'ogg', 'm4a'];

export const REPEAT_MODES = {
  OFF: false,
  ONE: 'one',
  ALL: 'all'
};

export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  LIBRARY: '/library',
  PLAYLIST: '/playlist/:id',
  ALBUM: '/album/:id',
  ARTIST: '/artist/:id',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register'
};