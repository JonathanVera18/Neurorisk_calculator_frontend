// src/hooks/useAssessment.ts
import { useState, useCallback } from 'react';
import { ViewType } from '../types';
import { AssessmentService } from '../api/services/assessment';
import { PredictionResponse } from '../api/services/types';

interface AssessmentState {
  currentView: ViewType;
  isLoading: boolean;
  results: string;
  fullResults: PredictionResponse | null;
  error: string | null;
  demographicData: {
    age: number;
    gender: 'male' | 'female' | 'other';
  };
}

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentView: 'home',
    isLoading: false,
    results: '',
    fullResults: null,
    error: null,
    demographicData: {
      age: 25,
      gender: 'other',
    },
  });

  const setView = useCallback((view: ViewType) => {
    setState((prev) => ({ ...prev, currentView: view, error: null }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const setDemographicData = useCallback((data: Partial<AssessmentState['demographicData']>) => {
    setState((prev) => ({
      ...prev,
      demographicData: { ...prev.demographicData, ...data },
    }));
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

  const handleQuestionnaireComplete = useCallback(async (responses: number[]) => {
    setLoading(true);
    setError(null);
    
    try {
      // Transform responses to API format
      const requestData = AssessmentService.transformResponsesToRequest(responses);
      
      // Include demographic data
      requestData.age = state.demographicData.age;
      requestData.gender = state.demographicData.gender;
      
      // Make prediction request
      const prediction = await AssessmentService.predict(requestData);
      
      // Store results
      setState((prev) => ({
        ...prev,
        results: `${Math.round(prediction.risk_score * 100)}%`,
        fullResults: prediction,
        currentView: 'results',
        isLoading: false,
      }));
      
      // Optionally submit assessment with consent
      if (window.confirm('Would you like to save this assessment for future reference?')) {
        try {
          const assessmentData = {
            ...requestData,
            consent_given: true,
            notes: `Risk level: ${prediction.risk_level}`,
          };
          
          const assessmentResponse = await AssessmentService.submitAssessment(assessmentData);
          console.log('Assessment saved:', assessmentResponse.assessment_id);
        } catch (saveError) {
          console.error('Failed to save assessment:', saveError);
          // Don't show error - assessment was still calculated
        }
      }
    } catch (error) {
      console.error('Error calculating risk:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setLoading(false);
      
      // Show user-friendly error
      alert(
        error instanceof Error 
          ? error.message 
          : 'Error calculating results. Please check your connection and try again.'
      );
    }
  }, [state.demographicData, setLoading, setError]);

  const handleRestart = useCallback(() => {
    setState({
      currentView: 'home',
      isLoading: false,
      results: '',
      fullResults: null,
      error: null,
      demographicData: {
        age: 25,
        gender: 'other',
      },
    });
  }, []);

  return {
    // State
    currentView: state.currentView,
    isLoading: state.isLoading,
    results: state.results,
    fullResults: state.fullResults,
    error: state.error,
    demographicData: state.demographicData,
    
    // Actions
    handleStartAssessment,
    handleConsentAccept,
    handleConsentDecline,
    handleQuestionnaireComplete,
    handleRestart,
    setDemographicData,
  };
};