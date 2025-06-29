import React from 'react';

const Footer: React.FC = () => (
  <footer className="mt-16 text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
    <p>© {new Date().getFullYear()} Neurodevelopmental Research Institute</p>
    <p className="mt-1">This tool is for informational purposes only</p>
  </footer>
);

export default Footer;