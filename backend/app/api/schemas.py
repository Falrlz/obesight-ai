from pydantic import BaseModel, Field
from typing import List, Dict

class PredictRequest(BaseModel):
    name: str = Field(..., description="Nama pengguna", json_schema_extra={"example": "Budi"})
    Age: float = Field(..., ge=0, description="Usia (Tahun)", json_schema_extra={"example": 21.0})
    Gender: str = Field(..., pattern="^(Male|Female)$", description="Jenis Kelamin ('Male' atau 'Female')", json_schema_extra={"example": "Male"})
    Height: float = Field(..., ge=0, description="Tinggi Badan (cm)", json_schema_extra={"example": 165.0})
    Weight: float = Field(..., ge=0, description="Berat Badan (kg)", json_schema_extra={"example": 70.0})
    family_history: str = Field(..., pattern="^(yes|no)$", description="Riwayat obesitas di keluarga ('yes' atau 'no')", json_schema_extra={"example": "yes"})
    FAVC: str = Field(..., pattern="^(yes|no)$", description="Sering mengonsumsi makanan berkalori tinggi ('yes' atau 'no')", json_schema_extra={"example": "yes"})
    FCVC: float = Field(..., ge=1.0, le=3.0, description="Frekuensi konsumsi sayur (1.0 = Tidak pernah, 2.0 = Kadang, 3.0 = Selalu)", json_schema_extra={"example": 2.0})
    NCP: float = Field(..., ge=1.0, le=4.0, description="Jumlah makan utama harian (1.0 - 4.0)", json_schema_extra={"example": 3.0})
    CAEC: str = Field(..., pattern="^(no|Sometimes|Frequently|Always)$", description="Kebiasaan ngemil di sela makan ('no', 'Sometimes', 'Frequently', 'Always')", json_schema_extra={"example": "Sometimes"})
    SMOKE: str = Field(..., pattern="^(yes|no)$", description="Apakah merokok ('yes' atau 'no')", json_schema_extra={"example": "no"})
    CH2O: float = Field(..., ge=1.0, le=3.0, description="Konsumsi air harian (1.0 = < 1L, 2.0 = 1-2L, 3.0 = > 2L)", json_schema_extra={"example": 2.0})
    SCC: str = Field(..., pattern="^(yes|no)$", description="Memantau asupan kalori harian ('yes' atau 'no')", json_schema_extra={"example": "no"})
    FAF: float = Field(..., ge=0.0, le=3.0, description="Aktivitas fisik mingguan (0.0 = Tidak pernah, 1.0 = 1-2 hari, 2.0 = 2-4 hari, 3.0 = 4-5 hari)", json_schema_extra={"example": 1.0})
    TUE: float = Field(..., ge=0.0, le=2.0, description="Penggunaan gadget harian (0.0 = 0-2 jam, 1.0 = 3-5 jam, 2.0 = > 5 jam)", json_schema_extra={"example": 1.0})
    CALC: str = Field(..., pattern="^(no|Sometimes|Frequently|Always)$", description="Frekuensi konsumsi alkohol ('no', 'Sometimes', 'Frequently', 'Always')", json_schema_extra={"example": "Sometimes"})
    MTRANS: str = Field(..., pattern="^(Automobile|Motorbike|Bike|Public_Transportation|Walking)$", description="Transportasi harian ('Automobile', 'Motorbike', 'Bike', 'Public_Transportation', 'Walking')", json_schema_extra={"example": "Public_Transportation"})
    language: str = Field("id", pattern="^(id|en)$", description="Bahasa saran kesehatan ('id' untuk Indonesia, 'en' untuk Inggris)", json_schema_extra={"example": "id"})


class Recommendations(BaseModel):
    general: str = Field(..., description="Saran umum berdasarkan klasifikasi berat badan")
    specific: List[str] = Field(..., description="Saran kebiasaan spesifik berdasarkan input pengguna")


class PredictResponse(BaseModel):
    name: str = Field(..., description="Nama pengguna")
    bmi: float = Field(..., description="Body Mass Index (BMI)")
    bmi_category: str = Field(..., description="Kategori BMI (Underweight, Normal, Overweight, Obese)")
    prediction_class: int = Field(..., description="ID Kelas hasil prediksi (0-6)")
    prediction_label: str = Field(..., description="Label kelas hasil prediksi (Bahasa Inggris)")
    prediction_label_id: str = Field(..., description="Label kelas hasil prediksi terjemahan lokal")
    probabilities: Dict[str, float] = Field(..., description="Nilai probabilitas untuk setiap kelas")
    recommendations: Recommendations = Field(..., description="Rekomendasi/Saran kesehatan")


class ModelInfoResponse(BaseModel):
    model_name: str = Field(..., description="Nama model machine learning")
    framework: str = Field(..., description="Framework/Library model")
    features_required: List[str] = Field(..., description="Fitur-fitur yang dibutuhkan model")
