import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Route-level code splitting: heavy, page-specific dependencies (e.g. GSAP on the
// landing page) are no longer downloaded by visitors who land on another route.
const LandingPage = lazy(() => import('../pages/LandingPage'));
const WizardPage = lazy(() => import('../pages/WizardPage'));
const ResultPage = lazy(() => import('../pages/ResultPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));

/** Neutral placeholder shown while a route chunk is being fetched. */
const RouteFallback: React.FC = () => (
  <div className="flex items-center justify-center w-full min-h-[60vh]" role="status" aria-live="polite">
    <span className="w-8 h-8 border-2 border-secondary/25 border-t-secondary rounded-full animate-spin" />
    <span className="sr-only">Memuat halaman...</span>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<RouteFallback />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="wizard"
          element={
            <Suspense fallback={<RouteFallback />}>
              <WizardPage />
            </Suspense>
          }
        />
        <Route
          path="result"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ResultPage />
            </Suspense>
          }
        />
        <Route
          path="tentang"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AboutPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
