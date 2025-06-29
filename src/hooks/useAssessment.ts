import { useState } from 'react';
import { ViewType } from '../types';
import { calculateRisk } from '../utils/riskCalculator';

export const useAssessment = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string>('');

  const handleStartAssessment = () => {
    setCurrentView('consent');
  };

  const handleConsentAccept = () => {
    setCurrentView('questionnaire');
  };

  const handleConsentDecline = () => {
    setCurrentView('home');
  };

  const handleQuestionnaireComplete = async (responses: number[]) => {
    setIsLoading(true);
    
    try {
      const riskResult = await calculateRisk(responses);
      setResults(riskResult);
      setCurrentView('results');
    } catch (error) {
      console.error('Error calculating risk:', error);
      alert('Error calculating results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentView('home');
    setResults('');
  };

  return {
    currentView,
    isLoading,
    results,
    handleStartAssessment,
    handleConsentAccept,
    handleConsentDecline,
    handleQuestionnaireComplete,
    handleRestart,
  };
};