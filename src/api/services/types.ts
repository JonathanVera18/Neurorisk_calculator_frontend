
// Request Types
export interface PredictionRequest {
  // Demographics
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Clinical Risk Factors
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
  social_support_level: 'strong' | 'moderate' | 'weak' | 'isolated';
  breastfed_infancy: boolean;
  violence_exposure: boolean;
}

export interface AssessmentRequest extends PredictionRequest {
  // Additional fields for storing assessment
  consent_given: boolean;
  clinician_id?: string;
  notes?: string;
}

// Response Types
export interface PredictionResponse {
  risk_score: number;
  risk_level: 'low' | 'moderate' | 'high';
  confidence_score: number;
  risk_factors: string[];
  protective_factors: string[];
  recommendations: string[];
  interpretation: {
    summary: string;
    description: string;
    confidence_note: string;
    action_priority: 'routine' | 'elevated' | 'urgent';
    follow_up_months: number;
  };
  feature_importance?: Record<string, number>;
  model_version: string;
  assessment_date: string;
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

export interface StatsResponse {
  total_assessments: number;
  assessments_by_risk_level: {
    low: number;
    moderate: number;
    high: number;
  };
  assessments_by_gender: Record<string, number>;
  average_risk_score: number;
  average_age: number;
  most_common_risk_factors: Array<{
    factor: string;
    frequency: number;
  }>;
  model_performance: {
    accuracy?: number;
    auc_roc?: number;
    f1_score?: number;
  };
  recent_trends: {
    assessments_last_30_days: number;
    average_risk_last_30_days: number;
    high_risk_percentage: number;
  };
}

export interface LoginRequest {
  api_key: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scopes: string[];
}

// Health check
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  timestamp: string;
  services: {
    database: {
      status: string;
      response_time_ms?: number;
    };
    ml_model: {
      status: string;
      version?: string;
      memory_usage_mb?: number;
    };
    cache?: {
      status: string;
      hit_rate?: number;
    };
  };
}