import time
import logging
from sklearn.pipeline import Pipeline

logger = logging.getLogger(__name__)


def train(pipeline: Pipeline, X_train, y_train) -> tuple:
    """
    Train a Scikit-Learn pipeline using the provided training features and labels.

    Args:
        pipeline (Pipeline): The machine learning pipeline containing preprocessor and classifier.
        X_train (array-like): Training feature data.
        y_train (array-like): Training labels.

    Returns:
        tuple: A tuple containing:
            - Pipeline: The fitted pipeline instance.
            - float: The training duration in seconds.
    """
    logger.info("Starting training of the model pipeline...")
    start_time = time.time()
    
    # Fit the preprocessor and estimator components
    pipeline.fit(X_train, y_train)
    
    duration = time.time() - start_time
    logger.info(f"Training completed successfully in {duration:.2f} seconds.")
    
    return pipeline, duration
