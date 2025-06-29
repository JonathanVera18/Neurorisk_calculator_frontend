import { RiskInfo } from '../types';

export const calculateRisk = async (responses: number[]): Promise<string> => {
  // Simulate API call - replace with actual API endpoint
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    // Use responses in mock calculation
    const sum = responses.reduce((acc, val) => acc + val, 0);
    const mockRisk = Math.min(90, Math.max(10, Math.floor(sum / (responses.length || 1) * 10)));
    return `${mockRisk}%`;
  } catch (error) {
    console.error('Error calculating risk:', error);
    throw new Error('Failed to calculate risk assessment');
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