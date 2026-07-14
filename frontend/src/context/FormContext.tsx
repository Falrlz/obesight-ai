import React, { createContext, useContext, useState } from 'react';
import type { FormState, PredictResponse } from '../types';

interface FormContextType {
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  activeStep: number;
  setActiveStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  result: PredictResponse | null;
  setResult: (result: PredictResponse | null) => void;
}

const defaultFormData: FormState = {
  name: '',
  Age: undefined as any,
  Gender: undefined as any,
  Height: undefined as any,
  Weight: undefined as any,
  family_history: undefined as any,
  FAVC: undefined as any,
  FCVC: undefined as any,
  NCP: undefined as any,
  CAEC: undefined as any,
  SMOKE: undefined as any,
  CH2O: undefined as any,
  SCC: undefined as any,
  FAF: undefined as any,
  TUE: undefined as any,
  CALC: undefined as any,
  MTRANS: undefined as any,
  language: 'id',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormState>(defaultFormData);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictResponse | null>(null);

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const resetForm = () => {
    setFormData(defaultFormData);
    setActiveStep(0);
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        activeStep,
        setActiveStep,
        nextStep,
        prevStep,
        resetForm,
        loading,
        setLoading,
        error,
        setError,
        result,
        setResult,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
