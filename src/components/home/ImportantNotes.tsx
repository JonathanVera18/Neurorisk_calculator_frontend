import React from 'react';

const ImportantNotes: React.FC = () => (
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Important Information</h3>
    <ul className="space-y-2 text-gray-700">
      <li className="flex items-start gap-2">
        <span className="text-blue-600 font-bold">•</span>
        This tool is for screening purposes only and is not a diagnostic instrument
      </li>
      <li className="flex items-start gap-2">
        <span className="text-blue-600 font-bold">•</span>
        Results should be interpreted by qualified healthcare professionals
      </li>
      <li className="flex items-start gap-2">
        <span className="text-blue-600 font-bold">•</span>
        Early assessment can help guide appropriate support and interventions
      </li>
    </ul>
  </div>
);

export default ImportantNotes;