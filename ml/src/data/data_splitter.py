import pandas as pd
import logging
from sklearn.model_selection import train_test_split
from src.config.config import TARGET, RANDOM_STATE, TEST_SIZE
from src.utils.logger import get_logger

logger = get_logger(__name__)

def split_data(df: pd.DataFrame):
    '''
    Split the input DataFrame into stratified training and testing subsets.
    '''
    try:
        X = df.drop(columns=[TARGET])
        y = df[TARGET]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, 
            test_size=TEST_SIZE, 
            random_state=RANDOM_STATE, 
            stratify=y
        )

        logger.info(f"Training data shape: X={X_train.shape}, y={y_train.shape}")
        logger.info(f"Testing data shape: X={X_test.shape}, y={y_test.shape}")

        return X_train, X_test, y_train, y_test

    except Exception as e:
        logger.error(f"Error during train-test split: {str(e)}")
        raise e

