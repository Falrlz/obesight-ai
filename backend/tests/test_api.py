import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture(scope="module")
def client():
    """Yield a TestClient inside a lifespan context manager to run startup/shutdown events."""
    with TestClient(app) as c:
        yield c

def test_read_root(client):
    """Verify that root endpoint responds correctly."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "docs_url" in data
    assert "health_url" in data

def test_health_check(client):
    """Verify that health check endpoint returns healthy status and model load status."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["model_loaded"] is True

def test_model_info(client):
    """Verify that model information endpoint returns correct model metadata."""
    response = client.get("/api/v1/model-info")
    assert response.status_code == 200
    data = response.json()
    assert data["model_name"] == "Random Forest Classifier"
    assert data["framework"] == "scikit-learn Pipeline"
    assert "BMI" in data["features_required"]
    assert "MTRANS" in data["features_required"]

def test_predict_indonesian(client):
    """Test prediction endpoint using Indonesian language responses."""
    payload = {
        "name": "Budi",
        "Age": 21.0,
        "Gender": "Male",
        "Height": 165.0,
        "Weight": 70.0,
        "family_history": "yes",
        "FAVC": "yes",
        "FCVC": 2.0,
        "NCP": 3.0,
        "CAEC": "Sometimes",
        "SMOKE": "no",
        "CH2O": 2.0,
        "SCC": "no",
        "FAF": 1.0,
        "TUE": 1.0,
        "CALC": "Sometimes",
        "MTRANS": "Public_Transportation",
        "language": "id"
    }
    response = client.post("/api/v1/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    assert data["name"] == "Budi"
    assert data["bmi"] == round(70.0 / (1.65 ** 2), 2)
    assert "bmi_category" in data
    assert "prediction_class" in data
    assert "prediction_label" in data
    assert "prediction_label_id" in data
    assert len(data["probabilities"]) == 7
    
    # Assert Indonesian recommendations
    recs = data["recommendations"]
    assert "general" in recs
    assert isinstance(recs["general"], str)
    assert len(recs["specific"]) > 0
    # specific recommendation should trigger for FAVC=yes and FAF=1.0 in Indonesian
    assert any("sering mengonsumsi makanan berkalori tinggi" in s_rec for s_rec in recs["specific"])

def test_predict_english(client):
    """Test prediction endpoint using English language responses."""
    payload = {
        "name": "Jane",
        "Age": 25.0,
        "Gender": "Female",
        "Height": 170.0,
        "Weight": 50.0,
        "family_history": "no",
        "FAVC": "no",
        "FCVC": 3.0,
        "NCP": 3.0,
        "CAEC": "no",
        "SMOKE": "no",
        "CH2O": 3.0,
        "SCC": "yes",
        "FAF": 3.0,
        "TUE": 0.0,
        "CALC": "no",
        "MTRANS": "Walking",
        "language": "en"
    }
    response = client.post("/api/v1/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    assert data["name"] == "Jane"
    recs = data["recommendations"]
    assert "general" in recs
    assert isinstance(recs["general"], str)
    # recommendations should be in English
    assert "congratulations" in recs["general"].lower() or "weight" in recs["general"].lower()

def test_predict_invalid_data(client):
    """Test validation errors for invalid data inputs (e.g. negative age, invalid options)."""
    payload = {
        "name": "Budi",
        "Age": -5.0,       # Invalid: ge=0 required
        "Gender": "Other",  # Invalid: Male/Female required
        "Height": 165.0,
        "Weight": 70.0,
        "family_history": "yes",
        "FAVC": "yes",
        "FCVC": 2.0,
        "NCP": 3.0,
        "CAEC": "Sometimes",
        "SMOKE": "no",
        "CH2O": 2.0,
        "SCC": "no",
        "FAF": 1.0,
        "TUE": 1.0,
        "CALC": "Sometimes",
        "MTRANS": "Public_Transportation",
        "language": "id"
    }
    response = client.post("/api/v1/predict", json=payload)
    assert response.status_code == 422  # Unprocessable Entity
