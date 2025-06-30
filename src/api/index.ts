// src/api/index.ts
export * from './services/types';
export { AssessmentService } from './services/assessment';
// export { tokenManager } from './axios.config';

// Re-export commonly used functions
export { environment, getApiUrl, isProduction, isDevelopment } from '../config/environment';