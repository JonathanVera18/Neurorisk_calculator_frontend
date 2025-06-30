// src/config/environment.ts
interface Environment {
  apiUrl: string;
  apiPrefix: string;
  enableAuth: boolean;
  appName: string;
  version: string;
  production: boolean;
  timeout: number;
}

const getEnvironment = (): Environment => {
  const env = import.meta.env.MODE || 'development';
  
  // For development, use the exact URL that works in your test
  const environments: Record<string, Environment> = {
    development: {
      apiUrl: 'http://localhost:8000',
      apiPrefix: '/api/v1',
      enableAuth: false,
      appName: 'NeuroRisk Calculator',
      version: '1.0.0',
      production: false,
      timeout: 30000,
    },
    production: {
      apiUrl: import.meta.env.VITE_API_URL || '',
      apiPrefix: '/api/v1',
      enableAuth: true,
      appName: 'NeuroRisk Calculator',
      version: '1.0.0',
      production: true,
      timeout: 30000,
    }
  };

  return environments[env] || environments.development;
};

export const environment = getEnvironment();

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${environment.apiUrl}${environment.apiPrefix}/${cleanEndpoint}`;
};

// Get base API URL for axios
export const getBaseApiUrl = (): string => {
  return `${environment.apiUrl}${environment.apiPrefix}`;
};

export const isProduction = (): boolean => environment.production;
export const isDevelopment = (): boolean => !environment.production;