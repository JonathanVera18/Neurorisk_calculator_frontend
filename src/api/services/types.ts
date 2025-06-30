// src/api/services/types.ts

// Request Types matching backend exactly
export interface PredictionRequest {
  // Demographics
  age: number;
  gender: string; // "M", "F", or "O"
  
  // Clinical Risk Factors (all boolean)
  consanguinity: boolean;
  family_neuro_history: boolean;
  seizures_history: boolean;
  brain_injury_history: boolean;
  psychiatric_diagnosis: boolean;
  substance_use: boolean;
  suicide_ideation: boolean;
  psychotropic_medication: boolean;
  
  // Sociodemographic Factors
  birth_complications: boolean;
  extreme_poverty: boolean;
  education_access_issues: boolean;
  healthcare_access: boolean;
  disability_diagnosis: boolean;
  social_support_level: string; // "strong", "moderate", "weak", "isolated"
  breastfed_infancy: boolean;
  violence_exposure: boolean;
}

export interface AssessmentRequest extends PredictionRequest {
  // Additional fields for storing assessment
  consent_given: boolean;
  clinician_id?: string;
  notes?: string;
}

// Response Types based on actual API response
export interface PredictionResponse {
  risk_score: number;
  risk_level: string; // "low", "moderate", "high"
  confidence_score: number;
  risk_factors: string[];
  protective_factors: string[];
  recommendations: string[];
  feature_importance?: Record<string, number>;
  interpretation?: {
    summary: string;
    description: string;
    confidence_note: string;
    action_priority: string;
    follow_up_months: number;
  };
  model_version?: string;
  assessment_date?: string;
}

export interface AssessmentResponse {
  success: boolean;
  assessment_id: number;
  prediction: PredictionResponse;
  model_version: string;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  detail: string;
  status_code: number;
  timestamp: string;
}

// Question mapping interface
export interface QuestionMapping {
  questionIndex: number;
  fieldName: keyof PredictionRequest;
  transform?: (value: number) => boolean | string;
  defaultValue?: boolean | number | string;
}