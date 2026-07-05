export interface PredictRequest {
  name: string;
  Age: number;
  Gender: 'Male' | 'Female';
  Height: number; // in cm
  Weight: number; // in kg
  family_history: 'yes' | 'no';
  FAVC: 'yes' | 'no';
  FCVC: number; // 1 to 3
  NCP: number; // 1 to 4
  CAEC: 'no' | 'Sometimes' | 'Frequently' | 'Always';
  SMOKE: 'yes' | 'no';
  CH2O: number; // 1 to 3
  SCC: 'yes' | 'no';
  FAF: number; // 0 to 3
  TUE: number; // 0 to 2
  CALC: 'no' | 'Sometimes' | 'Frequently' | 'Always';
  MTRANS: 'Automobile' | 'Motorbike' | 'Bike' | 'Public_Transportation' | 'Walking';
  language: 'id' | 'en';
}

export interface PredictResponse {
  name: string;
  bmi: number;
  bmi_category: string;
  prediction_class: number;
  prediction_label: string;
  prediction_label_id: string;
  probabilities: Record<string, number>;
  recommendations: {
    general: string;
    specific: string[];
  };
}

export interface FormState extends Omit<PredictRequest, 'language'> {
  language: 'id' | 'en';
}
