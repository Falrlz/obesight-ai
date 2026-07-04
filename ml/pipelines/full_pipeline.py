from pipelines.data_prep_pipeline import run_data_prep
from pipelines.train_pipeline import run_train_model
from src.utils.logger import get_logger

logger = get_logger(__name__)


def run_full_pipeline():
    """
    Orchestrate the complete machine learning workflow end-to-end.
    This executes the preprocessing step first, followed by model training.
    """
    logger.info("==========================================")
    logger.info("=== RUNNING FULL END-TO-END PIPELINE ===")
    logger.info("==========================================")
    
    # Step 1: Run data preprocessing sub-pipeline
    logger.info("Step 1/2: Triggering data preprocessing sub-pipeline...")
    run_data_prep()
    
    # Step 2: Run model training, tuning, and evaluation sub-pipeline
    logger.info("Step 2/2: Triggering model training, tuning, and evaluation sub-pipeline...")
    run_train_model()
    
    logger.info("=== FULL PIPELINE COMPLETED SUCCESSFULLY ===")


if __name__ == "__main__":
    run_full_pipeline()
