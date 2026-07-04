import pandas as pd
from src.utils.logger import get_logger

logger = get_logger(__name__)

def create_bmi_feature(df: pd.DataFrame) -> pd.DataFrame:
    '''
    Calculate and append the Body Mass Index (BMI) feature to the DataFrame.
    '''
    try:
        logger.info("Starting feature engineering: Creating BMI feature...")
        df_engineered = df.copy()

        df_engineered['BMI'] = df_engineered['Weight'] / (df_engineered['Height'] ** 2)
        logger.info("Successfully engineered 'BMI' feature.")
        return df_engineered

    except Exception as e:
        logger.error(f"Error during feature engineering: {str(e)}")
        raise e

