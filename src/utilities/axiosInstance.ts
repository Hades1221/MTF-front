import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mtf-server-l03g.onrender.com/api',
});

// Automatically include token in Authorization header for all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;