import React from 'react';
import { useFormContext } from '../../context/FormContext';

export const Step4Habits: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-slideIn">
      {/* TUE - Waktu Layar/Gadget */}
      <div className="space-y-2">
        <label className="text-base font-semibold text-text-secondary block">
          Berapa jam Anda menghabiskan waktu di depan layar (gadget, komputer, TV) setiap hari?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 0, label: '0 - 2 Jam', desc: 'Rendah' },
            { value: 1, label: '3 - 5 Jam', desc: 'Sedang' },
            { value: 2, label: 'Lebih dari 5 Jam', desc: 'Tinggi' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('TUE', item.value)}
              className={`p-4 rounded-xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                formData.TUE === item.value
                  ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
              }`}
            >
              <span className="text-sm font-bold">{item.label}</span>
              <span className="text-xs text-text-secondary/70 font-medium">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CALC - Kebiasaan Alkohol */}
      <div className="space-y-2">
        <label className="text-base font-semibold text-text-secondary block">
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
              className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold cursor-pointer ${
                formData.CALC === item.value
                  ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* MTRANS - Alat Transportasi */}
      <div className="space-y-2">
        <label className="text-base font-semibold text-text-secondary block">
          Apa transportasi utama yang Anda gunakan untuk beraktivitas sehari-hari?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { value: 'Walking', label: 'Jalan Kaki' },
            { value: 'Bike', label: 'Sepeda' },
            { value: 'Public_Transportation', label: 'Transportasi Umum' },
            { value: 'Motorbike', label: 'Sepeda Motor' },
            { value: 'Automobile', label: 'Mobil Pribadi' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('MTRANS', item.value)}
              className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer ${
                formData.MTRANS === item.value
                  ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language Preferensi */}
      <div className="space-y-2 pt-2">
        <label className="text-base font-semibold text-text-secondary block">
          Bahasa untuk Hasil & Saran Kesehatan
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('language', 'id')}
            className={`p-4 rounded-xl border text-center transition-all duration-200 active:scale-95 text-base font-semibold flex items-center justify-center gap-2 cursor-pointer ${
              formData.language === 'id'
                ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            Bahasa Indonesia
          </button>
          <button
            type="button"
            onClick={() => updateField('language', 'en')}
            className={`p-4 rounded-xl border text-center transition-all duration-200 active:scale-95 text-base font-semibold flex items-center justify-center gap-2 cursor-pointer ${
              formData.language === 'en'
                ? 'border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};
export default Step4Habits;
