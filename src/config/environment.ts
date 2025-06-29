// src/config/environment.ts
interface Environment {
  apiUrl: string;
  apiPrefix: string;
  enableAuth: boolean;
  appName: string;
  version: string;
  production: boolean;
  corsOrigins: string[];
  retryAttempts: number;
  timeout: number;
}

const getEnvironment = (): Environment => {
  const env = import.meta.env.MODE || 'development';
  
  const environments: Record<string, Environment> = {
    development: {
      apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
      apiPrefix: import.meta.env.VITE_API_PREFIX || '/api/v1',
      enableAuth: import.meta.env.VITE_ENABLE_AUTH === 'true',
      appName: 'NeuroRisk Calculator',
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      production: false,
      corsOrigins: ['http://localhost:3000'],
      retryAttempts: 3,
      timeout: 30000, // 30 seconds
    },
    production: {
      apiUrl: import.meta.env.VITE_API_URL || 'https://api.neurorisk.example.com',
      apiPrefix: import.meta.env.VITE_API_PREFIX || '/api/v1',
      enableAuth: true,
      appName: 'NeuroRisk Calculator',
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      production: true,
      corsOrigins: ['https://neurorisk.example.com'],
      retryAttempts: 3,
      timeout: 30000,
    },
    staging: {
      apiUrl: import.meta.env.VITE_API_URL || 'https://api-staging.neurorisk.example.com',
      apiPrefix: import.meta.env.VITE_API_PREFIX || '/api/v1',
      enableAuth: true,
      appName: 'NeuroRisk Calculator (Staging)',
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      production: false,
      corsOrigins: ['https://staging.neurorisk.example.com'],
      retryAttempts: 3,
      timeout: 30000,
    },
  };

  return environments[env] || environments.development;
};

export const environment = getEnvironment();

// Helper functions
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = environment.apiUrl + environment.apiPrefix;
  return `${baseUrl}${endpoint}`;
};

export const isProduction = (): boolean => environment.production;
export const isDevelopment = (): boolean => !environment.production;