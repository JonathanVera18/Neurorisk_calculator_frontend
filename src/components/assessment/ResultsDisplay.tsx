import React from 'react';
import { Brain } from 'lucide-react';
import { ResultsDisplayProps } from '../../types';
import { getRiskLevel } from '../../utils/riskCalculator';

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ riskPercentage, onRestart }) => {
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

    {/* Centered text, scaled slightly down to sit inside the ring */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="text-2xl font-bold text-gray-800 leading-none">
        {Math.round(risk)}%
      </div>
      <div className="text-sm font-medium text-gray-600 mt-1">
        {riskInfo.level}
      </div>
    </div>
  </div>
</div>

  
        <div className="card-secondary mb-8 text-left">
          <p className="text-body">
            <strong>Important:</strong> This result is an estimate based on statistical models and is not a medical diagnosis. 
            Please consult with a qualified healthcare professional for proper evaluation and guidance.
          </p>
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