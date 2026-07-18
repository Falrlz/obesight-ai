# Obesight AI - Backend API

Obesight Backend is a stateless API service built on **FastAPI (Python)** that serves as the inference engine and health insights engine. It processes user questionnaire data (17 anthropometric and behavioral variables) and executes the serialized Machine Learning pipeline (`best_model.pkl` trained using LightGBM) in real-time to classify obesity levels and formulate personalized health recommendations in Indonesian or English.

---

## Key Features

- **High Performance**: Built using FastAPI and Uvicorn (ASGI server) for minimal latency.
- **Inference Engine**: Loads the serialized ML pipeline (`joblib`) into memory at application startup for optimal prediction performance.
- **Insight & Recommendation Engine**: Evaluates rule-based behavioral inputs (e.g., water consumption, physical activity, screen time, etc.) to generate personalized health suggestions.
- **Bilingual Support**: Generates prediction labels and recommendations in two languages: **Indonesian (`id`)** and **English (`en`)**.
- **Automated Data Validation**: Uses Pydantic v2 schemas to validate input data integrity before processing.
- **Automated API Documentation**: Provides built-in Swagger UI (`/docs`) and ReDoc (`/redoc`) interactive endpoints.

---

## Tech Stack & Dependencies

The backend service relies on the following key libraries (listed in [requirements.txt](file:///d:/project/obesight-ai/backend/requirements.txt)):
- **Framework**: FastAPI (v0.136.3), Uvicorn (v0.48.0)
- **Data Science & ML**: Pandas (v2.3.3), NumPy (v2.4.6), Scikit-Learn (v1.8.0), LightGBM (v4.6.0), Joblib (v1.5.3)
- **Utilities & Testing**: Python-dotenv, Pytest, HTTPX

---

## Directory Structure

```text
backend/
├── app/
│   ├── api/
│   │   ├── endpoints.py     # API router definitions (/predict, /health, /model-info)
│   │   └── schemas.py       # Pydantic request & response schemas
│   ├── core/
│   │   └── config.py        # Application settings & environment configuration
│   ├── services/
│   │   ├── predictor.py     # Inference logic and model loading
│   │   ├── preprocessor.py  # Data cleaning & BMI calculation
│   │   └── recommender.py   # Bilingual rule-based health recommendation engine
│   └── main.py              # Main application entry point & Lifespan initialization
├── tests/
│   └── test_api.py          # Integration & unit tests for API and recommendations
├── .env                     # Local environment configuration file
└── requirements.txt         # Python dependencies checklist
```

---

## Setup & Installation

### 1. Prerequisites
Make sure you have **Python 3.10** or newer installed on your system.

### 2. Enter Backend Directory
```bash
cd d:/project/obesight-ai/backend
```

### 3. Create and Activate Virtual Environment
On Windows (PowerShell/CMD):
```powershell
# Create virtual environment
python -m venv .venv

# Activate in PowerShell
.venv\Scripts\Activate.ps1

# Activate in CMD
.venv\Scripts\activate.bat
```
On macOS/Linux:
```bash
python -m venv .venv
source .venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 5. Environment Configuration (`.env`)
Create a file named `.env` in the backend root directory (`backend/`) and configure variables:
```env
APP_NAME="Obesight AI"
DEBUG=true
HOST=127.0.0.1
PORT=8000
MODEL_PATH="../ml/models/best_model.pkl"
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

---

## Running Development Server

Run Uvicorn in hot-reload mode to automatically pick up code changes:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Once started successfully, you can access:
- **API Base URL**: `http://127.0.0.1:8000/`
- **Swagger UI Documentation**: `http://127.0.0.1:8000/docs`
- **ReDoc Documentation**: `http://127.0.0.1:8000/redoc`

---

## Running Unit Tests

Automated unit tests are written with `pytest` to verify input formatting, system health, BMI calculation, and bilingual recommendation generation logic.

To run all tests, execute the following command inside the `backend/` folder:

```bash
pytest -v
```

---

## API Endpoints Specifications

### 1. `POST /api/v1/predict` (Prediction & Recommendation Endpoint)
Submits user survey answers and retrieves the predicted obesity category alongside specific health guidance.

- **Request Body (JSON)**:
```json
{
  "name": "Budi",
  "Age": 21.0,
  "Gender": "Male",
  "Height": 165.0,
  "Weight": 70.0,
  "family_history": "yes",
  "FAVC": "yes",
  "FCVC": 2.0,
  "NCP": 3.0,
  "CAEC": "Sometimes",
  "SMOKE": "no",
  "CH2O": 2.0,
  "SCC": "no",
  "FAF": 1.0,
  "TUE": 1.0,
  "CALC": "Sometimes",
  "MTRANS": "Public_Transportation",
  "language": "id"
}
```
*Note: `Height` is provided in centimeters (cm) for user convenience, and the backend converts it to meters (m) internally.*

- **Response Body (JSON)**:
```json
{
  "name": "Budi",
  "bmi": 25.71,
  "bmi_category": "Berat Badan Lebih",
  "prediction_class": 3,
  "prediction_label": "Overweight_Level_II",
  "prediction_label_id": "Kelebihan Berat Badan Tingkat II",
  "probabilities": {
    "Insufficient_Weight": 0.0012,
    "Normal_Weight": 0.0456,
    "Overweight_Level_I": 0.1258,
    "Overweight_Level_II": 0.7891,
    "Obesity_Type_I": 0.0383,
    "Obesity_Type_II": 0.0,
    "Obesity_Type_III": 0.0
  },
  "recommendations": {
    "general": "Kondisi fisik Anda menunjukkan berat badan berlebih (overweight). Fokuslah pada defisit kalori ringan, perbaikan pola makan harian, dan peningkatan aktivitas fisik harian untuk kembali ke rentang berat badan ideal.",
    "specific": [
      "Anda kadang-kadang mengonsumsi sayuran. Tingkatkan asupan tersebut agar selalu ada di setiap makan utama guna mencukupi kebutuhan mikronutrisi dan menjaga kesehatan pencernaan Anda.",
      "Anda minum di antara 1 hingga 2 liter air mineral per hari. Usahakan untuk meningkatkannya hingga mencapai minimal 2 liter per hari.",
      "Aktivitas fisik Anda baru 1-2 hari seminggu. Cobalah naikkan intensitasnya secara perlahan menjadi 3 hari seminggu.",
      "Anda sering mengonsumsi makanan berkalori tinggi (fast food, gorengan). Batasi frekuensinya menjadi maksimal 1-2 kali seminggu, dan gantilah dengan masakan rumahan yang diolah dengan cara dikukus, direbus, atau dipanggang.",
      "Anda belum memantau asupan kalori harian. Untuk membantu mengontrol berat badan, Anda bisa mulai mencatat makanan harian secara berkala."
    ]
  }
}
```

### 2. `GET /api/v1/health` (Health Check)
Verifies the server's operational status and model availability.

- **Response (JSON)**:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### 3. `GET /api/v1/model-info` (Model Metadata)
Returns metadata about the active ML model classifier.

- **Response (JSON)**:
```json
{
  "model_name": "LightGBM Classifier",
  "framework": "scikit-learn Pipeline",
  "features_required": [
    "Age", "Height", "Weight", "BMI", "FCVC", "NCP", "CH2O", "FAF", "TUE", 
    "Gender", "family_history", "FAVC", "SMOKE", "SCC", "CAEC", "CALC", "MTRANS"
  ]
}
```

---

## Inference Process Pipeline

1. **Unit Conversion**: The user's height (`cm`) is converted into meters (`Height / 100`).
2. **BMI Calculation**: Calculates Body Mass Index via: $\text{BMI} = \frac{\text{Weight (kg)}}{\text{Height (m)}^2}$.
3. **Dataframe Assembly**: Prepares inputs inside a sorted `pandas.DataFrame` structured to match the model's feature order.
4. **ML Prediction**: Triggers `.predict_proba()` on the serialized scikit-learn Pipeline object to get weight class probabilities.
5. **Guidance Assembly**: Generates rule-based recommendations tailored to individual habits (e.g., prompting hydration if `CH2O` is low).
