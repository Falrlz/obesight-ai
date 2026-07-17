import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getModelInfo } from '../services/api';
import type { ModelInfoResponse } from '../services/api';
import ParticleField from '../components/landing/ParticleField';
import { useFormContext } from '../context/FormContext';

const KAGGLE_URL = 'https://www.kaggle.com/datasets/suleymansulak/obesity-dataset';

const DATASET_ATTRIBUTES = [
  {
    group: 'about.dataset.group_demographics',
    items: [
      'about.attributes.gender',
      'about.attributes.age',
      'about.attributes.height',
      'about.attributes.family_history',
    ],
  },
  {
    group: 'about.dataset.group_diet',
    items: [
      'about.attributes.favc',
      'about.attributes.fcvc',
      'about.attributes.ncp',
      'about.attributes.caec',
      'about.attributes.ch2o',
      'about.attributes.scc',
    ],
  },
  {
    group: 'about.dataset.group_lifestyle',
    items: [
      'about.attributes.smoke',
      'about.attributes.faf',
      'about.attributes.tue',
      'about.attributes.mtrans',
    ],
  },
];

const DATASET_TOTAL = 1610;
const DATASET_CLASSES = [
  { label: 'about.classes.normal', count: 658 },
  { label: 'about.classes.overweight', count: 592 },
  { label: 'about.classes.obese', count: 287 },
  { label: 'about.classes.underweight', count: 73 },
];

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetForm } = useFormContext();
  const { t, i18n } = useTranslation();
  const [modelInfo, setModelInfo] = useState<ModelInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const info = await getModelInfo();
        if (active) setModelInfo(info);
      } catch (err) {
        console.error('Gagal memuat metadata model:', err);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative w-full pt-28 md:pt-32 pb-20 bg-background">
      <div className="max-w-container-max 2xl:max-w-[1600px] w-full mx-auto space-y-8 sm:space-y-10 px-4 md:px-8 lg:px-[80px] 2xl:px-0">

        {/* HEADER */}
        <header className="relative w-full rounded-3xl border border-outline-variant bg-gradient-to-r from-surface to-surface-container-low/40 p-6 sm:p-10 overflow-hidden flex flex-col justify-center min-h-[180px] sm:min-h-[220px]">
          {/* Background interactive particle field */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <ParticleField />
          </div>

          {/* Header Content */}
          <div className="relative z-10 space-y-3 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-on-surface leading-tight">
              {t('about.title')}
            </h1>
            <p className="text-sm sm:text-base text-text-secondary font-medium leading-relaxed animate-fade-in">
              {t('about.subtitle')}
            </p>
          </div>
        </header>

        {/* MODEL METADATA */}
        <section className="rounded-3xl border border-outline-variant bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-secondary/[0.08] border border-secondary/15 flex items-center justify-center text-secondary shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m10.852 14.772-.383.923" />
                <path d="m10.852 9.228-.383-.923" />
                <path d="m13.148 14.772.382.924" />
                <path d="m13.531 8.305-.383.923" />
                <path d="m14.772 10.852.923-.383" />
                <path d="m14.772 13.148.923.383" />
                <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" />
                <path d="M17.998 5.125a4 4 0 0 1 2.525 5.771" />
                <path d="M19.505 10.294a4 4 0 0 1-1.5 7.706" />
                <path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" />
                <path d="M4.5 10.291A4 4 0 0 0 6 18" />
                <path d="M6.002 5.125a3 3 0 0 0 .4 1.375" />
                <path d="m9.228 10.852-.923-.383" />
                <path d="m9.228 13.148-.923.383" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-on-surface tracking-tight">{t('about.model_info.title')}</h2>
              <p className="text-xs text-text-secondary/70">{t('about.model_info.subtitle')}</p>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="flex items-center justify-center gap-3 py-8 text-secondary font-medium text-sm">
                <span className="w-5 h-5 border-2 border-secondary/25 border-t-secondary rounded-full animate-spin" />
                {t('about.model_info.loading_metadata')}
              </div>
            ) : error || !modelInfo ? (
              <div className="rounded-2xl bg-rose-50 border border-rose-200 px-4 py-6 text-center text-sm font-medium text-rose-600">
                {t('about.model_info.failed_metadata')}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 rounded-2xl border border-outline-variant divide-x divide-outline-variant overflow-hidden">
                  <div className="p-4 text-center">
                    <p className="text-xl sm:text-2xl font-semibold text-on-surface">{modelInfo.model_name}</p>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/60">{t('about.model_info.algorithm')}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xl sm:text-2xl font-semibold text-on-surface">{modelInfo.framework}</p>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/60">{t('about.model_info.pipeline')}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-text-secondary/60 uppercase tracking-wider">
                    {t('about.model_info.features')} ({modelInfo.features_required.length})
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {modelInfo.features_required.map((feat) => (
                      <span
                        key={feat}
                        className="px-2.5 py-1 rounded-lg bg-secondary/[0.06] border border-secondary/15 text-xs font-medium text-secondary"
                      >
                        {t(`about.attributes.${feat.toLowerCase()}`, feat)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* DATASET */}
        <section className="rounded-3xl border border-outline-variant bg-white p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-secondary/[0.08] border border-secondary/15 flex items-center justify-center text-secondary shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14a9 3 0 0 0 18 0V5" />
                  <path d="M3 12a9 3 0 0 0 18 0" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-on-surface tracking-tight">{t('about.dataset.title')}</h2>
                <p className="text-xs text-text-secondary/70">{t('about.dataset.subtitle')}</p>
              </div>
            </div>
            <a
              href={KAGGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border border-outline-variant text-text-secondary hover:bg-surface-container-low/70 active:scale-95 transition-all"
            >
              {t('about.dataset.visit_source')}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </a>
          </div>

          <p className="mt-5 text-sm text-text-secondary leading-relaxed max-w-2xl animate-fade-in">
            {t('about.dataset.description')}
          </p>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-3 rounded-2xl border border-outline-variant divide-x divide-outline-variant overflow-hidden">
            <div className="p-4 text-center">
              <p className="text-xl sm:text-2xl font-semibold text-on-surface tabular-nums">1.610</p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/60">{t('about.dataset.respondents')}</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xl sm:text-2xl font-semibold text-on-surface tabular-nums">14</p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/60">{t('about.dataset.attributes')}</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xl sm:text-2xl font-semibold text-on-surface tabular-nums">4</p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/60">{t('about.dataset.categories')}</p>
            </div>
          </div>

          {/* Attribute groups */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DATASET_ATTRIBUTES.map((group) => (
              <div key={group.group}>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                  {t(group.group)}
                </h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-secondary leading-snug">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary/40 shrink-0" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Class distribution */}
          <div className="mt-8 pt-6 border-t border-outline-variant/60">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary/60">
              {t('about.dataset.class_distribution')}
            </h3>
            <div className="mt-4 space-y-3">
              {DATASET_CLASSES.map((c) => {
                const pct = (c.count / DATASET_TOTAL) * 100;
                return (
                  <div key={c.label} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-text-secondary">{t(c.label)}</span>
                      <span className="font-semibold text-text-secondary/70 tabular-nums">
                        {c.count.toLocaleString(i18n.language === 'id' ? 'id-ID' : 'en-US')} · {pct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-secondary" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-secondary/[0.04] border border-secondary/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-on-surface tracking-tight">
              {t('about.cta.title')}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t('about.cta.subtitle')}
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              navigate('/wizard');
            }}
            className="shrink-0 px-6 py-3 rounded-full text-sm font-semibold text-on-primary bg-secondary hover:bg-secondary/95 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            {t('common.start_screening')}
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
