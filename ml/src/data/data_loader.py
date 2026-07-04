import pandas as pd
import logging
from src.config.config import RAW_DATA_PATH, PROCESSED_DATA_PATH

logger = logging.getLogger(__name__)

def load_raw_data(file_path: str = str(RAW_DATA_PATH)) -> pd.DataFrame:
    '''
    Load the raw CSV dataset into a pandas DataFrame.
    '''
    try:
        logger.info(f"Loading raw dataset from {file_path}")
        df = pd.read_csv(file_path)
        logger.info(f"Successfully loaded raw dataframe with {df.shape[0]} rows and {df.shape[1]} columns.")
        return df

    except FileNotFoundError:
        logger.error(f"Dataset file not found at: {file_path}")
        raise

def load_processed_data(file_path: str = str(PROCESSED_DATA_PATH)) -> pd.DataFrame:
    '''
    Load the preprocessed CSV dataset into a pandas DataFrame.
    '''
    try:
        logger.info(f"Loading processed dataset from {file_path}")
        df = pd.read_csv(file_path)
        logger.info(f"Successfully loaded processed dataframe with {df.shape[0]} rows and {df.shape[1]} columns.")
        return df

    except FileNotFoundError:
        logger.error(f"Dataset file not found at: {file_path}")
        raise

def validate_data(df: pd.DataFrame) -> bool:
    '''
    Validate that the input DataFrame is not empty and contains the required columns.
    '''
    if df is None or df.empty:
        logger.error("Validation failed: Dataframe is empty or None.")
        return False
        
    required_cols = ["Weight", "Height", "Obesity"]
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        logger.error(f"Validation failed: Missing required columns: {missing_cols}")
        return False
        
    logger.info("Data validation passed successfully.")
    return True

def export_processed_data(df: pd.DataFrame, file_path: str):
    '''
    Save the processed DataFrame to a CSV file.
    '''
    try:
        df.to_csv(file_path, index=False)
        logger.info(f"Processed dataset exported successfully to {file_path}")
        
    except Exception as e:
        logger.error(f"Failed to export processed data: {str(e)}")
        raise e