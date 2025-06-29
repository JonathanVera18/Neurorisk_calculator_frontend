// src/api/services/assessment.ts
import { axiosInstance, retryRequest } from '../axios.config';
import {
  PredictionRequest,
  PredictionResponse,
  AssessmentRequest,
  AssessmentResponse,
  StatsResponse,
  HealthCheckResponse,
  ErrorResponse,
} from './types';

export class AssessmentService {
  /**
   * Make a risk prediction without storing data
   */
  static async predict(data: PredictionRequest): Promise<PredictionResponse> {
    try {
      const response = await retryRequest(() =>
        axiosInstance.post<PredictionResponse>('/predict', data)
      );
      return response.data;
    } catch (error: unknown) {
      this.handleError(error, 'Failed to calculate risk prediction');
    }
  }

  /**
   * Submit a full assessment with consent
   */
  static async submitAssessment(data: AssessmentRequest): Promise<AssessmentResponse> {
    try {
      const response = await retryRequest(() =>
        axiosInstance.post<AssessmentResponse>('/assessments', data)
      );
      return response.data;
    } catch (error: unknown) {
      this.handleError(error, 'Failed to submit assessment');
    }
  }

  /**
   * Get assessment by ID (requires auth)
   */
  static async getAssessment(assessmentId: number): Promise<AssessmentResponse> {
    try {
      const response = await axiosInstance.get<AssessmentResponse>(`/assessments/${assessmentId}`);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error, 'Failed to retrieve assessment');
    }
  }

  /**
   * Get statistics (requires auth)
   */
  static async getStatistics(days: number = 30): Promise<StatsResponse> {
    try {
      const response = await axiosInstance.get<StatsResponse>('/stats', {
        params: { days },
      });
      return response.data;
    } catch (error: unknown) {
      this.handleError(error, 'Failed to retrieve statistics');
    }
  }

  /**
   * Check API health
   */
  static async checkHealth(): Promise<HealthCheckResponse> {
    try {
      const response = await axiosInstance.get<HealthCheckResponse>('/health');
      return response.data;
    } catch (error: unknown) {
      this.handleError(error, 'Failed to check API health');
    }
  }

  /**
   * Transform questionnaire responses to API format
   */
  static transformResponsesToRequest(responses: number[]): PredictionRequest {
    // Map the 40 questionnaire responses to the 18 API fields
    // This is a simplified mapping - adjust based on your actual questionnaire
    return {
      // Demographics
      age: 25, // This should come from a separate input
      gender: 'other', // This should come from a separate input
      
      // Clinical Risk Factors (questions 1-20)
      consanguinity: responses[0] > 2,
      family_neuro_history: responses[1] > 2,
      seizures_history: responses[2] > 2,
      brain_injury_history: responses[3] > 2,
      psychiatric_diagnosis: responses[4] > 2,
      substance_use: responses[5] > 2,
      suicide_ideation: responses[6] > 2,
      psychotropic_medication: responses[7] > 2,
      
      // Sociodemographic Factors (questions 21-40)
      birth_complications: responses[20] > 2,
      extreme_poverty: responses[21] > 2,
      education_access_issues: responses[22] > 2,
      healthcare_access: responses[23] <= 2, // Inverted - low score means no access
      disability_diagnosis: responses[24] > 2,
      social_support_level: this.calculateSocialSupport(responses.slice(25, 30)),
      breastfed_infancy: responses[30] <= 2, // Inverted - low score means yes
      violence_exposure: responses[31] > 2,
    };
  }

  /**
   * Calculate social support level from multiple questions
   */
  private static calculateSocialSupport(supportResponses: number[]): 'strong' | 'moderate' | 'weak' | 'isolated' {
    const avgScore = supportResponses.reduce((a, b) => a + b, 0) / supportResponses.length;
    
    if (avgScore <= 1.5) return 'strong';
    if (avgScore <= 2.5) return 'moderate';
    if (avgScore <= 3.5) return 'weak';
    return 'isolated';
  }

  /**
   * Handle API errors consistently
   */
  private static handleError(error: unknown, defaultMessage: string): never {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as { response?: unknown }).response === 'object' &&
      (error as { response?: { data?: unknown } }).response &&
      'data' in (error as { response: { data?: unknown } }).response
    ) {
      const errorData = (error as { response: { data: ErrorResponse } }).response.data;
      throw new Error(errorData.detail || defaultMessage);
    }
    throw new Error((error as Error).message || defaultMessage);
  }
}