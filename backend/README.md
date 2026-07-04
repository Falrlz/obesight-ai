# 🩺 ObeSight Backend API (Obesity Prediction & Health Insights System)

ObeSight Backend adalah layanan *stateless API* berbasis **FastAPI (Python)** yang bertindak sebagai mesin inferensi (*inference engine*) dan pemberi rekomendasi kesehatan (*insights engine*). Layanan ini memproses data kuesioner pengguna (17 variabel antropometri dan perilaku) dan mengeksekusi model Machine Learning (`best_model.pkl` hasil pelatihan menggunakan LightGBM/XGBoost) untuk mengklasifikasikan tingkat obesitas secara *real-time* sekaligus memformulasikan saran kesehatan personal dalam bahasa Indonesia atau bahasa Inggris.

---

## 🚀 Fitur Utama

- ⚡ **Performa Tinggi**: Dibangun menggunakan FastAPI dan Uvicorn (ASGI server) untuk latensi inferensi yang minimal.
- 🧠 **Inference Engine**: Memuat model pembelajaran mesin terserialisasi (`joblib`) ke memori saat startup aplikasi untuk performa prediksi optimal.
- 📋 **Insight & Recommendation Engine**: Memproses aturan-aturan berbasis perilaku (misalnya konsumsi air mineral, tingkat aktivitas fisik, waktu layar, dll.) untuk menghasilkan rekomendasi kesehatan khusus (spesifik dan umum) yang disesuaikan secara personal.
- 🌐 **Dukungan Bilingual**: Mampu menghasilkan prediksi label terjemahan dan rekomendasi dalam 2 bahasa: **Bahasa Indonesia (`id`)** dan **Bahasa Inggris (`en`)**.
- 🛠️ **Validasi Data Otomatis**: Memanfaatkan skema Pydantic v2 untuk memeriksa integritas data input sebelum diproses oleh model.
- 📚 **Dokumentasi API Otomatis**: Menyediakan antarmuka Swagger UI (`/docs`) dan ReDoc (`/redoc`) bawaan.

---

## 🛠️ Tech Stack & Dependensi

Layanan backend ini memerlukan pustaka-pustaka utama berikut (tercatat di [requirements.txt](file:///d:/project/obesight-backend/backend/requirements.txt)):
- **Framework**: FastAPI (v0.136.3), Uvicorn (v0.48.0)
- **Data Science & ML**: Pandas (v2.3.3), NumPy (v2.4.6), Scikit-Learn (v1.8.0), LightGBM (v4.6.0), XGBoost (v3.2.0), Joblib (v1.5.3)
- **Utilitas & Pengujian**: Python-dotenv, Pytest, HTTPX

---

## 📂 Struktur Direktori

```text
backend/
├── app/
│   ├── api/
│   │   ├── endpoints.py     # Definisi router API (/predict, /health, /model-info)
│   │   └── schemas.py       # Skema request & response Pydantic
│   ├── core/
│   │   └── config.py        # Konfigurasi aplikasi & pemuatan variabel env
│   ├── services/
│   │   ├── predictor.py     # Logika inferensi dan pemuatan model
│   │   ├── preprocessor.py  # Pembersihan data & penghitungan BMI
│   │   └── recommender.py   # Mesin aturan rekomendasi kesehatan bilingual
│   └── main.py              # Titik masuk utama aplikasi (Inisialisasi FastAPI & Lifespan)
├── tests/
│   └── test_api.py          # Unit testing untuk validasi API dan rekomendasi
├── .env                     # File konfigurasi lingkungan (environment variables)
└── requirements.txt         # Daftar pustaka & dependensi Python
```

---

## ⚙️ Persyaratan & Instalasi

### 1. Prasyarat
Pastikan Anda sudah menginstal **Python 3.10** atau versi yang lebih baru di sistem Anda.

### 2. Kloning dan Masuk ke Folder Backend
```bash
cd d:/project/obesight-backend/backend
```

### 3. Buat dan Aktifkan Virtual Environment
Di Windows (PowerShell/CMD):
```powershell
# Membuat virtual environment
python -m venv .venv

# Mengaktifkan di PowerShell
.venv\Scripts\Activate.ps1

# Mengaktifkan di CMD
.venv\Scripts\activate.bat
```

### 4. Instal Dependensi
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 5. Konfigurasi Lingkungan (`.env`)
Buat file bernama `.env` di direktori root backend (`backend/`) jika belum ada, lalu sesuaikan isinya:
```env
APP_NAME="ObeSight API"
DEBUG=true
HOST=127.0.0.1
PORT=8000
MODEL_PATH="../ml/models/best_model.pkl"
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

---

## 🏃 Cara Menjalankan Server Pengembangan

Jalankan Uvicorn dalam mode *hot-reload* untuk mendeteksi perubahan kode secara otomatis:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Setelah berhasil dijalankan, Anda dapat mengakses:
- 🔌 **API Base URL**: `http://127.0.0.1:8000/`
- 📖 **Dokumentasi Swagger UI**: `http://127.0.0.1:8000/docs`
- 📘 **Dokumentasi ReDoc**: `http://127.0.0.1:8000/redoc`

---

## 🧪 Menjalankan Unit Testing

Pengujian otomatis ditulis menggunakan `pytest` untuk memverifikasi validitas format input, status kesehatan, kalkulasi BMI, serta logika rekomendasi bilingual.

Untuk menjalankan semua tes, jalankan perintah berikut di dalam direktori `backend/`:

```bash
pytest -v
```

---

## 📡 Kontrak Antarmuka API (API Endpoints)

### 1. `POST /api/v1/predict` (Endpoint Prediksi & Saran)
Digunakan untuk mengirim data survei pengguna dan mendapatkan tingkat obesitas yang diprediksi serta saran kesehatan.

- **Request Body (JSON)**:
```json
{
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
```
*Catatan: Nilai `Height` diisi dalam centimeter (cm) untuk kenyamanan pengguna, backend akan mengonversinya secara internal ke meter (m).*

- **Response Body (JSON)**:
```json
{
  "name": "Budi",
  "bmi": 25.71,
  "bmi_category": "Berat Badan Lebih",
  "prediction_class": 3,
  "prediction_label": "Overweight_Level_II",
  "prediction_label_id": "Kelebihan Berat Badan Tingkat II",
  "probabilities": {
    "Insufficient_Weight": 0.0012,
    "Normal_Weight": 0.0456,
    "Overweight_Level_I": 0.1258,
    "Overweight_Level_II": 0.7891,
    "Obesity_Type_I": 0.0383,
    "Obesity_Type_II": 0.0,
    "Obesity_Type_III": 0.0
  },
  "recommendations": {
    "general": "Kondisi fisik Anda menunjukkan berat badan berlebih (overweight). Fokuslah pada defisit kalori ringan, perbaikan pola makan harian, dan peningkatan aktivitas fisik harian untuk kembali ke rentang berat badan ideal.",
    "specific": [
      "Anda kadang-kadang mengonsumsi sayuran. Tingkatkan asupan tersebut agar selalu ada di setiap makan utama guna mencukupi kebutuhan mikronutrisi dan menjaga kesehatan pencernaan Anda.",
      "Anda minum di antara 1 hingga 2 liter air mineral per hari. Usahakan untuk meningkatkannya hingga mencapai minimal 2 liter per hari.",
      "Aktivitas fisik Anda baru 1-2 hari seminggu. Cobalah naikkan intensitasnya secara perlahan menjadi 3 hari seminggu.",
      "Anda sering mengonsumsi makanan berkalori tinggi (fast food, gorengan). Batasi frekuensinya menjadi maksimal 1-2 kali seminggu, dan gantilah dengan masakan rumahan yang diolah dengan cara dikukus, direbus, atau dipanggang.",
      "Anda belum memantau asupan kalori harian. Untuk membantu mengontrol berat badan, Anda bisa mulai mencatat makanan harian secara berkala."
    ]
  }
}
```

### 2. `GET /api/v1/health` (Health Check)
Memverifikasi status operasional backend dan memastikan model ML berhasil dimuat ke dalam memori.

- **Response (JSON)**:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### 3. `GET /api/v1/model-info` (Metadata Model)
Mengembalikan informasi metadata tentang nama model, kerangka kerja (framework), serta fitur-fitur yang wajib dikirimkan dalam request body.

- **Response (JSON)**:
```json
{
  "model_name": "LightGBM Classifier",
  "framework": "scikit-learn Pipeline",
  "features_required": [
    "Age", "Height", "Weight", "BMI", "FCVC", "NCP", "CH2O", "FAF", "TUE", 
    "Gender", "family_history", "FAVC", "SMOKE", "SCC", "CAEC", "CALC", "MTRANS"
  ]
}
```

---

## 🧠 Logika Pemrosesan Inferensi

1. **Konversi Satuan**: Nilai tinggi badan dari pengguna (`cm`) dikonversi ke meter (`Height / 100`).
2. **Kalkulasi BMI**: Menghitung indeks massa tubuh dengan rumus: $\text{BMI} = \frac{\text{Berat (kg)}}{\text{Tinggi (m)}^2}$.
3. **Penyusunan Fitur**: Nilai-nilai di atas dimasukkan ke dalam baris data `pandas.DataFrame` dengan kolom terurut yang sesuai persis dengan kebutuhan input pipeline model ML.
4. **Prediksi Model**: Menjalankan `.predict_proba()` dari objek Pipeline model terserialisasi untuk mendapatkan peluang kelas.
5. **Generasi Rekomendasi**: Menilai input perilaku per individu untuk merangkai daftar rekomendasi spesifik (misalnya, mengingatkan hidrasi jika `CH2O` rendah, menganjurkan olahraga jika `FAF` rendah).
