// src/components/debug/ApiTester.tsx
import React, { useState } from 'react';
import { isAxiosError } from 'axios';
import { axiosInstance } from '../../api/axios.config';
import { getApiUrl, getBaseApiUrl } from '../../config/environment';

const ApiTester: React.FC = () => {
  const [testResults, setTestResults] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    let results = '';
    
    // Test 1: Check configuration
    results += '📋 Configuration:\n';
    results += `Base URL: ${getBaseApiUrl()}\n`;
    results += `Full predict URL: ${getApiUrl('predict')}\n\n`;
    
    // Test 2: Health check
    try {
      results += '🏥 Testing health endpoint...\n';
      const healthResponse = await axiosInstance.get('/health');
      results += `✅ Health check: ${JSON.stringify(healthResponse.data)}\n\n`;
    } catch (error: unknown) {
      results += `❌ Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}\n\n`;
    }
    
    // Test 3: Prediction endpoint
    try {
      results += '🧪 Testing prediction endpoint...\n';
      const testData = {
        age: 30,
        gender: "M",
        consanguinity: false,
        family_neuro_history: true,
        seizures_history: false,
        brain_injury_history: false,
        psychiatric_diagnosis: true,
        substance_use: false,
        suicide_ideation: false,
        psychotropic_medication: true,
        birth_complications: false,
        extreme_poverty: false,
        education_access_issues: false,
        healthcare_access: true,
        disability_diagnosis: false,
        social_support_level: "moderate",
        breastfed_infancy: true,
        violence_exposure: false
      };
      
      const response = await axiosInstance.post('/predict', testData);
      results += `✅ Prediction successful!\n`;
      results += `Risk level: ${response.data.risk_level}\n`;
    } catch (error: unknown) {
      results += `❌ Prediction failed: ${error instanceof Error ? error.message : 'Unknown error'}\n`;
      if (isAxiosError(error) && error.response) {
        results += `Status: ${error.response.status}\n`;
        results += `Data: ${JSON.stringify(error.response.data)}\n`;
      }
    }
    
    setTestResults(results);
    setTestResults(results);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md">
      <h3 className="font-bold mb-2">API Debug Tester</h3>
      <button
        onClick={runTests}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2 disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Run API Tests'}
      </button>
      <pre className="text-xs bg-gray-100 p-2 rounded max-h-60 overflow-auto">
        {testResults || 'Click to run tests...'}
      </pre>
    </div>
  );
};

export default ApiTester;