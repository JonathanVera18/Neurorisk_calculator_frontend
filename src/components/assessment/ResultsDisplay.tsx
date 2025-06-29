// src/components/assessment/ResultsDisplay.tsx
import React from 'react';
import { Brain, AlertCircle, Shield, Calendar, ChevronRight } from 'lucide-react';
import { ResultsDisplayProps } from '../../types';
import { getRiskLevel } from '../../utils/riskCalculator';
import { PredictionResponse } from '../../api/services/types';

interface EnhancedResultsDisplayProps extends ResultsDisplayProps {
  fullResults?: PredictionResponse | null;
}

const ResultsDisplay: React.FC<EnhancedResultsDisplayProps> = ({ 
  riskPercentage, 
  onRestart,
  fullResults 
}) => {
  const risk = parseFloat(riskPercentage);
  const riskInfo = getRiskLevel(risk);

  // Get color based on risk level
  const getColor = (risk: number) => {
    if (risk <= 20) return "#14b8a6"; // teal-500
    if (risk <= 40) return "#06b6d4"; // cyan-500
    if (risk <= 60) return "#10b981"; // emerald-500
    if (risk <= 80) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  };

  const color = getColor(risk);

  return (
    <div className="app-container">
      <div className="card-primary card-large text-center fade-in">
        <div className="mb-8">
          <div className="icon-container mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="title-section mb-4">Assessment Results</h2>
          <p className="subtitle-main">Based on your responses to the questionnaire</p>
        </div>
        
        {/* Circular Progress Indicator */}
        <div className="flex flex-col items-center my-16">
          <div className="relative w-[240px] h-[240px]">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
              <circle
                cx="120"
                cy="120"
                r="100"
                stroke="#e5e7eb"
                strokeWidth="16"
                fill="none"
              />
              <circle
                cx="120"
                cy="120"
                r="100"
                stroke={color}
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={2 * Math.PI * 100 * (1 - risk / 100)}
                style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
              />
            </svg>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-bold text-gray-800 leading-none">
                {Math.round(risk)}%
              </div>
              <div className="text-sm font-medium text-gray-600 mt-1">
                {riskInfo.level} Risk
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Results from API */}
        {fullResults && (
          <>
            {/* Risk Interpretation */}
            <div className={`${riskInfo.bg} ${riskInfo.border} border rounded-lg p-6 mb-8`}>
              <h3 className={`font-semibold ${riskInfo.text} mb-2`}>
                {fullResults.interpretation.summary}
              </h3>
              <p className={`${riskInfo.text} opacity-90 text-sm`}>
                {fullResults.interpretation.description}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Calendar className={`w-4 h-4 ${riskInfo.text}`} />
                <span className={`text-sm ${riskInfo.text}`}>
                  Follow-up recommended in {fullResults.interpretation.follow_up_months} month(s)
                </span>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Model Confidence</span>
                <span className="text-sm font-medium text-gray-800">
                  {Math.round(fullResults.confidence_score * 100)}%
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-teal-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${fullResults.confidence_score * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {fullResults.interpretation.confidence_note}
              </p>
            </div>

            {/* Risk Factors */}
            {fullResults.risk_factors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Identified Risk Factors
                </h3>
                <ul className="space-y-2">
                  {fullResults.risk_factors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Protective Factors */}
            {fullResults.protective_factors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Protective Factors
                </h3>
                <ul className="space-y-2">
                  {fullResults.protective_factors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {fullResults.recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-4">
                  Clinical Recommendations
                </h3>
                <ul className="space-y-3">
                  {fullResults.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">{index + 1}.</span>
                      <span className="text-sm text-blue-800">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        
        {/* Disclaimer */}
        <div className="card-secondary mb-8 text-left">
          <p className="text-body">
            <strong>Important:</strong> This result is an estimate based on statistical models and is not a medical diagnosis. 
            Please consult with a qualified healthcare professional for proper evaluation and guidance.
          </p>
          {fullResults && (
            <p className="text-xs text-gray-500 mt-2">
              Model Version: {fullResults.model_version} | Assessment Date: {new Date(fullResults.assessment_date).toLocaleDateString()}
            </p>
          )}
        </div>
        
        <button
          onClick={onRestart}
          className="btn-primary btn-large"
        >
          Take Assessment Again
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;