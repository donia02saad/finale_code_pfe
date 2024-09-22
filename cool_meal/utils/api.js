import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:5000', // Ensure this matches your backend URL
  timeout: 10000, // 10 seconds timeout
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
