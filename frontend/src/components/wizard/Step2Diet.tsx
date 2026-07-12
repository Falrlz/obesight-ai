import React from 'react';
import { useFormContext } from '../../context/FormContext';

export const Step2Diet: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-slideIn">
      <div>
        <h2 className="text-xl font-bold text-on-surface">2. Pola Makan & Genetik</h2>
        <p className="text-sm text-text-secondary mt-1">
          Pertanyaan mengenai riwayat keluarga dan perilaku konsumsi makanan harian Anda.
        </p>
      </div>

      {/* Riwayat Obesitas Keluarga */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Apakah ada anggota keluarga sedarah yang memiliki riwayat obesitas?
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('family_history', 'yes')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold cursor-pointer ${
              formData.family_history === 'yes'
                ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            Ya
          </button>
          <button
            type="button"
            onClick={() => updateField('family_history', 'no')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold cursor-pointer ${
              formData.family_history === 'no'
                ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            Tidak
          </button>
        </div>
      </div>

      {/* FAVC - Makanan Berkalori Tinggi */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Apakah Anda sering mengonsumsi makanan berkalori tinggi? (gorengan, fast food, minuman manis)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('FAVC', 'yes')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold cursor-pointer ${
              formData.FAVC === 'yes'
                ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            Ya, Sering
          </button>
          <button
            type="button"
            onClick={() => updateField('FAVC', 'no')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold cursor-pointer ${
              formData.FAVC === 'no'
                ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            Jarang / Tidak Pernah
          </button>
        </div>
      </div>

      {/* FCVC - Frekuensi Sayuran */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Seberapa sering Anda mengonsumsi sayuran dalam makan utama Anda?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 1, label: 'Jarang', emoji: '🥗' },
            { value: 2, label: 'Kadang-kadang', emoji: '🥗🥗' },
            { value: 3, label: 'Selalu', emoji: '🥗🥗🥗' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('FCVC', item.value)}
              className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center gap-1 cursor-pointer ${
                formData.FCVC === item.value
                  ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-slate-500 hover:border-slate-300'
              }`}
            >
              <span className="text-lg">{item.emoji}</span>
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* NCP - Jumlah Makan Utama */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Berapa kali Anda makan makanan utama dalam sehari?
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateField('NCP', num)}
              className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-bold cursor-pointer ${
                formData.NCP === num
                  ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {num}x
            </button>
          ))}
        </div>
      </div>

      {/* CAEC - Ngemil */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Seberapa sering Anda makan camilan/makanan di antara jam makan utama?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { value: 'no', label: 'Tidak Pernah' },
            { value: 'Sometimes', label: 'Kadang-kadang' },
            { value: 'Frequently', label: 'Sering' },
            { value: 'Always', label: 'Setiap Saat' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('CAEC', item.value)}
              className={`p-2.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-xs font-semibold cursor-pointer ${
                formData.CAEC === item.value
                  ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Step2Diet;
