# Obesight AI - Frontend

This is the interactive frontend application for **Obesight AI**, built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **react-i18next**. It provides a step-by-step screening wizard and a visual health dashboard.

## Features

- **Step-by-Step Screening Form** → Form wizard split into 4 steps: physical metrics, nutrition patterns, activity levels, and daily lifestyle habits.
- **Visual Analytics Dashboard** → Features a dynamic gauge for BMI calculations, ML probability distributions via bar charts, and a checkable action plan.
- **Full Bilingual Support (i18n)** → Smooth, instant language switching (Indonesian ↔ English) across all components, forms, and results.
- **Fluid Animation System** → Premium UI animations powered by **GSAP (GreenSock)**.

## Project Structure

```
frontend/
├── public/                 # Static assets (favicons, static icons)
├── src/
│   ├── assets/             # Images and SVG illustrations
│   │   └── illustrations/  # Questionnaire step illustrations
│   │
│   ├── components/         # Reusable React components
│   │   ├── dashboard/      # Results widgets (BMIGauge, ProbChart, InsightCards, ConfidenceRing)
│   │   ├── landing/        # Home sections (Hero, Mission, Features, HowItWorks)
│   │   ├── layout/         # Navigation & footer (Navbar, Footer)
│   │   └── wizard/         # Form step wizard cards (Step1 s.d Step4)
│   │
│   ├── context/            # React context for multi-step form state (FormContext)
│   ├── locales/            # i18n translation source files (id.json, en.json)
│   ├── pages/              # Main route views (LandingPage, AboutPage, WizardPage, ResultPage)
│   ├── services/           # API integration calls (api.ts)
│   ├── utils/              # Calculation helpers & themes (resultStatus.ts)
│   │
│   ├── i18n.ts             # react-i18next configuration
│   ├── main.tsx            # Main React client entry point
│   └── App.tsx             # Root component and router
```

## Key Mechanisms

### 1. Form State Management (`FormContext.tsx`)
- Form inputs are managed globally using React Context. This preserves entered data if the user navigates back and forth between wizard steps.
- **Bilingual Syncing:** An effect listener watches `i18n.language` and dynamically syncs the active language code into the form state (`formData.language`). This ensures the machine learning backend returns recommendations in the requested language.

### 2. Localization Integration
- Translations are configured in `src/i18n.ts`. They use `id.json` and `en.json` from the `src/locales/` directory.
- Use `useTranslation()` React hooks inside components to fetch key-based translations:
  ```tsx
  const { t } = useTranslation();
  return <h1>{t('landing.hero.title')}</h1>;
  ```

### 3. Dynamic Dashboard Metrics
- **BMI Visualizer (`BMIGauge.tsx`):** Renders the calculated BMI on a color-coded gauge representing underweight, healthy, overweight, and obese ranges based on WHO parameters.
- **Probability Distribution (`ProbChart.tsx`):** Uses **Recharts** to plot a horizontal bar chart displaying model confidence score percentages for all 7 target classes.

## Development Scripts

Run scripts from the `frontend/` directory:

### Run Development Server
```bash
npm run dev
```
Launches the local Vite server at `http://localhost:5173`.

### Compile Production Build
```bash
npm run build
```
Typechecks TS files with `tsc` and compiles optimized production assets into the `dist/` directory.

### Preview Production Build Locally
```bash
npm run preview
```
Serves the compiled `dist/` folder locally for sanity testing.
