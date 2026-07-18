import os
import json
from pathlib import Path
from dotenv import load_dotenv

# Resolve the backend root directory (backend/)
BASE_DIR = Path(__file__).resolve().parent.parent.parent
dotenv_path = BASE_DIR / ".env"

# Load environment variables from .env
load_dotenv(dotenv_path=dotenv_path)

APP_NAME = os.getenv("APP_NAME", "Obesight AI")
DEBUG = os.getenv("DEBUG", "true").lower() == "true"
HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", "8000"))

# Resolve model path dynamically
model_path_str = os.getenv("MODEL_PATH", "../ml/models/best_model.pkl")
model_path_obj = Path(model_path_str)

if not model_path_obj.is_absolute():
    # If path is relative (e.g. starting with ../), resolve it relative to backend root
    MODEL_PATH = (BASE_DIR / model_path_obj).resolve()
else:
    MODEL_PATH = model_path_obj.resolve()

# Parse ALLOWED_ORIGINS JSON array or fallback to comma-separated values
allowed_origins_raw = os.getenv("ALLOWED_ORIGINS")
if allowed_origins_raw:
    try:
        ALLOWED_ORIGINS = json.loads(allowed_origins_raw)
    except (json.JSONDecodeError, TypeError):
        ALLOWED_ORIGINS = [orig.strip() for orig in allowed_origins_raw.split(",") if orig.strip()]
else:
    ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:5173"]
