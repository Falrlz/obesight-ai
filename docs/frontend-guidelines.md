# 🎨 Panduan Pengembangan Frontend ObeSight AI (Frontend Agent Spec)

Dokumen ini ditujukan untuk AI Agent / pengembang yang akan bekerja melakukan peningkatan (*refactoring/enhancement*) pada antarmuka pengguna (Frontend) proyek **ObeSight AI**. Gunakan panduan ini sebagai spesifikasi teknis dan arahan desain untuk membangun frontend yang lebih intuitif, estetis, dan modern.

---

## 🛠️ Tech Stack Saat Ini

Aplikasi frontend dibangun menggunakan teknologi berikut:
* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS + Material UI (MUI v9)
* **Grafik & Visualisasi**: Recharts (v3.8.1)
* **HTTP Client**: Axios (terkonfigurasi pada [api.ts](file:///d:/project/obesight-ai/frontend/src/services/api.ts))

---

## 📂 Struktur Folder Utama (`frontend/src`)

* `components/layout/`: Header, footer, and shell layout.
* `components/wizard/`: Form multi-step (Step 1-4) pengisian data kuesioner (17 parameter antropometri/kebiasaan).
* `components/dashboard/`: Komponen penampil hasil prediksi (BMI Gauge, grafik probabilitas kelas, kartu rekomendasi).
* `services/`: Komponen komunikasi API (termasuk Axios setup).
* `types/`: Tipe TypeScript (lihat [types/index.ts](file:///d:/project/obesight-ai/frontend/src/types/index.ts)).

---

## 🎯 Arahan Peningkatan Desain & UX/UI (Untuk Frontend Agent)

Tujuan utama refactoring adalah membuat antarmuka terasa **premium, interaktif, responsif, dan mudah dipahami**. Berikut adalah area fokus yang perlu ditingkatkan:

### 1. Desain Form Kuesioner (Wizard) yang Ramah Pengguna
Kuesioner meminta 17 parameter. Jika berupa form input teks biasa, pengguna akan merasa bosan.
* **Visual Cards**: Gunakan kartu interaktif dengan ikon untuk pilihan biner (`yes` / `no`) atau kategori transportasi (`MTRANS`).
* **Slider Interaktif**:
  * Untuk **FCVC** (frekuensi makan sayur, skala 1-3), buat slider interaktif dengan label teks (misalnya: *Jarang*, *Sedang*, *Sering*).
  * Untuk **CH2O** (air minum, skala 1-3), tampilkan visualisasi gelas air interaktif.
  * Untuk **FAF** (aktivitas fisik) dan **TUE** (waktu menggunakan gadget), berikan ilustrasi slider waktu/jam.
* **Tooltip Informasi**: Label parameter singkatan seperti `FAVC` (makanan tinggi kalori), `SCC` (monitoring kalori), `CAEC` (cemilan antar makan) harus disertai tooltip penjelasan dalam bahasa yang dipilih (`id` atau `en`) agar pengguna mengerti maksud pertanyaannya.
* **Transisi Halus**: Tambahkan animasi transisi (slide/fade) saat berpindah langkah (*Step*) menggunakan Framer Motion atau transition library lain.

### 2. Visualisasi Dashboard Hasil Prediksi yang Premium
Dashboard hasil harus memberikan kesan "wow" dan mudah dibaca secara medis/klinis.
* **BMI Gauge**: Buat indikator visual BMI berbentuk setengah lingkaran (*semi-circle gauge*) yang halus dengan penunjuk dinamis sesuai kategori (Underweight, Normal, Overweight, Obese I/II/III). Gunakan warna gradasi yang harmonis (hijau, kuning, oranye, merah).
* **Grafik Probabilitas Kelas**: Tampilkan grafik batang (*bar chart*) horizontal menggunakan **Recharts** untuk memperlihatkan seberapa yakin model memprediksi setiap kelas obesitas. Tambahkan tooltip kustom yang estetik pada hover.
* **Kartu Rekomendasi Interaktif**:
  * Pisahkan rekomendasi umum (*general*) dan spesifik (*specific*).
  * Tambahkan fitur **Checklist Habit**: Pengguna dapat menandai rekomendasi spesifik yang ingin mereka lakukan hari ini (misalnya "Minum air 2 liter" dapat dicentang langsung).
* **Export PDF/Report**: Sediakan tombol untuk mengekspor hasil analisis dan rekomendasi menjadi file PDF yang rapi untuk diunduh pengguna.

### 3. Tema & Estetika Visual (Premium Look)
* **Dark Mode & Light Mode**: Sediakan switcher tema yang smooth. Simpan preferensi pengguna di `localStorage`.
* **Tipografi**: Pastikan menggunakan font modern seperti *Inter*, *Outfit*, atau *Plus Jakarta Sans*. Hindari font sans-serif bawaan browser yang monoton.
* **Micro-interactions**: Efek hover lembut pada kartu, animasi loading berputar (*skeleton loaders*) yang elegan saat menunggu prediksi API dari backend selesai diproses.

---

## 🔌 Detail Integrasi API backend

Frontend harus berkomunikasi dengan FastAPI Backend (port `8000`). Berikut adalah skema data yang harus dipenuhi:

### Skema Request (`PredictRequest`)
```typescript
export interface PredictRequest {
  name: string;
  Age: number;
  Gender: 'Male' | 'Female';
  Height: number; // tinggi badan dalam cm
  Weight: number; // berat badan dalam kg
  family_history: 'yes' | 'no';
  FAVC: 'yes' | 'no';        // Suka makanan tinggi kalori
  FCVC: number;              // Frekuensi makan sayuran (1 s.d 3)
  NCP: number;               // Jumlah makan utama per hari (1 s.d 4)
  CAEC: 'no' | 'Sometimes' | 'Frequently' | 'Always'; // Ngemil di sela makan
  SMOKE: 'yes' | 'no';
  CH2O: number;              // Konsumsi air per hari (1 s.d 3)
  SCC: 'yes' | 'no';         // Monitoring asupan kalori
  FAF: number;               // Frekuensi aktivitas fisik per minggu (0 s.d 3)
  TUE: number;               // Waktu layar/screen time (0 s.d 2)
  CALC: 'no' | 'Sometimes' | 'Frequently' | 'Always'; // Konsumsi alkohol
  MTRANS: 'Automobile' | 'Motorbike' | 'Bike' | 'Public_Transportation' | 'Walking';
  language: 'id' | 'en';     // Bahasa keluaran rekomendasi
}
```

### Skema Response (`PredictResponse`)
```typescript
export interface PredictResponse {
  name: string;
  bmi: number;
  bmi_category: string;
  prediction_class: number;
  prediction_label: string;
  prediction_label_id: string;
  probabilities: Record<string, number>; // Persentase keyakinan tiap kelas
  recommendations: {
    general: string;
    specific: string[]; // Daftar rekomendasi spesifik
  };
}
```

### Endpoints yang Digunakan:
1. `POST /api/v1/predict` : Mengirim form kuesioner dan menerima hasil prediksi.
2. `GET /api/v1/health` : Memeriksa kesehatan API dan memvalidasi apakah model Machine Learning sudah dimuat (*loaded*) dengan benar di backend.
3. `GET /api/v1/model-info` : Mendapatkan informasi nama model yang aktif dan fitur wajib.

---

## ⚡ Langkah Awal untuk Memulai Pengembangan

Instruksikan Agent Frontend untuk melakukan hal berikut saat mulai:
1. Jalankan `npm install` untuk memastikan semua paket terinstal.
2. Pastikan file `.env.development` memiliki konfigurasi API backend yang benar:
   ```env
   VITE_API_URL=http://127.0.0.1:8000/api/v1
   ```
3. Mulai dengan memperbarui komponen di folder [components/wizard](file:///d:/project/obesight-ai/frontend/src/components/wizard/) agar input data lebih interaktif, lalu lanjutkan ke bagian visualisasi dashboard.
