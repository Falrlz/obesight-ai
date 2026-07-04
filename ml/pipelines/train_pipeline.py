import mlflow
from src.data.data_loader import load_processed_data
from src.features.preprocessing import encode_target
from src.data.data_splitter import split_data
from src.models.model_building import baseline_pipelines
from src.models.evaluate import compare_baseline, compare_tuned, save_best_model
from src.config.config import EXPERIMENT_NAME, MLFLOW_TRACKING_URI, ARTIFACT_LOCATION
from src.utils.logger import get_logger

logger = get_logger(__name__)


def run_train_model():
    """
    Execute the model training, hyperparameter tuning, and evaluation pipeline.
    This connects to MLflow, splits training/testing data, trains baselines,
    tunes the best performer using Optuna, and exports the final model pickle.
    """
    logger.info("=== Starting Model Training & Evaluation Pipeline ===")
    
    # Step 1: Initialize MLflow connection and tracking experiment settings
    logger.info("Step 1: Setting up MLflow experiment...")
    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    experiment = mlflow.get_experiment_by_name(EXPERIMENT_NAME)
    if experiment is None:
        mlflow.create_experiment(EXPERIMENT_NAME, artifact_location=ARTIFACT_LOCATION)
    mlflow.set_experiment(EXPERIMENT_NAME)

    # Step 2: Load clean processed dataset from disk
    logger.info("Step 2: Loading processed dataset...")
    df_processed_raw = load_processed_data()
    
    # Step 3: Encode nominal target variables and perform split to train/test subsets
    logger.info("Step 3: Encoding target labels and splitting dataset...")
    df_processed = encode_target(df_processed_raw)
    X_train, X_test, y_train, y_test = split_data(df_processed)

    # Step 4: Build and train baseline models, comparing to select the best candidate
    logger.info("Step 4: Assembling baseline models and finding the best baseline candidate...")
    pipelines = baseline_pipelines()
    best_name, best_pipeline, best_score = compare_baseline(
        pipelines, X_train, y_train, X_test, y_test
    )

    # Step 5: Tune the selected best baseline candidate using Optuna framework
    logger.info("Step 5: Optimizing hyperparameters of the best model candidate...")
    final_pipeline = compare_tuned(
        best_name, best_pipeline, best_score, X_train, y_train, X_test, y_test
    )

    # Step 6: Export the final winning model pipeline object to serialized file
    logger.info("Step 6: Exporting the winning model pipeline to serialized pickle file...")
    save_best_model(final_pipeline)
    
    logger.info("=== Model Training & Evaluation Completed successfully ===")


if __name__ == "__main__":
    run_train_model()
