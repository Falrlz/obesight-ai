import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../context/FormContext';

export const Step3Activity: React.FC = () => {
  const { t } = useTranslation();
  const { formData, setFormData } = useFormContext();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-7 sm:space-y-8 animate-slideIn">
      {/* CH2O - Konsumsi Air Mineral */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.ch2o')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 1, label: t('wizard.questions.ch2o_1'), desc: t('wizard.questions.ch2o_1_desc') },
            { value: 2, label: t('wizard.questions.ch2o_2'), desc: t('wizard.questions.ch2o_2_desc') },
            { value: 3, label: t('wizard.questions.ch2o_3'), desc: t('wizard.questions.ch2o_3_desc') },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('CH2O', item.value)}
              className={`p-4 rounded-xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                formData.CH2O === item.value
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

      {/* FAF - Aktivitas Fisik (Olahraga) */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.faf')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { value: 0, label: t('wizard.questions.faf_never_label'), desc: `0 ${t('wizard.questions.days')}` },
            { value: 1, label: t('wizard.questions.faf_rarely_label'), desc: `1 - 2 ${t('wizard.questions.days')}` },
            { value: 2, label: t('wizard.questions.faf_moderate_label'), desc: `3 - 4 ${t('wizard.questions.days')}` },
            { value: 3, label: t('wizard.questions.faf_active_label'), desc: `5+ ${t('wizard.questions.days')}` },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => updateField('FAF', item.value)}
              className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-center cursor-pointer ${
                formData.FAF === item.value
                  ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                  : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
              }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs font-normal text-text-secondary/70 mt-0.5">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SCC - Pemantauan Kalori */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.scc')}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('SCC', 'yes')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
              formData.SCC === 'yes'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            {t('wizard.questions.scc_yes')}
          </button>
          <button
            type="button"
            onClick={() => updateField('SCC', 'no')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
              formData.SCC === 'no'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            {t('wizard.questions.scc_no')}
          </button>
        </div>
      </div>

      {/* SMOKE - Merokok */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.smoke')}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateField('SMOKE', 'yes')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
              formData.SMOKE === 'yes'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            {t('wizard.questions.family_history_yes')}
          </button>
          <button
            type="button"
            onClick={() => updateField('SMOKE', 'no')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 text-sm font-medium cursor-pointer ${
              formData.SMOKE === 'no'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            {t('wizard.questions.family_history_no')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Step3Activity;
