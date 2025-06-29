import React from 'react';
import { Clock, Shield, Users, Mail, Phone, MapPin, Brain, UserCheck } from 'lucide-react';

interface HomePageProps {
  onStartAssessment: () => void;
}

// CallToAction Component
const CallToAction: React.FC<{ onStartAssessment: () => void }> = ({ onStartAssessment }) => (
  <div className="card-primary card-large mb-8 text-center fade-in">
    <h2 className="title-section mb-4">¿Listo para comenzar su evaluación?</h2>
    <p className="subtitle-main mb-8">
      Complete nuestro detallado cuestionario para recibir una 
 evaluación estimada del riesgo 
 basada en investigaciones contrastadas.
    </p>
    <button
      onClick={onStartAssessment}
      className="btn-primary btn-large"
    >
      Iniciar evaluación
    </button>
  </div>
);

// AboutSection Component
const AboutSection: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  icon?: React.ReactNode;
  className?: string;
}> = ({ title, children, icon, className = "" }) => (
  <div className={`card-primary card-medium card-hover slide-up ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      {icon && (
        <div className="icon-container-sm">
          <div style={{ color: 'white' }}>{icon}</div>
        </div>
      )}
      <h3 className="title-card">{title}</h3>
    </div>
    {children}
  </div>
);

// ImportantNotes Component
const ImportantNotes: React.FC = () => (
  <div className="card-primary card-medium slide-up">
    <h3 className="title-card text-center mb-6">Información importante</h3>
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
        <p className="text-body">
          Esta herramienta sólo tiene fines de detección y no es un instrumento de diagnóstico.
        </p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
        <p className="text-body">
          Los resultados deben discutirse con un profesional sanitario cualificado
        </p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
        <p className="text-body">
          Esta evaluación se basa en datos de investigación y modelos estadísticos
        </p>
      </div>
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onStartAssessment }) => (
  <div className="app-container">
    {/* Header */}
   

    <div className="content-wrapper">
      {/* Call to Action */}
      <CallToAction onStartAssessment={onStartAssessment} />

      {/* About Sections */}
      <div className="grid-2-cols mb-8">
        <AboutSection 
          title="Acerca de la evaluación" 
          icon={<Brain className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <p className="text-body">
              Nuestra herramienta de evaluación utiliza un cuestionario validado para evaluar posibles síntomas 
 de afecciones del neurodesarrollo. Consta de preguntas cuidadosamente seleccionadas que 
 evalúan la interacción social, la comunicación y los patrones de comportamiento.
            </p>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Rápido y completo</h4>
                <p className="text-small">Tarda entre 5 y 10 minutos en completarse</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Privado y seguro</h4>
                <p className="text-small">Todas las respuestas son anónimas y confidenciales</p>
              </div>
            </div>
          </div>
        </AboutSection>

        <AboutSection 
          title="About Our Institute" 
          icon={<UserCheck className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <p className="text-body">
              Nos dedicamos a avanzar en la comprensión y detección temprana de los 
 trastornos del neurodesarrollo mediante una investigación innovadora y herramientas accesibles.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-teal-600" />
                <span className="text-body">Equipo líder de investigación</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-600" />
                <span className="text-body">instituto.neurociencias@
uleam.edu.ec

</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-600" />
                <span className="text-body">+(593) 98 197 7135</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-teal-600" />
                <span className="text-body">Avenida circunvalación, Universidad Laica Eloy
Alfaro de Manabí,
Manta</span>
              </div>
            </div>
          </div>
        </AboutSection>
      </div>

      {/* Important Notes */}
      <ImportantNotes />
    </div>

    {/* Footer */}
    
  </div>
);

export default HomePage;