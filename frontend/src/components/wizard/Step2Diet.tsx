import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../context/FormContext';

export const Step2Diet: React.FC = () => {
  const { t } = useTranslation();
  const { formData, setFormData } = useFormContext();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-7 sm:space-y-8 animate-slideIn">
      {/* Riwayat Obesitas Keluarga */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.family_history')}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('family_history', 'yes')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
              formData.family_history === 'yes'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            {t('wizard.questions.family_history_yes')}
          </button>
          <button
            type="button"
            onClick={() => updateField('family_history', 'no')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
              formData.family_history === 'no'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            {t('wizard.questions.family_history_no')}
          </button>
        </div>
      </div>

      {/* FAVC - Makanan Berkalori Tinggi */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.favc')}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('FAVC', 'yes')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
              formData.FAVC === 'yes'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            {t('wizard.questions.favc_yes')}
          </button>
          <button
            type="button"
            onClick={() => updateField('FAVC', 'no')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
              formData.FAVC === 'no'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            {t('wizard.questions.favc_no')}
          </button>
        </div>
      </div>

      {/* FCVC - Frekuensi Sayuran */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.fcvc')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 1, label: t('wizard.questions.fcvc_never') },
            { value: 2, label: t('wizard.questions.fcvc_sometimes') },
            { value: 3, label: t('wizard.questions.fcvc_always') },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('FCVC', item.value)}
              className={`p-4 rounded-xl border text-center transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer ${
                formData.FCVC === item.value
                  ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
              }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* NCP - Jumlah Makan Utama */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.ncp')}
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateField('NCP', num)}
              className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
                formData.NCP === num
                  ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
              }`}
            >
              {num}x
            </button>
          ))}
        </div>
      </div>

      {/* CAEC - Ngemil */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.caec')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { value: 'no', label: t('wizard.questions.caec_no') },
            { value: 'Sometimes', label: t('wizard.questions.caec_sometimes') },
            { value: 'Frequently', label: t('wizard.questions.caec_frequently') },
            { value: 'Always', label: t('wizard.questions.caec_always') },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('CAEC', item.value)}
              className={`p-3 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
                formData.CAEC === item.value
                  ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
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
