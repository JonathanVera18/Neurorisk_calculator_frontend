import { Question } from '../types';

// Updated Questions Data based on neurodevelopmental research
export const QUESTIONS: Question[] = [
  { id: 1, text: "Están los padres del sujeto emparentados por consanguinidad?" },
  { id: 2, text: "¿Tiene el sujeto antecedentes familiares de trastornos neurológicos?" },
  { id: 3, text: "¿Ha tenido el sujeto alguna vez ataques o convulsiones?" },
  { id: 4, text: "Antecedentes de lesión cerebral traumática (LCT) o traumatismo craneoencefálico" },
  { id: 5, text: "Diagnóstico de algún trastorno psiquiátrico (depresión, bipolaridad, etc.)" },
  { id: 6, text: "¿Consume el sujeto sustancias psicoactivas con regularidad?" },
  { id: 7, text: "¿El sujeto nació con complicaciones o bajo de peso?" },
  { id: 8, text: "¿Vive el sujeto en condiciones de extrema pobreza?" },
  { id: 9, text: "¿Ha tenido el sujeto alguna vez restricciones de acceso a la educación?" },
  { id: 10, text: "¿Tiene el sujeto acceso a atención de salud mental?" },
  { id: 11, text: "Intentos de suicidio o ideación suicida" },
  { id: 12, text: "¿El sujeto toma medicación psicotrópica o neurológica?" },
  { id: 13, text: "¿Se le ha diagnosticado alguna discapacidad al sujeto?" },
  { id: 14, text: "Nivel de apoyo social (aislado vs. apoyado)" },
  { id: 15, text: "Edad del sujeto" },
  { id: 16, text: "Sexo del sujeto" },
  { id: 17, text: "¿El sujeto fue amamantado durante la infancia?" },
  { id: 18, text: "Exposición a violencia o trauma (infancia o edad adulta)" }
];

// Different answer options based on question type
export const BINARY_OPTIONS = ['No', 'Si'];

export const SOCIAL_SUPPORT_OPTIONS = [
  'Muy aislado - sin sistema de apoyo',
  'Algo aislado - apoyo limitado',
  'Apoyo moderado - algunos familiares/amigos',
  'Fuerte apoyo - buena red familiar/social'
];

export const AGE_OPTIONS = [
  '0-5 años',
  '6-12 años', 
  '13-17 años',
  '18-25 años',
  '26-40 años',
  '41-60 años',
  'Mas de 60 años'
];

export const GENDER_OPTIONS = [
  'Hombre',
  'Mujer',
  'No binario',
  'Prefiero no decirlo',
];

// Function to get appropriate answer options for each question
export const getAnswerOptions = (questionId: number): string[] => {
  switch (questionId) {
    case 14: // Social support level
      return SOCIAL_SUPPORT_OPTIONS;
    case 15: // Age
      return AGE_OPTIONS;
    case 16: // Gender
      return GENDER_OPTIONS;
    default: // All other questions are binary
      return BINARY_OPTIONS;
  }
};

export const ASSESSMENT_INSTRUCTION = "Responda a las siguientes preguntas sobre la asignatura objeto de evaluación:";