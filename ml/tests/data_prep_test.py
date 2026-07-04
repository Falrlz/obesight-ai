import pandas as pd
import os
import sys

# Append ml directory to sys.path to enable 'src' package imports during local testing
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.data.data_loader import validate_data
from src.features.preprocessing import cleaning_raw_data
from src.features.feature_engineering import create_bmi_feature


def get_sample_data() -> pd.DataFrame:
    """
    Generate a small sample dataframe representing raw client obesity metrics.

    Returns:
        pd.DataFrame: Raw input dummy dataset.
    """
    data = {
        "Age": [21, 22, 23, 24, 25, 26],
        "Height": [1.62, 1.78, 1.80, 1.65, 1.70, 1.50],
        "Weight": [64, 89.8, 77, 60, 70, 50],
        "FCVC": [2, 2, 2, 3, 2, 3],
        "NCP": [3, 1, 3, 1, 3, 2],
        "CH2O": [2, 2, 2, 1, 3, 2],
        "FAF": [0, 0, 2, 1, 2, 0],
        "TUE": [1, 0, 1, 0, 1, 0],
        "Gender": ["Female", "Male", "Male", "Female", "Male", "Female"],
        "family_history": ["yes", "no", "yes", "no", "yes", "no"],
        "FAVC": ["no", "no", "no", "yes", "yes", "no"],
        "SMOKE": ["no", "no", "no", "no", "no", "no"],
        "SCC": ["no", "no", "no", "no", "no", "yes"],
        "CAEC": ["Sometimes", "Sometimes", "Sometimes", "Frequently", "Always", "no"],
        "CALC": ["no", "Sometimes", "Frequently", "no", "Sometimes", "no"],
        "MTRANS": ["Public_Transportation", "Public_Transportation", "Public_Transportation", "Automobile", "Walking", "Bike"],
        "Obesity": ["Normal_Weight", "Overweight_Level_II", "Normal_Weight", "Normal_Weight", "Overweight_Level_I", "Insufficient_Weight"]
    }
    return pd.DataFrame(data)


def test_pipeline_data_processing():
    """
    Test the data loading validation, duplicate removal, and engineering steps.
    """
    print("=== STARTING DATA PREPROCESSING TEST ===")
    sample_data = get_sample_data()
    
    # Step 1: Validate dataset column structure and empty checks
    print("\n[Step 1/3] Validating raw columns and contents...")
    is_valid = validate_data(sample_data)
    assert is_valid is True, "Validation should pass on correct sample dataset."
    print("-> Status: Data validation passed successfully.")

    # Step 2: Clean duplicates and handle missing entries
    print("\n[Step 2/3] Cleaning raw data (removing duplicates and nulls)...")
    # Duplicate first row to check drop logic
    df_with_duplicates = pd.concat([sample_data, sample_data.iloc[[0]]], ignore_index=True)
    print(f"   Initial record count: {df_with_duplicates.shape[0]}")
    df_clean = cleaning_raw_data(df_with_duplicates)
    print(f"   Cleaned record count: {df_clean.shape[0]}")
    assert df_clean.shape[0] == sample_data.shape[0], "Duplicates should be removed successfully."
    print("-> Status: Cleaning logic completed successfully.")

    # Step 3: Verify the feature engineering BMI calculation
    print("\n[Step 3/3] Generating BMI feature column...")
    df_eng = create_bmi_feature(df_clean)
    assert 'BMI' in df_eng.columns, "BMI column must be successfully engineered."
    print(f"   Sample engineered BMI value: {df_eng.loc[0, 'BMI']:.2f}")
    print("-> Status: Feature engineering completed successfully.")

    print("\n=== DATA PREPROCESSING TEST COMPLETED ===")


if __name__ == "__main__":
    test_pipeline_data_processing()
