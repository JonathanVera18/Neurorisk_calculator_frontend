// Types and interfaces for the Neurodevelopmental Risk Calculator

export interface Question {
  id: number;
  text: string;
}

export interface ApiResponse {
  estimated_risk: string;
}

export type ViewType = 'home' | 'consent' | 'questionnaire' | 'results';

export interface RiskInfo {
  level: string;
  color: string;
  bg: string;
  text: string;
  border: string;
}

export interface ConsentModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export interface QuestionnaireProps {
  onComplete: (responses: number[]) => void;
}

export interface ResultsDisplayProps {
  riskPercentage: string;
  onRestart: () => void;
}

export interface AboutSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface ProgressBarProps {
  current: number;
  total: number;
}

export interface CallToActionProps {
  onStartAssessment: () => void;
}