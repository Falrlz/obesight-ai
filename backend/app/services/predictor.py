import joblib
import pandas as pd
from pathlib import Path
from sklearn.pipeline import Pipeline
from app.api.schemas import PredictRequest, PredictResponse
from app.services.preprocessor import preprocess_input
from app.services.recommender import generate_recommendations, get_localized_label, get_bmi_category

# Ordered list of classes matching the training target map
CLASS_LABELS = [
    "Insufficient_Weight",
    "Normal_Weight",
    "Overweight_Level_I",
    "Overweight_Level_II",
    "Obesity_Type_I",
    "Obesity_Type_II",
    "Obesity_Type_III"
]

def load_model_file(model_path: Path) -> Pipeline:
    """
    Load the serialized model pipeline from the specified path.

    Args:
        model_path (Path): Path to the serialized model file (.pkl).

    Returns:
        Pipeline: Loaded Scikit-Learn Pipeline object.
    """
    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found at: {model_path}")
    
    return joblib.load(model_path)

def predict_obesity(request: PredictRequest, model: Pipeline) -> PredictResponse:
    """
    Orchestrate the prediction pipeline:
    1. Preprocesses user inputs (calculates BMI, converts Height).
    2. Runs model pipeline to compute probabilities and best prediction.
    3. Fetches localized labels and calculates recommendations.
    4. Combines everything into the PredictResponse schema.

    Args:
        request (PredictRequest): Input user questionnaire.
        model (Pipeline): The loaded Scikit-Learn Pipeline.

    Returns:
        PredictResponse: Formatted validation output response.
    """
    # 1. Preprocess and compute BMI
    df, bmi = preprocess_input(request)

    # 2. Execute model prediction
    # Predict probabilities for each class
    probabilities_raw = model.predict_proba(df)[0]
    
    # Get index of class with highest probability
    prediction_class = int(probabilities_raw.argmax())
    prediction_label = CLASS_LABELS[prediction_class]

    # Map raw float probabilities to class names
    probabilities = {CLASS_LABELS[i]: round(float(prob), 4) for i, prob in enumerate(probabilities_raw)}

    # 3. Handle localization
    lang = request.language if request.language in ["id", "en"] else "id"
    bmi_category = get_bmi_category(bmi, lang)
    prediction_label_id = get_localized_label(prediction_label, lang)

    # 4. Generate rules-based recommendation insights
    recommendations = generate_recommendations(request, prediction_label)

    # 5. Build and return Pydantic response
    return PredictResponse(
        name=request.name,
        bmi=bmi,
        bmi_category=bmi_category,
        prediction_class=prediction_class,
        prediction_label=prediction_label,
        prediction_label_id=prediction_label_id,
        probabilities=probabilities,
        recommendations=recommendations
    )
