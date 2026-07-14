import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LandingPage from '../pages/LandingPage';
import WizardPage from '../pages/WizardPage';
import ResultPage from '../pages/ResultPage';
import AboutPage from '../pages/AboutPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="wizard" element={<WizardPage />} />
        <Route path="result" element={<ResultPage />} />
        <Route path="tentang" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
