// src/data/questionsData.ts

export interface Question {
  id: number;
  text: string;
  fieldName: string; // Direct mapping to backend field
  category: 'clinical' | 'sociodemographic';
  isInverted?: boolean; // For questions where "Sí" means false in backend
}

// Exactly 18 questions matching the backend fields
export const questions: Question[] = [
  // Clinical Risk Factors (8 questions)
  {
    id: 1,
    text: "¿Existe consanguinidad entre los padres del paciente?",
    fieldName: 'consanguinity',
    category: 'clinical'
  },
  {
    id: 2,
    text: "¿Hay antecedentes familiares de trastornos neurológicos o del desarrollo?",
    fieldName: 'family_neuro_history',
    category: 'clinical'
  },
  {
    id: 3,
    text: "¿El paciente ha tenido convulsiones o epilepsia?",
    fieldName: 'seizures_history',
    category: 'clinical'
  },
  {
    id: 4,
    text: "¿Ha sufrido el paciente alguna lesión cerebral traumática?",
    fieldName: 'brain_injury_history',
    category: 'clinical'
  },
  {
    id: 5,
    text: "¿Tiene el paciente algún diagnóstico psiquiátrico previo?",
    fieldName: 'psychiatric_diagnosis',
    category: 'clinical'
  },
  {
    id: 6,
    text: "¿Hay historial de uso de sustancias en el paciente?",
    fieldName: 'substance_use',
    category: 'clinical'
  },
  {
    id: 7,
    text: "¿Ha presentado el paciente ideación o intentos suicidas?",
    fieldName: 'suicide_ideation',
    category: 'clinical'
  },
  {
    id: 8,
    text: "¿Está tomando actualmente medicación psicotrópica?",
    fieldName: 'psychotropic_medication',
    category: 'clinical'
  },

  // Sociodemographic Factors (10 questions)
  {
    id: 9,
    text: "¿Hubo complicaciones durante el embarazo o parto?",
    fieldName: 'birth_complications',
    category: 'sociodemographic'
  },
  {
    id: 10,
    text: "¿La familia vive en condiciones de pobreza extrema?",
    fieldName: 'extreme_poverty',
    category: 'sociodemographic'
  },
  {
    id: 11,
    text: "¿Tiene el paciente dificultades para acceder a educación adecuada?",
    fieldName: 'education_access_issues',
    category: 'sociodemographic'
  },
  {
    id: 12,
    text: "¿Tiene acceso regular a servicios de salud?",
    fieldName: 'healthcare_access',
    category: 'sociodemographic',
    isInverted: true // "Sí" means true for healthcare_access
  },
  {
    id: 13,
    text: "¿Ha sido diagnosticado con alguna discapacidad?",
    fieldName: 'disability_diagnosis',
    category: 'sociodemographic'
  },
  {
    id: 14,
    text: "¿Cuál es el nivel de apoyo social con el que cuenta?",
    fieldName: 'social_support_level',
    category: 'sociodemographic'
  },
  {
    id: 15,
    text: "¿Fue amamantado durante la infancia?",
    fieldName: 'breastfed_infancy',
    category: 'sociodemographic',
    isInverted: true // "Sí" means true for breastfed
  },
  {
    id: 16,
    text: "¿Ha estado expuesto a violencia doméstica o comunitaria?",
    fieldName: 'violence_exposure',
    category: 'sociodemographic'
  }
];