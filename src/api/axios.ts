import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || '';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Basic response interceptor to unwrap data
api.interceptors.response.use(
  (response) => response,
  (error) =>
    // You can add global error handling here (e.g., refresh token, logout on 401)
    Promise.reject(error)
);

export default api;
