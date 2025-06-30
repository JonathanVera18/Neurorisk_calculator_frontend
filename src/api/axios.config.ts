// src/api/axios.config.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { getBaseApiUrl, environment } from '../config/environment';

// Create axios instance with correct base URL
const axiosInstance: AxiosInstance = axios.create({
  baseURL: getBaseApiUrl(),
  timeout: environment.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    // Log request in development
    if (!environment.production) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (!environment.production) {
      console.log(`✅ Response from ${response.config.url}:`, response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (!environment.production) {
      console.error(`❌ Error from ${error.config?.url}:`, error.response?.status, error.response?.data);
    }

    // Handle specific error cases
    if (error.response?.status === 404) {
      console.error('API endpoint not found. Check the URL:', `${error.config?.baseURL ?? ''}${error.config?.url ?? ''}`);
    }

    if (!error.response) {
      console.error('Network error - is the backend running on port 8000?');
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };