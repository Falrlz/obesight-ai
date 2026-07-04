from src.data.data_loader import load_raw_data, validate_data, export_processed_data
from src.features.preprocessing import cleaning_raw_data
from src.features.feature_engineering import create_bmi_feature
from src.config.config import PROCESSED_DATA_PATH
from src.utils.logger import get_logger

logger = get_logger(__name__)


def run_data_prep():
    """
    Execute the data preprocessing pipeline.
    This reads raw data, validates columns, cleans missing values/duplicates,
    performs feature engineering, and exports the clean processed data.
    """
    logger.info("=== Starting Data Preprocessing Pipeline ===")

    # Step 1: Load raw dataset from directory
    logger.info("Step 1: Loading raw dataset...")
    df_raw = load_raw_data()

    # Step 2: Validate dataset integrity and column existence
    logger.info("Step 2: Validating data columns...")
    if not validate_data(df_raw):
        raise ValueError("Raw data validation failed.")

    # Step 3: Clean data (remove duplicate rows and null records)
    logger.info("Step 3: Cleaning raw data...")
    df_clean = cleaning_raw_data(df_raw)

    # Step 4: Perform feature engineering (generate BMI feature)
    logger.info("Step 4: Executing feature engineering...")
    df_engineered = create_bmi_feature(df_clean)

    # Step 5: Export processed dataframe to processed dataset file path
    logger.info("Step 5: Exporting processed dataset...")
    export_processed_data(df_engineered, str(PROCESSED_DATA_PATH))

    logger.info("=== Data Preprocessing Completed successfully ===")


if __name__ == "__main__":
    run_data_prep()
