// src/hooks/useAssessment.ts
import { useState, useCallback } from 'react';
import { ViewType } from '../types';
import { axiosInstance } from '../api/axios.config';
import { PredictionResponse, PredictionRequest } from '../api/services/types';

interface AssessmentState {
  currentView: ViewType;
  isLoading: boolean;
  results: string;
  fullResults: PredictionResponse | null;
  error: string | null;
}

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentView: 'home',
    isLoading: false,
    results: '',
    fullResults: null,
    error: null,
  });

  const setView = useCallback((view: ViewType) => {
    setState((prev) => ({ ...prev, currentView: view, error: null }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const handleStartAssessment = useCallback(() => {
    setView('consent');
  }, [setView]);

  const handleConsentAccept = useCallback(() => {
    setView('questionnaire');
  }, [setView]);

  const handleConsentDecline = useCallback(() => {
    setView('home');
  }, [setView]);

  const handleQuestionnaireComplete = useCallback(
    async (data: PredictionRequest) => {
      console.log('📊 Submitting assessment data:', data);
      setLoading(true);
      
      try {
        // Make the API call to /predict endpoint
        const response = await axiosInstance.post<PredictionResponse>('/predict', data);
        
        console.log('✅ Prediction response:', response.data);
        
        const prediction = response.data;
        
        // Calculate percentage from risk_score (0-1 scale)
        const riskPercentage = Math.round(prediction.risk_score * 100);
        
        // Update state with results
        setState((prev) => ({
          ...prev,
          results: `${riskPercentage}`,
          fullResults: prediction,
          currentView: 'results',
          isLoading: false,
          error: null,
        }));
        
      } catch (error: unknown) {
        console.error('❌ Error in assessment:', error);
        
        let errorMessage = 'Error al calcular los resultados.';
        
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { status?: number; data?: { detail?: string } } };
          // Server responded with error
          if (axiosError.response?.status === 404) {
            errorMessage = 'No se puede conectar con el servidor. Verifique que el backend esté ejecutándose en el puerto 8000.';
          } else if (axiosError.response?.data?.detail) {
            errorMessage = axiosError.response.data.detail;
          } else {
            errorMessage = `Error del servidor: ${axiosError.response?.status}`;
          }
        } else if (error && typeof error === 'object' && 'request' in error) {
          // Request made but no response
          errorMessage = 'No se puede conectar con el servidor. Verifique su conexión.';
        }
        
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        
        alert(errorMessage);
      }
    },
    [setLoading]
  );

  const handleRestart = useCallback(() => {
    setState({
      currentView: 'home',
      isLoading: false,
      results: '',
      fullResults: null,
      error: null,
    });
  }, []);

  return {
    currentView: state.currentView,
    isLoading: state.isLoading,
    results: state.results,
    fullResults: state.fullResults,
    error: state.error,
    handleStartAssessment,
    handleConsentAccept,
    handleConsentDecline,
    handleQuestionnaireComplete,
    handleRestart,
  };
};