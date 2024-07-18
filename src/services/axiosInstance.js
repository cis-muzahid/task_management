import axios from "axios";


const baseURL = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem('usr_1a2b3c') ? `Bearer ${sessionStorage.getItem('usr_1a2b3c')}` : undefined
  }
});

const axiosInstanceWithInterceptors = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem('usr_1a2b3c') ? `Bearer ${sessionStorage.getItem('usr_1a2b3c')}` : undefined
  }
});

axiosInstanceWithInterceptors.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('usr_1a2b3c');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceWithInterceptors.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = sessionStorage.getItem('usr_1a2b3r'); 
        const response = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
        const { access } = response.data;
        sessionStorage.setItem('usr_1a2b3c', access); 
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosInstanceWithInterceptors(originalRequest); 
      } catch (error) {
        console.error('Error refreshing token:', error);
        sessionStorage.removeItem('usr_1a2b3c');
        sessionStorage.removeItem('usr_1a2b3r');
        window.location.href = '/login'; 
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosInstanceWithInterceptors };
