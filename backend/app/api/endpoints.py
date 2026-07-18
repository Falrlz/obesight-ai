from fastapi import APIRouter, Request, HTTPException, status
from app.api.schemas import PredictRequest, PredictResponse, ModelInfoResponse
from app.services.predictor import predict_obesity

router = APIRouter(prefix="/api/v1")

@router.post(
    "/predict", 
    response_model=PredictResponse, 
    summary="Perform inference to predict obesity level and output recommendations"
)
def predict(request: Request, payload: PredictRequest):
    # Retrieve the model from the shared application state
    model = getattr(request.app.state, "model", None)
    
    if model is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model is not loaded on the server. Please check logs."
        )
        
    try:
        response = predict_obesity(payload, model)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference processing error: {str(e)}"
        )

@router.get(
    "/health", 
    summary="Check API status and model load status"
)
def health_check(request: Request):
    model = getattr(request.app.state, "model", None)
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

@router.get(
    "/model-info", 
    response_model=ModelInfoResponse, 
    summary="Get model features and metadata details"
)
def get_model_info():
    return ModelInfoResponse(
        model_name="Random Forest Classifier",
        framework="scikit-learn Pipeline",
        features_required=[
            "Age", "Height", "Weight", "BMI", "FCVC", "NCP", "CH2O", 
            "FAF", "TUE", "Gender", "family_history", "FAVC", "SMOKE", 
            "SCC", "CAEC", "CALC", "MTRANS"
        ]
    )
