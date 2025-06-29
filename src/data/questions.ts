import { Question } from '../types';

// Updated Questions Data based on neurodevelopmental research
export const QUESTIONS: Question[] = [
  { id: 1, text: "Are the subject's parents blood-related (consanguinity)?" },
  { id: 2, text: "Does the subject have a family history of neurological disorders?" },
  { id: 3, text: "Has the subject ever had seizures or convulsions?" },
  { id: 4, text: "History of traumatic brain injury (TBI) or head trauma" },
  { id: 5, text: "Diagnosed with any psychiatric disorder (depression, bipolar, etc.)" },
  { id: 6, text: "Does the subject consume psychoactive substances regularly?" },
  { id: 7, text: "Was the subject born with complications or low weight?" },
  { id: 8, text: "Does the subject live in extreme poverty?" },
  { id: 9, text: "Has the subject ever had access restrictions to education?" },
  { id: 10, text: "Does the subject have access to mental healthcare?" },
  { id: 11, text: "History of suicide attempts or ideation" },
  { id: 12, text: "Is the subject on psychotropic or neurological medication?" },
  { id: 13, text: "Has the subject ever been diagnosed with a disability?" },
  { id: 14, text: "Level of social support (isolated vs. supported)" },
  { id: 15, text: "Age of the subject" },
  { id: 16, text: "Gender of the subject" },
  { id: 17, text: "Was the subject breastfed during infancy?" },
  { id: 18, text: "Exposure to violence or trauma (childhood or adulthood)" }
];

// Different answer options based on question type
export const BINARY_OPTIONS = ['No', 'Yes'];

export const SOCIAL_SUPPORT_OPTIONS = [
  'Very isolated - no support system',
  'Somewhat isolated - limited support',
  'Moderate support - some family/friends',
  'Strong support - good family/social network'
];

export const AGE_OPTIONS = [
  '0-5 years',
  '6-12 years', 
  '13-17 years',
  '18-25 years',
  '26-40 years',
  '41-60 years',
  'Over 60 years'
];

export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Non-binary',
  'Prefer not to say'
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