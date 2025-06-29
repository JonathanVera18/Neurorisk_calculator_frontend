import React from 'react';
import { Shield, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { ConsentModalProps } from '../../types';

const ConsentModal: React.FC<ConsentModalProps> = ({ onAccept, onDecline }) => (
  <div className="consent-overlay">
    <div className="card-primary card-large max-w-2xl w-full fade-in">
      <div className="text-center mb-6">
        <div className="icon-container mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="title-section mb-2">Consentimiento informado</h2>
        <p className="text-body">Por favor, lea y acepte la siguiente información</p>
      </div>
      
      <div className="space-y-4 mb-8">
        <div className="info-box info-box-blue">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-body">Esta <strong>no</strong> es una herramienta de diagnóstico y los resultados son estimaciones basadas en modelos estadísticos</p>
        </div>
        <div className="info-box info-box-yellow">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-body">Sus respuestas serán anónimas y podrán utilizarse con fines de investigación.</p>
        </div>
        <div className="info-box info-box-green">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-body">Debe consultar a un profesional sanitario para una evaluación formal</p>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <button onClick={onDecline} className="btn-secondary">
          Rechazar
        </button>
        <button onClick={onAccept} className="btn-primary">
          Entiendo y Acepto
        </button>
      </div>
    </div>
  </div>
);

export default ConsentModal;