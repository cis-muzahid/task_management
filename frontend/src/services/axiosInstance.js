import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

// Helper function to get tokens from storage
const getAccessToken = () => localStorage.getItem('usr_1a2b3c');
const getRefreshToken = () => localStorage.getItem('usr_1a2b3r');

// Create axios instances
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstanceWithInterceptors = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstanceWithInterceptors.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401
axiosInstanceWithInterceptors.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Log the error for debugging
    console.log("Interceptor Error:", error);

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        
        // Ensure the refresh token exists before attempting to refresh
        if (!refreshToken) {
          console.error('Refresh token missing');
          throw new Error('Refresh token missing');
        }

        const response = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
        const { access } = response.data;

        // Save new access token
        localStorage.setItem('usr_1a2b3c', access);

        // Update the request with the new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        
        // Retry the original request with the new token
        return axiosInstanceWithInterceptors(originalRequest);
      } catch (error) {
        console.error('Error refreshing token:', error);
        localStorage.removeItem('usr_1a2b3c');
        localStorage.removeItem('usr_1a2b3r');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosInstanceWithInterceptors };
