# Obesight AI

**Never screen your obesity risk blindly again.**

Have you ever struggled to understand your physical evaluation and obesity risk factors due to confusing medical numbers and complex statistics?

**Obesight AI** helps you monitor, assess, and understand your obesity risk level and provides personalized lifestyle recommendations using a high-performance machine learning model (LightGBM) and an interactive bilingual dashboard.

## Preview

![Obesight UI Icon](frontend/public/favicon.svg)

## What It Does

- **Risk Classification** → Classifies body conditions into 7 categories of obesity and weight levels.
- **Bilingual Interface** → Instant full-stack toggling between Indonesian and English for both the UI and recommendations.
- **Personalized Action Plan** → Generates tailored daily habit suggestions based on your eating, exercise, and hydration levels.
- **Fast Analytics** → Instant ML pipeline inference responding in milliseconds.

## How It Works

### 1. Questionnaire Submission
- The user fills out a 4-step wizard form capturing physical attributes, eating patterns, activity frequencies, and daily habits.

### 2. ML Model Inference
- Input features are normalized and processed by a pre-trained **LightGBM Classifier** pipeline to identify weight risk categories.

### 3. Dynamic Recommender
- The backend matches ML predictions and user answers to compile a targeted list of daily lifestyle, hydration, and exercise guidelines.

### 4. Interactive Dashboard
- Renders an interactive results dashboard featuring a BMI gauge, AI probability distribution charts, and a checkable action plan.

## Key Features

### Machine Learning
- **LightGBM Classifier** pipeline achieving high classification accuracy.
- Pipeline integration using Scikit-Learn transformers for numerical scaling and categorical encoding.

### Bilingual (i18n) Sync
- Full-stack localization synchronizes the frontend active language (`react-i18next`) with the backend recommendations API.
- Instant, client-side translation updates without reloading the application.

### Visual Dashboard
- Interactive **BMI Gauge** matching WHO categorization scales.
- Probability distribution bar charts built with **Recharts** visualizing classifier confidence.
- Interactive action checklists for progress monitoring.

## Project Architecture

```
obesight-ai/
├── backend/            # FastAPI application (API layer)
│   ├── app/
│   │   ├── api/        # API routers & schema definitions
│   │   ├── core/       # Configurations & environment settings
│   │   └── services/   # Predictor & Recommender logic
│   └── tests/          # Integration & unit tests
│
├── frontend/           # React + TS + Vite application (Presentation layer)
│   ├── src/
│   │   ├── components/ # Reusable UI components & Dashboard cards
│   │   ├── context/    # Global form state management
│   │   ├── locales/    # Translations (id.json, en.json)
│   │   ├── pages/      # Page components (Landing, About, Wizard, Result)
│   │   └── main.tsx    # Frontend entry point
│   └── public/         # Static public assets
│
├── ml/                 # Machine learning training & pipeline development
│   ├── dataset/        # Training dataset files
│   ├── models/         # Serialized LightGBM models (.pkl)
│   ├── notebooks/      # Jupyter notebooks for EDA and experimentation
│   └── src/            # Preprocessing & training python modules
│
├── docs/               # Technical specs & user guides
└── README.md           # Master project documentation
```

## Technology Stack

### Frontend
- **React 18** & **TypeScript**
- **Vite** → Fast module bundler & dev server
- **Tailwind CSS** → Modern utility-first CSS styling
- **react-i18next** → Internationalization framework
- **Recharts** → SVG charts library
- **GSAP (GreenSock)** → High-performance user interface animations

### Backend
- **FastAPI** → Modern, high-performance web framework for Python APIs
- **Uvicorn** → Lightning-fast ASGI server implementation
- **Pydantic** → Data validation and settings management using Python type hints
- **Joblib** & **Scikit-Learn** → ML pipeline serialization and inference

### Machine Learning
- **LightGBM** → Gradient boosting framework
- **Pandas** & **NumPy** → Data manipulation & engineering
- **Seaborn** & **Matplotlib** → Data visualization during EDA

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Falrlz/obesight-ai.git
cd obesight-ai
```

### 2. Run the Backend API
```bash
cd backend
# Create and activate a virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload
```
The API documentation will be available at `http://127.0.0.1:8000/docs`.

### 3. Run the Frontend App
```bash
cd ../frontend
# Install packages
npm install

# Run dev server
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

## Environment Configuration

Configure the backend `.env` variables:
```env
MODEL_PATH=app/core/../../ml/models/best_model_pipeline.pkl
# Add other configurations if needed
```

## Disclaimer

- **ObeSight AI** is a quick lifestyle screening tool designed for initial assessment and educational purposes.
- Predictions and recommendations generated by this tool are **not substitutes for professional medical advice, diagnosis, or treatment**. Always consult a qualified medical professional for health concerns.
