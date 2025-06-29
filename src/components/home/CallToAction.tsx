import React from 'react';
import { CallToActionProps } from '../../types';

const CallToAction: React.FC<CallToActionProps> = ({ onStartAssessment }) => (
  <div className="text-center bg-white rounded-3xl shadow-2xl p-12 border border-teal-100">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Begin Your Assessment?</h2>
    <p className="text-gray-600 mb-8 max-w-lg mx-auto">
      Complete our comprehensive questionnaire to receive an estimated risk assessment based on established research.
    </p>
    <button
      onClick={onStartAssessment}
      className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg transform hover:scale-105"
    >
      Start Assessment
    </button>
  </div>
);

export default CallToAction;