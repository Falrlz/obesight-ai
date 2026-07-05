import React from 'react';
import { useFormContext } from '../../context/FormContext';

export const Step3Activity: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-slate-800">3. Kebiasaan Hidrasi & Aktivitas</h2>
        <p className="text-sm text-slate-500 mt-1">
          Pertanyaan mengenai tingkat olahraga, hidrasi harian, serta kepedulian kalori Anda.
        </p>
      </div>

      {/* CH2O - Konsumsi Air Mineral */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Berapa banyak air mineral yang Anda minum dalam sehari?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 1, label: '1 - 2 Liter', desc: '(Sekitar 4-8 gelas)', emoji: '💧' },
            { value: 2, label: '2 Liter', desc: '(Sekitar 8 gelas)', emoji: '💧💧' },
            { value: 3, label: 'Lebih dari 2 L', desc: '(> 8 gelas)', emoji: '💧💧💧' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('CH2O', item.value)}
              className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1 ${
                formData.CH2O === item.value
                  ? 'border-teal-500 bg-teal-50/40 text-teal-700 ring-1 ring-teal-500'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-xs font-bold">{item.label}</span>
              <span className="text-[10px] text-slate-400 font-medium">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAF - Aktivitas Fisik (Olahraga) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Berapa hari Anda berolahraga atau melakukan aktivitas fisik dalam seminggu?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { value: 0, label: 'Tidak Pernah', desc: '0 hari' },
            { value: 1, label: 'Jarang', desc: '1 - 2 hari' },
            { value: 2, label: 'Sedang', desc: '3 - 4 hari' },
            { value: 3, label: 'Aktif', desc: '5+ hari' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('FAF', item.value)}
              className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-center ${
                formData.FAF === item.value
                  ? 'border-teal-500 bg-teal-50/40 text-teal-700 ring-1 ring-teal-500'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold">{item.label}</span>
              <span className="text-[10px] text-slate-400 mt-0.5 font-medium">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SCC - Pemantauan Kalori */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Apakah Anda terbiasa memantau atau menghitung jumlah asupan kalori harian Anda?
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('SCC', 'yes')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold ${
              formData.SCC === 'yes'
                ? 'border-teal-500 bg-teal-50/40 text-teal-700 ring-1 ring-teal-500'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            Ya, Saya Catat
          </button>
          <button
            type="button"
            onClick={() => updateField('SCC', 'no')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold ${
              formData.SCC === 'no'
                ? 'border-teal-500 bg-teal-50/40 text-teal-700 ring-1 ring-teal-500'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            Tidak Pernah
          </button>
        </div>
      </div>

      {/* SMOKE - Merokok */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">
          Apakah Anda memiliki kebiasaan merokok?
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('SMOKE', 'yes')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold ${
              formData.SMOKE === 'yes'
                ? 'border-teal-500 bg-teal-50/40 text-teal-700 ring-1 ring-teal-500'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            Ya
          </button>
          <button
            type="button"
            onClick={() => updateField('SMOKE', 'no')}
            className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-semibold ${
              formData.SMOKE === 'no'
                ? 'border-teal-500 bg-teal-50/40 text-teal-700 ring-1 ring-teal-500'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};
export default Step3Activity;
