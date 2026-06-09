import axios from 'axios';

// Membuat instance Axios dengan konfigurasi base
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Berjalan sebelum request dikirim
axiosInstance.interceptors.request.use(
  (config) => {
    // Log request untuk debugging
    console.log('🚀 Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });

    // Bisa menambahkan token authentication jika diperlukan
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Berjalan setelah response diterima
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response untuk debugging
    console.log('✅ Response:', {
      status: response.status,
      data: response.data,
      url: response.config.url,
    });

    return response;
  },
  (error) => {
    // Handle error secara terpusat
    console.error('❌ Response Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    // Bisa menambahkan logic khusus untuk error tertentu
    if (error.response?.status === 401) {
      console.error('Unauthorized - Redirect ke login');
      // window.location.href = '/login';
    }

    if (error.response?.status === 404) {
      console.error('Resource not found');
    }

    if (error.response?.status >= 500) {
      console.error('Server error - Coba lagi nanti');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;