import logging
import optuna
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline

from src.config.config import TUNE_SPACE, CV_SCORING_METRIC, CV_FOLDS
from src.models.model_building import build_pipeline

logger = logging.getLogger(__name__)

# List of hyperparameter names that should use a logarithmic scale during search
LOG_SCALE_PARAMS = {'learning_rate', 'C', 'gamma'}


def _suggest_optuna_params(trial: optuna.Trial, space: dict) -> dict:
    """
    Suggest trial parameters from a defined config search space.

    Args:
        trial (optuna.Trial): The current trial instance.
        space (dict): Dict mapping parameter names to search range tuples.

    Returns:
        dict: Dict containing suggested parameter names and values.
    """
    params = {}
    
    # Iterate through the parameter search space definition
    for name, (low, high) in space.items():
        if isinstance(low, float) or isinstance(high, float):
            # Check if parameter requires logarithmic scale suggestions
            use_log = name in LOG_SCALE_PARAMS
            params[name] = trial.suggest_float(name, low, high, log=use_log)
        else:
            # Handle integer ranges
            params[name] = trial.suggest_int(name, low, high)
            
    return params


def tune_hyperparameters(model_name: str, X_train, y_train, n_trials: int = 10) -> tuple:
    """
    Search for optimal hyperparameters using Optuna with Cross-Validation.

    Args:
        model_name (str): Name of the classifier to optimize.
        X_train (array-like): Training features.
        y_train (array-like): Training labels.
        n_trials (int): Number of optimization trials to run.

    Returns:
        tuple: A tuple containing:
            - Pipeline: An unfitted pipeline initialized with the best parameters.
            - dict: The best hyperparameters dictionary found.
    """
    # Check if a tuning space exists for the given classifier
    if model_name not in TUNE_SPACE:
        logger.warning(f"No hyperparameter tuning space defined for model: {model_name}")
        return None, None

    space = TUNE_SPACE[model_name]

    # Define the objective function for Optuna optimization
    def objective(trial):
        params = _suggest_optuna_params(trial, space)
        try:
            # Build pipeline with suggested parameters
            pipeline = build_pipeline(model_name, **params)
            
            # Evaluate using Cross-Validation
            scores = cross_val_score(
                pipeline, X_train, y_train, 
                cv=CV_FOLDS, 
                scoring=CV_SCORING_METRIC, 
                n_jobs=-1
            )
            return scores.mean()
        except Exception as e:
            logger.error(f"Error during Optuna trial evaluation: {str(e)}")
            return 0.0

    logger.info(f"Starting hyperparameter tuning for {model_name} with {n_trials} trials...")
    
    # Minimize Optuna's verbose log outputs
    optuna.logging.set_verbosity(optuna.logging.WARNING)
    
    # Create and run the Optuna study
    study = optuna.create_study(direction="maximize", study_name=f"{model_name}_tuning")
    study.optimize(objective, n_trials=n_trials)

    best_val = study.best_trial.value
    best_params = study.best_params
    
    logger.info(f"Tuning finished - Best validation {CV_SCORING_METRIC}: {best_val:.4f}")
    logger.info(f"Optimal hyperparameters: {best_params}")

    # Emit warning if the performance is relatively low
    if best_val < 0.5:
        logger.warning(f"Tuning for {model_name} resulted in a low validation score of {best_val:.4f}")

    # Build a fresh pipeline configuration with the best parameters
    best_pipeline = build_pipeline(model_name, **best_params)
    
    return best_pipeline, best_params
