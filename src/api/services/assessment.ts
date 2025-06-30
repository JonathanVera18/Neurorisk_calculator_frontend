// src/api/services/assessment.ts
import { axiosInstance } from '../axios.config';
import { AxiosError } from 'axios';

// Utility function to retry failed requests
const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryRequest(requestFn, retries - 1, delay * 2);
  }
};
import {
  PredictionRequest,
  PredictionResponse,
  AssessmentRequest,
  AssessmentResponse,
  ErrorResponse,
} from './types';
import { questions } from '../../data/questionsData';

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
      this.handleError(error as AxiosError, 'Failed to calculate risk prediction');
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
      this.handleError(error as AxiosError, 'Failed to submit assessment');
    }
  }

  /**
   * Transform questionnaire responses to API format
   * @param responses Array of responses corresponding to the questions array
   * @param demographics Object with age and gender
   */
  static transformResponsesToRequest(
    responses: number[], 
    demographics: { age: number; gender: string }
  ): PredictionRequest {
    
    // Helper function to convert response to boolean
    const toBoolean = (response: number, isInverted: boolean = false): boolean => {
      if (isInverted) {
        return response >= 4; // For inverted questions, high score means true
      }
      return response >= 4; // For normal questions, high score means true
    };
    
    // Build the request object by mapping responses to field names
    const request: PredictionRequest = {
      // Demographics
      age: demographics.age,
      gender: demographics.gender, // Should be "M", "F", or "O"
      
      // Initialize all fields
      consanguinity: false,
      family_neuro_history: false,
      seizures_history: false,
      brain_injury_history: false,
      psychiatric_diagnosis: false,
      substance_use: false,
      suicide_ideation: false,
      psychotropic_medication: false,
      birth_complications: false,
      extreme_poverty: false,
      education_access_issues: false,
      healthcare_access: false,
      disability_diagnosis: false,
      social_support_level: 'isolated',
      breastfed_infancy: false,
      violence_exposure: false,
    };
    
    // Map responses to request fields
    questions.forEach((question, index) => {
      const response = responses[index];
      
      if (question.fieldName === 'social_support_level') {
        // Handle social support level specially
        request.social_support_level = this.mapSocialSupportLevel(response);
      } else {
        // Handle boolean fields
        const fieldName = question.fieldName as keyof PredictionRequest;
        if (typeof request[fieldName] === 'boolean') {
          (request as Record<keyof PredictionRequest, boolean | string | number>)[fieldName] = toBoolean(response, question.isInverted);
        }
      }
    });
    
    return request;
  }

  /**
   * Map social support response to level
   */
  private static mapSocialSupportLevel(response: number): string {
    if (response >= 4) return 'strong';
    if (response >= 3) return 'moderate';
    if (response >= 2) return 'weak';
    return 'isolated';
  }

  /**
   * Handle API errors consistently
   */
  private static handleError(error: AxiosError, defaultMessage: string): never {
    if (error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      throw new Error(errorData.detail || defaultMessage);
    }
    throw new Error(error.message || defaultMessage);
  }
  
  /**
   * Check API health
   */
  static async checkHealth(): Promise<object> {
    try {
      const response = await axiosInstance.get('/health');
      return response.data;
    } catch (error: unknown) {
      this.handleError(error as AxiosError, 'Failed to check API health');
    }
  }
}