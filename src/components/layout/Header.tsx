import React from 'react';
import myIcon from '../../assets/logo.png';

const Header: React.FC = () => {
  const handleLogoClick = () => {
  window.location.href = '/'; // Goes to the root of your app
};

  return (
    <div className="app-header">
      {/* Centered container */}
      <div className="header-icon-wrapper flex items-center justify-center gap-3">
        <img 
        src={myIcon} 
        alt="App Logo" 
        className="logo-img object-contain cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleLogoClick}
      />
        <h1 className="title-main text-2xl font-bold">
          Calculadora del riesgo de neurodesarrollo
        </h1>
      </div>
      <p className="subtitle-main mt-2 text-gray-600 text-center">
        Una herramienta de detección basada en la investigación para la evaluación temprana de problemas de neurodesarrollo
      </p>
    </div>
  );
};

export default Header;