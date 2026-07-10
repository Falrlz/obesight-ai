import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import Hero from '../components/landing/Hero';
import Mission from '../components/landing/Mission';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetForm } = useFormContext();

  useIntersectionObserver(
    'section:not(#features) > div',
    ['opacity-0', 'translate-y-10'],
    ['opacity-100', 'translate-y-0'],
    'landing'
  );

  const handleStartAnalysis = () => {
    resetForm();
    navigate('/wizard');
  };

  return (
    <div className="w-full">
      <Hero onStartAnalysis={handleStartAnalysis} />
      <Mission />
      <Features />
      <HowItWorks />
    </div>
  );
};

export default LandingPage;
