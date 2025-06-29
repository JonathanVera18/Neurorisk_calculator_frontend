import React from 'react';
import { useAssessment } from './hooks/useAssessment';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import ConsentModal from './components/assessment/ConsentModal';
import Questionnaire from './components/assessment/Questionnaire';
import ResultsDisplay from './components/assessment/ResultsDisplay';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  const {
    currentView,
    isLoading,
    results,
    handleStartAssessment,
    handleConsentAccept,
    handleConsentDecline,
    handleQuestionnaireComplete,
    handleRestart,
  } = useAssessment();

  if (currentView === 'consent') {
    return <ConsentModal onAccept={handleConsentAccept} onDecline={handleConsentDecline} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-blue-50">
      {isLoading && <LoadingSpinner />}
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <Header />

        {/* Main Content */}
        {currentView === 'home' && (
          <HomePage onStartAssessment={handleStartAssessment} />
        )}

        {currentView === 'questionnaire' && (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        )}

        {currentView === 'results' && (
          <ResultsDisplay riskPercentage={results} onRestart={handleRestart} />
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;