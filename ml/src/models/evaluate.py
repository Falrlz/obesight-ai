import os
import logging
import mlflow
import joblib
from sklearn.pipeline import Pipeline

from src.config.config import (
    DEFAULT_TAGS, PRIMARY_METRIC, TUNE_SPACE, 
    TUNE_TRIALS, MODEL_SAVE_DIR, TARGET
)
from src.models.train import train
from src.models.tune import tune_hyperparameters
from src.utils.logger import get_logger

logger = get_logger(__name__)


def evaluate_mlflow(pipeline: Pipeline, name: str, X_test, y_test, phase: str, params: dict = None, duration: float = None) -> dict:
    """
    Evaluate the model pipeline on the test dataset and log parameters/metrics to MLflow.

    Args:
        pipeline (Pipeline): The trained machine learning pipeline.
        name (str): Name of the model classifier.
        X_test (array-like): Test features dataset.
        y_test (array-like): Test labels dataset.
        phase (str): The execution phase tag (e.g., 'baseline', 'tuned').
        params (dict, optional): Custom parameters to log. Defaults to None.
        duration (float, optional): Training duration in seconds. Defaults to None.

    Returns:
        dict: Evaluated metrics dictionary returned by MLflow.
    """
    try:
        # Silence all mlflow sub-loggers to keep the terminal output clean
        for logger_name in list(logging.root.manager.loggerDict.keys()):
            if logger_name.startswith("mlflow"):
                logging.getLogger(logger_name).setLevel(logging.ERROR)

        # Log default metadata tags for tracking
        mlflow.set_tags(DEFAULT_TAGS)

        # Log classification model parameters
        mlflow.log_param("model_type", name)
        if params:
            mlflow.log_params(params)

        # Log training duration metric
        if duration is not None:
            mlflow.log_metric("train_duration_seconds", duration)

        # Register the sklearn model to MLflow artifact store
        model_info = mlflow.sklearn.log_model(pipeline, "model")

        # Copy test features and append target column for mlflow evaluation format
        eval_data = X_test.copy()
        eval_data[TARGET] = y_test

        mlflow.set_tag("phase", phase)

        logger.info(f"Evaluating classifier '{name}' on test set (Phase: {phase})...")
        result = mlflow.models.evaluate(
            model=model_info.model_uri,
            data=eval_data,
            targets=TARGET,
            model_type="classifier",
            evaluators=["default"]
        )

        return result.metrics

    except Exception as e:
        logger.error(f"Failed to log/evaluate model on MLflow: {str(e)}")
        raise e


def compare_baseline(baseline_pipelines_dict: dict, X_train, y_train, X_test, y_test) -> tuple:
    """
    Train and evaluate multiple baseline models on MLflow to find the best starting candidate.

    Args:
        baseline_pipelines_dict (dict): Dictionary mapping model names to empty Pipelines.
        X_train (array-like): Training features.
        y_train (array-like): Training labels.
        X_test (array-like): Test features.
        y_test (array-like): Test labels.

    Returns:
        tuple: A tuple containing:
            - str: Name of the best performing baseline model.
            - Pipeline: The trained pipeline instance of the best model.
            - float: The best baseline score achieved.
    """
    best_score = -1.0
    best_name = None
    best_pipeline = None

    # Iterate through baseline candidates
    for name, pipeline in baseline_pipelines_dict.items():
        logger.info(f"=== Training Baseline Candidate: {name} ===")
        
        # 1. Fit the model using train module
        trained_pipeline, duration = train(pipeline, X_train, y_train)

        # 2. Evaluate performance and log run to MLflow
        with mlflow.start_run(run_name=f"Baseline_{name}"):
            metrics = evaluate_mlflow(
                pipeline=trained_pipeline,
                name=name,
                X_test=X_test,
                y_test=y_test,
                phase="baseline",
                duration=duration
            )

            # Compare performance based on primary metric
            score = metrics.get(PRIMARY_METRIC, 0.0)
            logger.info(f"Baseline model {name} achieved {PRIMARY_METRIC}: {score:.4f}")

            if score > best_score:
                best_score = score
                best_name = name
                best_pipeline = trained_pipeline

    logger.info(f"Best baseline model candidate: {best_name} ({PRIMARY_METRIC}: {best_score:.4f})")
    return best_name, best_pipeline, best_score


def compare_tuned(best_name: str, best_pipeline: Pipeline, best_score: float, X_train, y_train, X_test, y_test) -> Pipeline:
    """
    Tune the best baseline model using Optuna and compare its performance against the default baseline.

    Args:
        best_name (str): Name of the best baseline model.
        best_pipeline (Pipeline): The trained baseline pipeline instance.
        best_score (float): The metric score of the baseline model.
        X_train (array-like): Training features.
        y_train (array-like): Training labels.
        X_test (array-like): Test features.
        y_test (array-like): Test labels.

    Returns:
        Pipeline: The final selected pipeline (either baseline or tuned version).
    """
    # Verify if a search space configuration is available for the model
    if best_name not in TUNE_SPACE:
        logger.info(f"No tuning space config for {best_name}. Defaulting to baseline pipeline.")
        return best_pipeline

    # 1. Run hyperparameter tuning optimization
    tuned_pipeline, best_params = tune_hyperparameters(best_name, X_train, y_train, n_trials=TUNE_TRIALS)
    if tuned_pipeline is None:
        logger.warning("Hyperparameter tuning failed or returned None. Defaulting to baseline pipeline.")
        return best_pipeline

    # 2. Train the pipeline with optimal parameters
    trained_tuned, duration = train(tuned_pipeline, X_train, y_train)

    # 3. Evaluate the tuned model performance in MLflow
    with mlflow.start_run(run_name=f"Tuned_{best_name}"):
        metrics = evaluate_mlflow(
            pipeline=trained_tuned,
            name=best_name,
            X_test=X_test,
            y_test=y_test,
            phase="tuned",
            params=best_params,
            duration=duration
        )

        tuned_score = metrics.get(PRIMARY_METRIC, 0.0)
        logger.info(f"Tuned model {best_name} achieved {PRIMARY_METRIC}: {tuned_score:.4f} (vs Baseline: {best_score:.4f})")

        # Compare and return the winner model
        if tuned_score > best_score:
            logger.info(f"Tuned model outperforms default baseline ({tuned_score:.4f} > {best_score:.4f}). Selecting tuned model.")
            return trained_tuned

    logger.info(f"Tuned model did not outperform baseline. Retaining baseline model ({best_score:.4f}).")
    return best_pipeline


def save_best_model(model: Pipeline) -> None:
    """
    Save the selected best model pipeline to a serialized pickle file on disk.

    Args:
        model (Pipeline): The winning model pipeline.
    """
    model_path = MODEL_SAVE_DIR / "best_model.pkl"
    
    # Ensure save directory exists
    os.makedirs(model_path.parent, exist_ok=True)
    
    # Serialize and export model
    joblib.dump(model, model_path)
    logger.info(f"Winning model pipeline successfully saved to disk at: {model_path}")
