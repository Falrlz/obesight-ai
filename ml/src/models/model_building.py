import logging
from sklearn.pipeline import Pipeline
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier

from src.features.preprocessing import build_preprocessor
from src.config.config import RANDOM_STATE, BASELINE_MODELS

logger = logging.getLogger(__name__)


def base_model(model_name: str, **kwargs):
    """
    Declare and return a default machine learning classifier instance by name.

    Args:
        model_name (str): Name of the classifier (e.g., 'KNN', 'SVM', 'RandomForest', 'XGBoost', 'LightGBM').
        **kwargs: Additional parameters passed to the classifier constructor.

    Returns:
        BaseEstimator: The instantiated Scikit-Learn or compatible classifier.
    """
    if model_name == "KNN":
        model = KNeighborsClassifier(**kwargs)
    elif model_name == "SVM":
        model = SVC(random_state=RANDOM_STATE, probability=True, **kwargs)
    elif model_name == "RandomForest":
        model = RandomForestClassifier(random_state=RANDOM_STATE, **kwargs)
    elif model_name == "XGBoost":
        model = XGBClassifier(random_state=RANDOM_STATE, eval_metric='logloss', **kwargs)
    elif model_name == "LightGBM":
        model = LGBMClassifier(random_state=RANDOM_STATE, verbose=-1, **kwargs)
    else:
        logger.error(f"Unrecognized model name: '{model_name}'")
        return None

    logger.info(f"Successfully initialized base classifier: {model_name}")
    return model


def build_pipeline(model_name: str, **kwargs) -> Pipeline:
    """
    Combine the preprocessing pipeline and the classifier into a single Scikit-Learn Pipeline.

    Args:
        model_name (str): Name of the classifier to build.
        **kwargs: Additional parameters for the classifier.

    Returns:
        Pipeline: Combined preprocessing and classification pipeline.
    """
    # Build preprocessor component
    preprocessor = build_preprocessor()
    
    # Initialize the base estimator
    classifier = base_model(model_name, **kwargs)
    
    if classifier is None:
        raise ValueError(f"Failed to create model instance for: {model_name}")
        
    # Construct the final pipeline
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', classifier)
    ])
    
    logger.info(f"Assembled training pipeline for model: {model_name}")
    return pipeline


def baseline_pipelines() -> dict:
    """
    Build empty baseline pipelines for all models defined in the config.

    Returns:
        dict: A dictionary mapping model name to its empty baseline Pipeline.
    """
    logger.info("Building baseline model pipelines...")
    pipelines = {}
    
    # Loop and assemble pipeline for each baseline model configuration
    for name in BASELINE_MODELS:
        pipelines[name] = build_pipeline(name)
        
    return pipelines
