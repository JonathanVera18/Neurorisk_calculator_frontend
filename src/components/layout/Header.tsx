import React from 'react';
import myIcon from '../../assets/logo.png';

const Header: React.FC = () => (
  <div className="app-header">
    {/* Centered container */}
    <div className="header-icon-wrapper flex items-center justify-center gap-3"> {/* Added justify-center */}
      <img 
        src={myIcon} 
        alt="App Logo" 
        className="w-[50px] h-[50px] object-contain"
      />
      <h1 className="title-main text-2xl font-bold">
        Calculadora del riesgo de neurodesarrollo
      </h1>
    </div>
    <p className="subtitle-main mt-2 text-gray-600 text-center"> {/* Added text-center */}
      Una herramienta de detección basada en la investigación para la evaluación temprana de problemas de neurodesarrollo
    </p>
  </div>
);

export default Header;