
import { RiskInfo } from '../types';
import { AssessmentService } from '../api/services/assessment';
import { environment } from '../config/environment';

export const calculateRisk = async (responses: number[], demographics: { age: number; gender: string }): Promise<string> => {
  try {
    // Transform questionnaire responses to API format
    const requestData = AssessmentService.transformResponsesToRequest(responses, demographics);
    
    // Call the prediction API
    const prediction = await AssessmentService.predict(requestData);
    
    // Return risk score as percentage
    return `${Math.round(prediction.risk_score * 100)}%`;
  } catch (error) {
    console.error('Error calculating risk:', error);
    
    // In development, fall back to mock calculation
    if (!environment.production && error instanceof Error && error.message.includes('Network')) {
      console.warn('API unavailable, using mock calculation');
      const sum = responses.reduce((acc, val) => acc + val, 0);
      const mockRisk = Math.min(90, Math.max(10, Math.floor(sum / (responses.length || 1) * 10)));
      return `${mockRisk}%`;
    }
    
    throw new Error('Failed to calculate risk assessment. Please try again.');
  }
};

export const getRiskLevel = (risk: number): RiskInfo => {
  if (risk > 60) {
    return {
      level: 'High',
      color: 'red',
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200'
    };
  }
  
  if (risk > 30) {
    return {
      level: 'Moderate',
      color: 'yellow',
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200'
    };
  }
  
  return {
    level: 'Low',
    color: 'green',
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200'
  };
};