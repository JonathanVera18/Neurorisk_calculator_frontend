// src/components/assessment/Questionnaire.tsx
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Brain, User, CheckCircle } from 'lucide-react';
import { questions } from '../../data/questionsData';
import ProgressBar from '../common/ProgressBar';

type ResponseValue = boolean | string;

interface QuestionnaireData {
  age: number;
  gender: string;
  [key: string]: ResponseValue | number | string;
}

interface QuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, ResponseValue>>({});
  const [demographics, setDemographics] = useState({
    age: '',
    gender: 'M'
  });
  const [showDemographics, setShowDemographics] = useState(true);

  const handleDemographicsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demographics.age || parseInt(demographics.age) < 1) {
      alert('Por favor ingrese una edad válida');
      return;
    }
    setShowDemographics(false);
  };

  const handleBooleanResponse = (fieldName: string, value: boolean, isInverted?: boolean) => {
    setResponses({
      ...responses,
      [fieldName]: isInverted ? value : value
    });
  };

  const handleSocialSupportResponse = (value: string) => {
    setResponses({
      ...responses,
      social_support_level: value
    });
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    if (!Object.prototype.hasOwnProperty.call(responses, currentQuestion.fieldName)) {
      alert('Por favor seleccione una respuesta antes de continuar');
      return;
    }
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const unansweredQuestions = questions.filter(q => !Object.prototype.hasOwnProperty.call(responses, q.fieldName));
    if (unansweredQuestions.length > 0) {
      alert(`Por favor responda todas las preguntas. Faltan ${unansweredQuestions.length} respuestas.`);
      return;
    }

    // Prepare final data matching backend format exactly
    const finalData = {
      age: parseInt(demographics.age),
      gender: demographics.gender,
      ...responses
    };

    onComplete(finalData);
  };

  // Show demographics form first
  if (showDemographics) {
    return (
      <div className="app-container">
        <div className="card-primary card-large fade-in">
          {/* Enhanced Header */}
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="icon-container-sm">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-500 dark:text-gray-400 font-medium">Información Demográfica del Paciente</span>
            </div>
            <div className="text-sm font-semibold text-teal-600 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-400 px-3 py-1 rounded-full">
              Paso 1/2
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="title-card mb-4 text-left">Información Demográfica</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 italic text-sm">
              Por favor proporcione información básica del paciente para continuar con la evaluación
            </p>
          </div>

          <form onSubmit={handleDemographicsSubmit} className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Edad del paciente
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={demographics.age}
                onChange={(e) => setDemographics({
                  ...demographics, 
                  age: e.target.value
                })}
                onKeyDown={(e) => {
                  // Allow: backspace, delete, tab, escape, enter, decimal point
                  if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true)) {
                    return;
                  }
                  // Ensure that it is a number and stop the keypress
                  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                  }
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                placeholder="Ej: 25"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Género del paciente
              </label>
              <select
                value={demographics.gender}
                onChange={(e) => setDemographics({
                  ...demographics,
                  gender: e.target.value
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                required
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-lg font-medium rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]"
            >
              Continuar con el cuestionario
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const isAnswered = Object.prototype.hasOwnProperty.call(responses, currentQuestion.fieldName);

  return (
    <div className="app-container">
      <div className="card-primary card-large fade-in">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="icon-container-sm">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500 dark:text-gray-400 font-medium">Cuestionario de Evaluación Clínica</span>
          </div>
          <div className="text-sm font-semibold text-teal-600 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-400 px-3 py-1 rounded-full">
            Pregunta {currentStep + 1}/{questions.length}
          </div>
        </div>

        <ProgressBar current={currentStep + 1} total={questions.length} />

        <div className="mb-8">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">
            {currentQuestion.category === 'clinical' ? 'Factores Clínicos' : 'Factores Sociodemográficos'}
          </div>
          <h3 className="title-card mb-8 text-left">
            {currentQuestion.text}
          </h3>

          {/* Social Support Level - Special Question */}
          {currentQuestion.fieldName === 'social_support_level' ? (
            <div className="space-y-4">
              {[
                { value: 'strong', label: 'Fuerte', color: 'hover:border-green-300 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20', selectedColor: 'border-green-500 bg-green-500' },
                { value: 'moderate', label: 'Moderado', color: 'hover:border-blue-300 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20', selectedColor: 'border-blue-500 bg-blue-500' },
                { value: 'weak', label: 'Débil', color: 'hover:border-yellow-300 dark:hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20', selectedColor: 'border-yellow-500 bg-yellow-500' },
                { value: 'isolated', label: 'Aislado', color: 'hover:border-red-300 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20', selectedColor: 'border-red-500 bg-red-500' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSocialSupportResponse(option.value)}
                  className={`w-full p-4 border-2 rounded-xl transition-all duration-200 text-left font-medium ${
                    responses.social_support_level === option.value
                      ? `${option.selectedColor} text-white shadow-lg transform scale-[1.02]`
                      : `border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 ${option.color} hover:shadow-md text-gray-900 dark:text-gray-100`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        responses.social_support_level === option.value 
                          ? 'border-white bg-transparent' 
                          : 'border-gray-300 dark:border-gray-500'
                      }`}>
                        {responses.social_support_level === option.value && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-body">{option.label}</span>
                    </div>
                    {responses.social_support_level === option.value && (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Yes/No Questions */
            <div className="space-y-4">
              <button
                onClick={() => handleBooleanResponse(currentQuestion.fieldName, true, currentQuestion.isInverted)}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 text-left font-medium ${
                  responses[currentQuestion.fieldName] === true
                    ? 'border-teal-500 bg-teal-500 text-white shadow-lg transform scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-teal-300 dark:hover:border-teal-400 hover:shadow-md hover:bg-teal-50 dark:hover:bg-teal-900/20 text-gray-900 dark:text-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    responses[currentQuestion.fieldName] === true 
                      ? 'border-white bg-transparent' 
                      : 'border-gray-300 dark:border-gray-500'
                  }`}>
                    {responses[currentQuestion.fieldName] === true && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-body font-bold">SÍ</span>
                </div>
              </button>

              <button
                onClick={() => handleBooleanResponse(currentQuestion.fieldName, false, currentQuestion.isInverted)}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 text-left font-medium ${
                  responses[currentQuestion.fieldName] === false
                    ? 'border-teal-500 bg-teal-500 text-white shadow-lg transform scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-teal-300 dark:hover:border-teal-400 hover:shadow-md hover:bg-teal-50 dark:hover:bg-teal-900/20 text-gray-900 dark:text-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    responses[currentQuestion.fieldName] === false 
                      ? 'border-white bg-transparent' 
                      : 'border-gray-300 dark:border-gray-500'
                  }`}>
                    {responses[currentQuestion.fieldName] === false && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-body font-bold">NO</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Navigation */}
        <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          {currentStep === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isAnswered}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Completar Evaluación
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Enhanced Progress indicator */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">
            Progreso: {Object.keys(responses).length} de {questions.length} preguntas respondidas
          </div>
          <div className="flex flex-wrap gap-2">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                  Object.prototype.hasOwnProperty.call(responses, question.fieldName)
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                } ${index === currentStep ? 'ring-2 ring-teal-600 ring-offset-2 dark:ring-offset-gray-900 transform scale-110' : ''}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;