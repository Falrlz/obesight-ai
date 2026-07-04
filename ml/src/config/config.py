from pathlib import Path

# Project Root
BASE_DIR = Path(__file__).resolve().parent.parent.parent
RAW_DATA_PATH = BASE_DIR / "dataset" / "raw" / "obesity_prediction_raw.csv"
PROCESSED_DATA_PATH = BASE_DIR / "dataset" / "processed" / "obesity_prediction_processed.csv"

# Target, Features Partitioning
TARGET = "Obesity"

NUM_FEATURES = [
    "Age",
    "Height",
    "Weight",
    "BMI",
    "FCVC",
    "NCP",
    "CH2O",
    "FAF",
    "TUE"
]

BINARY_FEATURES = [
    "Gender",
    "family_history",
    "FAVC",
    "SMOKE",
    "SCC"
]

ORDINAL_FEATURES = [
    "CAEC",
    "CALC"
]

NOMINAL_FEATURES = [
    "MTRANS"
]

# Target, Features Mapping
ORDINAL_MAP = {

    "CAEC": {
        "no": 0,
        "Sometimes": 1,
        "Frequently": 2,
        "Always": 3
    },

    "CALC": {
        "no": 0,
        "Sometimes": 1,
        "Frequently": 2,
        "Always": 3
    }
}

TARGET_MAP = {
    "Insufficient_Weight": 0,
    "Normal_Weight": 1,
    "Overweight_Level_I": 2,
    "Overweight_Level_II": 3,
    "Obesity_Type_I": 4,
    "Obesity_Type_II": 5,
    "Obesity_Type_III": 6
}

# Model Config
RANDOM_STATE = 42
TEST_SIZE = 0.2
BASELINE_MODELS = ["KNN", "SVM", "RandomForest", "XGBoost", "LightGBM"]
PRIMARY_METRIC = "accuracy_score"
MODEL_SAVE_DIR = BASE_DIR / "models"

# Hyperparameter Tuning Config
CV_SCORING_METRIC = "accuracy"
CV_FOLDS = 3
TUNE_TRIALS = 5

# Hyperparameter Tuning Space
TUNE_SPACE = {
    "KNN": {
        'n_neighbors': (3, 25),
        'p': (1, 2)
    },
    "SVM": {
        'C': (0.1, 10.0),
        'gamma': (0.001, 1.0)
    },
    "RandomForest": {
        'n_estimators': (50, 300),
        'max_depth': (3, 20),
        'min_samples_split': (2, 10)
    },
    "XGBoost": {
        'n_estimators': (50, 300),
        'max_depth': (3, 10),
        'learning_rate': (0.01, 0.3),
        'subsample': (0.5, 1.0),
        'colsample_bytree': (0.5, 1.0)
    },
    "LightGBM": {
        'n_estimators': (50, 300),
        'max_depth': (3, 10),
        'learning_rate': (0.01, 0.3),
        'subsample': (0.5, 1.0),
        'colsample_bytree': (0.5, 1.0)
    }
}

# MLflow Config
EXPERIMENT_NAME = "Obesity_Prediction_Project"
MLFLOW_DIR = BASE_DIR / "mlruns"
MLFLOW_TRACKING_URI = f"sqlite:///{MLFLOW_DIR / 'mlruns.db'}"
ARTIFACT_LOCATION = f"file:///{MLFLOW_DIR.as_posix()}"
DEFAULT_TAGS = {
    "project": "obesight-ai",
    "created_by": "falrlz",
    "environment": "development"
}