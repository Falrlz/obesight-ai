import React from 'react';
import { useFormContext } from '../../context/FormContext';

export const Step4Habits: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-slideIn">
      <div>
        <h2 className="text-xl font-bold text-on-surface">4. Gaya Hidup & Setelan</h2>
        <p className="text-sm text-text-secondary mt-1">
          Langkah akhir mengenai screen-time harian, transportasi, dan preferensi bahasa Anda.
        </p>
      </div>

      {/* TUE - Waktu Layar/Gadget */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Berapa jam Anda menghabiskan waktu di depan layar (gadget, komputer, TV) setiap hari?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 0, label: '0 - 2 Jam', desc: 'Rendah', emoji: '📱' },
            { value: 1, label: '3 - 5 Jam', desc: 'Sedang', emoji: '💻' },
            { value: 2, label: 'Lebih dari 5 Jam', desc: 'Tinggi', emoji: '🖥️' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('TUE', item.value)}
              className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                formData.TUE === item.value
                  ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-slate-500 hover:border-slate-300'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-xs font-bold">{item.label}</span>
              <span className="text-[10px] text-slate-400 font-medium">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CALC - Kebiasaan Alkohol */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Seberapa sering Anda mengonsumsi minuman beralkohol?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { value: 'no', label: 'Tidak Pernah' },
            { value: 'Sometimes', label: 'Kadang-kadang' },
            { value: 'Frequently', label: 'Sering' },
            { value: 'Always', label: 'Setiap Hari' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('CALC', item.value)}
              className={`p-2.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-xs font-semibold cursor-pointer ${
                formData.CALC === item.value
                  ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* MTRANS - Alat Transportasi */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Apa transportasi utama yang Anda gunakan untuk beraktivitas sehari-hari?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { value: 'Walking', label: 'Jalan Kaki', emoji: '🚶' },
            { value: 'Bike', label: 'Sepeda', emoji: '🚲' },
            { value: 'Public_Transportation', label: 'Transportasi Umum', emoji: '🚌' },
            { value: 'Motorbike', label: 'Sepeda Motor', emoji: '🏍️' },
            { value: 'Automobile', label: 'Mobil Pribadi', emoji: '🚗' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('MTRANS', item.value)}
              className={`p-2.5 rounded-xl border text-center transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer ${
                formData.MTRANS === item.value
                  ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language Preferensi */}
      <div className="space-y-2 pt-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Bahasa untuk Hasil & Saran Kesehatan
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('language', 'id')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer ${
              formData.language === 'id'
                ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <span>🇮🇩</span> Bahasa Indonesia
          </button>
          <button
            type="button"
            onClick={() => updateField('language', 'en')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer ${
              formData.language === 'en'
                ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <span>🇬🇧</span> English
          </button>
        </div>
      </div>
    </div>
  );
};
export default Step4Habits;
