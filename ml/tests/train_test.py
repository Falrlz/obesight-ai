import pandas as pd
import os
import sys

# Append ml directory to sys.path to enable 'src' package imports during local testing
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.features.feature_engineering import create_bmi_feature
from src.features.preprocessing import encode_target
from src.data.data_splitter import split_data
from src.models.model_building import baseline_pipelines
from src.models.train import train


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


def test_pipeline_model_training():
    """
    Test the pipeline flow up to model baseline training.
    """
    print("\n=== STARTING MODEL TRAINING TEST ===")
    sample_data = get_sample_data()
    
    # Duplicate the sample data to ensure enough records for training/validation split
    df_large = pd.concat([sample_data] * 10, ignore_index=True)
    
    # Step 1: Perform feature engineering (generate BMI feature)
    print("\n[Step 1/6] Running feature engineering...")
    df_eng = create_bmi_feature(df_large)
    assert 'BMI' in df_eng.columns
    print("-> Status: Feature engineering completed successfully.")
    
    # Step 2: Encode string targets to numerical representation using pipeline encode_target
    print("\n[Step 2/6] Encoding target labels...")
    df_encoded = encode_target(df_eng)
    assert df_encoded['Obesity'].dtype in ['int64', 'int32', 'float64', 'float32']
    print("-> Status: Predefined target mapping encoding completed successfully.")
    
    # Step 3: Split features and labels into training and test datasets
    print("\n[Step 3/6] Splitting dataset to train/test features and labels...")
    X_train, X_test, y_train, y_test = split_data(df_encoded)
    print(f"   Train size: {len(X_train)}, Test size: {len(X_test)}")
    assert len(X_train) > 0 and len(X_test) > 0
    print("-> Status: Dataset splitting completed successfully.")
    
    # Step 4: Build baseline pipelines configured with the standard preprocessor
    print("\n[Step 4/6] Building baseline classifiers...")
    pipelines = baseline_pipelines()
    print(f"   Baseline models generated: {list(pipelines.keys())}")
    assert len(pipelines) > 0
    print("-> Status: Baseline model building completed successfully.")
    
    # Step 5: Test fitting of a single model (Random Forest) to verify standard sklearn logic
    model_name = "RandomForest"
    print(f"\n[Step 5/6] Testing single model training on RAM ({model_name})...")
    pipeline = pipelines[model_name]
    pipeline, duration = train(pipeline, X_train, y_train)
    y_pred = pipeline.predict(X_test)
    print(f"   Prediction count: {len(y_pred)}, Training duration: {duration:.4f}s")
    assert len(y_pred) == len(X_test)
    print(f"-> Status: Single model training for {model_name} completed successfully.")
    
    # Step 6: Test training across all configured baseline pipelines
    print("\n[Step 6/6] Testing training iteration on all baseline models...")
    trained_baselines = {}
    train_durations = {}
    
    for name, pl in pipelines.items():
        trained_pipeline, duration = train(pl, X_train, y_train)
        trained_baselines[name] = trained_pipeline
        train_durations[name] = duration
        
    print("\n   Baseline Training Durations Summary:")
    for model, duration in train_durations.items():
        print(f"   - {model}: {duration:.4f} seconds")
        
    assert len(trained_baselines) == len(pipelines)
    print("-> Status: Training all baseline pipelines completed successfully.")

    print("\n=== MODEL TRAINING TEST COMPLETED ===")


if __name__ == "__main__":
    test_pipeline_model_training()
