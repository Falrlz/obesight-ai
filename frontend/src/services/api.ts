import axios from 'axios';
import type { PredictRequest, PredictResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictObesity = async (data: PredictRequest): Promise<PredictResponse> => {
  const response = await api.post<PredictResponse>('/predict', data);
  return response.data;
};

export const checkHealth = async (): Promise<{ status: string; model_loaded: boolean }> => {
  const response = await api.get<{ status: string; model_loaded: boolean }>('/health');
  return response.data;
};

export interface ModelInfoResponse {
  model_name: string;
  framework: string;
  features_required: string[];
}

export const getModelInfo = async (): Promise<ModelInfoResponse> => {
  const response = await api.get<ModelInfoResponse>('/model-info');
  return response.data;
};
