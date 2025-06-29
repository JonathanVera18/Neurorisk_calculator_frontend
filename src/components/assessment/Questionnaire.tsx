import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuestionnaireProps } from '../../types';
import { QUESTIONS, getAnswerOptions, ASSESSMENT_INSTRUCTION } from '../../data/questions';
import ProgressBar from '../common/ProgressBar';

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isAnswered = answers[currentQuestion] !== -1;
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
  
  // Get the appropriate answer options for the current question
  const currentAnswerOptions = getAnswerOptions(QUESTIONS[currentQuestion].id);

  return (
    <div className="app-container">
      <div className="card-primary card-large fade-in">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="icon-container-sm">
              <span className="text-white font-bold text-sm">INC</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 font-medium">Evaluación del riesgo para el desarrollo neurológico</span>
          </div>
          <div className="text-sm font-semibold text-teal-600 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-400 px-3 py-1 rounded-full">
            Pregunta {currentQuestion + 1}/{QUESTIONS.length}
          </div>
        </div>

        <ProgressBar current={currentQuestion + 1} total={QUESTIONS.length} />

        <div className="mb-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4 italic text-sm">
            {ASSESSMENT_INSTRUCTION}
          </p>
          <h3 className="title-card mb-8 text-left">
            {QUESTIONS[currentQuestion].text}
          </h3>

          <div className="space-y-4">
            {currentAnswerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 text-left font-medium ${
                  answers[currentQuestion] === index
                    ? 'border-teal-500 bg-teal-500 text-white shadow-lg transform scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-teal-300 dark:hover:border-teal-400 hover:shadow-md hover:bg-teal-50 dark:hover:bg-teal-900/20 text-gray-900 dark:text-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === index 
                      ? 'border-white bg-transparent' 
                      : 'border-gray-300 dark:border-gray-500'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-body">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Atras
          </button>
          
          <button 
            onClick={handleNext}
            disabled={!isAnswered}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Obtener Resultados' : 'Siguiente'}
            {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;