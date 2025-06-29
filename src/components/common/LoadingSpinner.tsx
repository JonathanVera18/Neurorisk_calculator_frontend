import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Calculando los resultados</h3>
      <p className="text-gray-600">Espere mientras analizamos sus respuestas...</p>
    </div>
  </div>
);

export default LoadingSpinner;