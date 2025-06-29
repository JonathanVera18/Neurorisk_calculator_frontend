import React from 'react';
import { ProgressBarProps } from '../../types';

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="font-medium">Progreso: {current}/{total}</span>
        <span className="font-semibold text-teal-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;