import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../context/FormContext';

export const Step4Habits: React.FC = () => {
  const { t } = useTranslation();
  const { formData, setFormData } = useFormContext();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-7 sm:space-y-8 animate-slideIn">
      {/* TUE - Waktu Layar/Gadget */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">
          {t('wizard.questions.tue')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 0, label: t('wizard.questions.tue_0_2'), desc: t('wizard.questions.low') },
            { value: 1, label: t('wizard.questions.tue_3_5'), desc: t('wizard.questions.moderate') },
            { value: 2, label: t('wizard.questions.tue_more_5'), desc: t('wizard.questions.high') },
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
          {t('wizard.questions.calc')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { value: 'no', label: t('wizard.questions.caec_no') },
            { value: 'Sometimes', label: t('wizard.questions.caec_sometimes') },
            { value: 'Frequently', label: t('wizard.questions.caec_frequently') },
            { value: 'Always', label: t('wizard.questions.calc_always') },
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
          {t('wizard.questions.mtrans')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { value: 'Walking', label: t('wizard.questions.mtrans_walking') },
            { value: 'Bike', label: t('wizard.questions.mtrans_bike') },
            { value: 'Public_Transportation', label: t('wizard.questions.mtrans_public') },
            { value: 'Motorbike', label: t('wizard.questions.mtrans_motor') },
            { value: 'Automobile', label: t('wizard.questions.mtrans_car') },
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
