import pandas as pd
import logging
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OrdinalEncoder, OneHotEncoder
from src.config.config import NUM_FEATURES, BINARY_FEATURES, ORDINAL_FEATURES, NOMINAL_FEATURES, ORDINAL_MAP, TARGET, TARGET_MAP

logger = logging.getLogger(__name__)

def remove_duplicates(df: pd.DataFrame) -> pd.DataFrame:
    '''
    Remove duplicate rows from the input DataFrame.
    '''
    initial_rows = len(df)
    duplicate_count = df.duplicated().sum()

    if duplicate_count > 0:
        logger.info(f"Found {duplicate_count} duplicate rows. Removing duplicates...")

        df_cleaned = df.drop_duplicates()
        logger.info(f"Duplicate removal complete: {initial_rows} -> {len(df_cleaned)} rows.")
        return df_cleaned
    return df

def remove_missing(df: pd.DataFrame) -> pd.DataFrame:
    '''
    Drop rows containing missing/null values from the DataFrame.
    '''
    initial_rows = len(df)
    null_count = df.isnull().sum().sum()

    if null_count > 0:
        logger.info(f"Found {null_count} null values. Dropping null rows...")
        df_cleaned = df.dropna()
        logger.info(f"Null rows drop complete: {initial_rows} -> {len(df_cleaned)} rows.")
        return df_cleaned
    return df

def cleaning_raw_data(df: pd.DataFrame) -> pd.DataFrame:
    '''
    Perform raw data cleaning by removing duplicate and missing rows.
    '''
    logger.info("Executing raw data preprocessing...")
    df = remove_duplicates(df)
    df = remove_missing(df)
    return df

def encode_target(df: pd.DataFrame) -> pd.DataFrame:
    '''
    Map target labels (obesity classes) to ordinal integers.
    '''
    if TARGET in df.columns:
        logger.info(f"Encoding target variable '{TARGET}' using predefined TARGET_MAP.")
        df_encoded = df.copy()
        df_encoded[TARGET] = df_encoded[TARGET].map(TARGET_MAP)
        return df_encoded
    return df

def build_preprocessor() -> ColumnTransformer:
    '''
    Construct a ColumnTransformer that scales numerical variables and encodes categorical features.
    '''
    # Binary: Ordinal Encoding (0/1)
    binary_transformer = Pipeline(steps=[
        ('ordinal', OrdinalEncoder())
    ])

    # Ordinal: Ordinal Encoding with defined order
    caec_categories = list(ORDINAL_MAP.get("CAEC", {}).keys())
    calc_categories = list(ORDINAL_MAP.get("CALC", {}).keys())
    ordinal_transformer = Pipeline(steps=[
        ('ordinal', OrdinalEncoder(categories=[caec_categories, calc_categories], handle_unknown='use_encoded_value', unknown_value=-1))
    ])


    # Nominal: One-Hot Encoding
    nominal_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])

    # Numerical: Standard Scaling
    numeric_transformer = Pipeline(steps=[
        ('scaler', StandardScaler())
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, NUM_FEATURES),
            ('bin', binary_transformer, BINARY_FEATURES),
            ('ord', ordinal_transformer, ORDINAL_FEATURES),
            ('nom', nominal_transformer, NOMINAL_FEATURES)
        ],
        remainder='passthrough'
    )

    return preprocessor