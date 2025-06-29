
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { environment } from '../config/environment';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}
// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: environment.apiUrl + environment.apiPrefix,
  timeout: environment.timeout,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Token management
export const tokenManager = {
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },
  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },
  removeToken: (): void => {
    localStorage.removeItem('auth_token');
  },
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available and auth is enabled
    if (environment.enableAuth) {
      const token = tokenManager.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    // Log request in development
    if (!environment.production) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration =
      new Date().getTime() -
      (response.config.metadata?.startTime?.getTime?.() ?? 0);

    // Log response in development
    if (!environment.production) {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`,
        response.data
      );
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Log error in development
    if (!environment.production) {
      console.error(
        `❌ ${originalRequest.method?.toUpperCase()} ${originalRequest.url} - ${error.response?.status || 'Network Error'}`,
        error.response?.data || error.message
      );
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && environment.enableAuth && !originalRequest._retry) {
      originalRequest._retry = true;
      tokenManager.removeToken();
      // Redirect to login or show auth modal
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      const networkError = {
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR',
      };
      return Promise.reject(networkError);
    }

    // Handle timeout
    if (error.code === 'ECONNABORTED') {
      const timeoutError = {
        message: 'Request timeout. Please try again.',
        code: 'TIMEOUT',
      };
      return Promise.reject(timeoutError);
    }

    // Pass through other errors
    return Promise.reject(error);
  }
);

// Retry logic for failed requests
const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries = environment.retryAttempts
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && (error as { code?: string }).code !== 'NETWORK_ERROR') {
      await new Promise((resolve) => setTimeout(resolve, 1000 * (environment.retryAttempts - retries + 1)));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

export { axiosInstance, retryRequest };