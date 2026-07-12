import React from 'react';
import step1Illustration from '../../assets/illustrations/step-1.svg';
import step2Illustration from '../../assets/illustrations/step-2.svg';
import step3Illustration from '../../assets/illustrations/step-3.svg';
import step4Illustration from '../../assets/illustrations/step-4.svg';

interface StepVisualizerProps {
  activeStep: number;
}

const ILLUSTRATIONS = [step1Illustration, step2Illustration, step3Illustration, step4Illustration];

export const StepVisualizer: React.FC<StepVisualizerProps> = ({ activeStep }) => {
  const src = ILLUSTRATIONS[activeStep];

  if (!src) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 min-h-[300px] lg:min-h-[400px] overflow-hidden select-none">
      {/* Rotating dashed rings */}
      <div className="absolute top-6 right-8 w-10 h-10 border border-dashed border-secondary/25 rounded-full animate-spin-slow" />
      <div className="absolute bottom-8 left-6 w-7 h-7 border border-dashed border-secondary/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '10s' }} />

      {/* Floating particles scattered across the full height so the card never feels empty */}
      <div className="absolute top-1/4 left-8 w-1.5 h-1.5 bg-secondary/40 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-2 h-2 bg-secondary/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute top-10 left-1/3 w-1 h-1 bg-secondary/50 rounded-full animate-pulse" style={{ animationDuration: '2.2s' }} />
      <div className="absolute bottom-12 right-1/3 w-1 h-1 bg-secondary/40 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/3 right-6 w-1.5 h-1.5 bg-secondary/35 rounded-full animate-bounce" style={{ animationDuration: '3.5s' }} />
      <div className="absolute bottom-1/3 left-10 w-1 h-1 bg-secondary/45 rounded-full animate-pulse" style={{ animationDuration: '2.8s' }} />

      {/* Illustration */}
      <img
        key={activeStep}
        src={src}
        alt=""
        aria-hidden="true"
        className="relative w-full max-w-[300px] h-auto drop-shadow-[0_16px_32px_rgba(6,95,70,0.18)] animate-float animate-fade-in"
      />
    </div>
  );
};
export default StepVisualizer;
