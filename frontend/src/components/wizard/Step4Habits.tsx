import React from 'react';
import { useFormContext } from '../../context/FormContext';

export const Step4Habits: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-7 sm:space-y-8 animate-slideIn">
      {/* TUE - Waktu Layar/Gadget */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
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
                  ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
              }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs font-normal text-text-secondary/70">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CALC - Kebiasaan Alkohol */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
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
              className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
                formData.CALC === item.value
                  ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* MTRANS - Alat Transportasi */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
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
              className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer ${
                formData.MTRANS === item.value
                  ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Step4Habits;
