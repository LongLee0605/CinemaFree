import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://phimapi.com';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Could add auth tokens here in the future
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Yêu cầu đã hết thời gian. Vui lòng thử lại.'));
    }
    if (error.response) {
      const status = error.response.status;
      if (status >= 500) {
        return Promise.reject(new Error('Máy chủ đang gặp sự cố. Vui lòng thử lại sau.'));
      }
      if (status === 404) {
        return Promise.reject(new Error('Không tìm thấy tài nguyên được yêu cầu.'));
      }
      if (status === 429) {
        return Promise.reject(new Error('Quá nhiều yêu cầu. Vui lòng thử lại sau.'));
      }
    }
    return Promise.reject(
      new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.')
    );
  }
);

export default api;
