import React from 'react';
import { Brain } from 'lucide-react';
import { AboutSectionProps } from '../../types';

const AboutSection: React.FC<AboutSectionProps> = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
      <Brain className="w-6 h-6 text-teal-600" />
      {title}
    </h3>
    {children}
  </div>
);

export default AboutSection;