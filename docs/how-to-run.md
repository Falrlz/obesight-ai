# 🚀 Panduan Menjalankan ObeSight AI

Dokumentasi ini berisi langkah-langkah untuk menyiapkan environment, menjalankan backend API, dan menjalankan aplikasi frontend.

---

## 📦 1. Persiapan Virtual Environment (`.venv`)

Jalankan perintah ini di PowerShell (lakukan sekali saja saat setup pertama kali di direktori utama `obesight-ai`):

```powershell
# Membuat virtual environment bernama .venv
python -m venv .venv

# Mengizinkan eksekusi script di PowerShell jika diblokir
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

# Mengaktifkan virtual environment
.venv\Scripts\Activate.ps1

# Menginstal semua library/dependensi yang dibutuhkan
pip install -r requirements.txt
```

---

## 🖥️ 2. Menjalankan Backend (FastAPI)

> [!IMPORTANT]  
> Pastikan Anda berada di dalam folder **`backend`** sebelum menjalankan perintah `uvicorn`. Jika dijalankan di luar folder `backend`, server akan gagal berjalan dengan error `ModuleNotFoundError: No module named 'app'`.

Buka tab PowerShell baru, lalu jalankan:

```powershell
# 1. Masuk ke folder backend
cd d:\project\obesight-ai\backend

# 2. Aktifkan virtual environment
..\.venv\Scripts\Activate.ps1

# 3. Jalankan server backend FastAPI
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
* **URL API:** `http://127.0.0.1:8000`
* **Dokumentasi API (Swagger UI):** `http://127.0.0.1:8000/docs`

---

## 🎨 3. Menjalankan Frontend (React + Vite)

Buka tab PowerShell kedua, lalu jalankan:

```powershell
# 1. Masuk ke folder frontend
cd d:\project\obesight-ai\frontend

# 2. Instal dependensi node (hanya jika belum pernah)
npm install

# 3. Jalankan server pengembangan Vite
npm run dev
```
* **URL Web Frontend:** `http://localhost:5173` (atau sesuai port yang tampil di terminal)

---

## 💡 Tips & Perintah Tambahan

* **Mematikan Virtual Environment:**
  Jika sedang aktif dan ingin dinonaktifkan, cukup ketik:
  ```powershell
  deactivate
  ```
* **Melihat status server:**
  Pastikan backend menyala di port `8000` dan frontend di port `5173` agar fitur prediksi pada aplikasi web dapat berkomunikasi dengan API backend secara lancar.
