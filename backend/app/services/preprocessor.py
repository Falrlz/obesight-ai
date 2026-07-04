import pandas as pd
from app.api.schemas import PredictRequest

def preprocess_input(request: PredictRequest) -> tuple[pd.DataFrame, float]:
    """
    Preprocess the raw PredictRequest:
    1. Converts Height from centimeters (cm) to meters (m) as required by the model.
    2. Calculates Body Mass Index (BMI) = Weight (kg) / Height (m)^2.
    3. Builds a pandas DataFrame with features named and ordered exactly as expected by the model.

    Args:
        request (PredictRequest): Validated input request.

    Returns:
        tuple[pd.DataFrame, float]: A tuple containing the prepared pandas DataFrame for inference 
                                     and the computed BMI value.
    """
    # 1. Convert height from cm to meters
    height_m = request.Height / 100.0

    # 2. Calculate BMI
    bmi = request.Weight / (height_m ** 2)

    # 3. Create dict with features in the exact expected order
    features = {
        "Age": request.Age,
        "Height": height_m,
        "Weight": request.Weight,
        "BMI": bmi,
        "FCVC": request.FCVC,
        "NCP": request.NCP,
        "CH2O": request.CH2O,
        "FAF": request.FAF,
        "TUE": request.TUE,
        "Gender": request.Gender,
        "family_history": request.family_history,
        "FAVC": request.FAVC,
        "SMOKE": request.SMOKE,
        "SCC": request.SCC,
        "CAEC": request.CAEC,
        "CALC": request.CALC,
        "MTRANS": request.MTRANS
    }

    # 4. Convert to a single-row Pandas DataFrame
    df = pd.DataFrame([features])

    return df, round(bmi, 2)
