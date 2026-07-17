import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateWizard?: () => void;
  onNavigateAbout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateWizard,
  onNavigateAbout,
}) => {
  const location = useLocation();
  const { t } = useTranslation();

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigateHome?.();
    }
  };

  const handleWizardClick = () => {
    if (location.pathname === '/wizard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigateWizard?.();
    }
  };

  const handleAboutClick = () => {
    if (location.pathname === '/tentang') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigateAbout?.();
    }
  };

  return (
    <footer className="w-full flex flex-col justify-between bg-black pt-24 -mt-px relative z-30 print:hidden">
      <div className="max-w-none px-4 md:px-page-margin-desktop lg:px-[6vw] w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & Info */}
          <div className="flex flex-col gap-6 items-center md:items-start">
            <h5 className="font-headline-lg text-3xl font-bold text-white">OBESIGHT</h5>
            <p className="font-body-md text-zinc-400 max-w-xs text-center md:text-left leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h5 className="font-headline-lg text-3xl font-bold text-white mb-6 uppercase">{t('footer.navigation')}</h5>
            <ul className="space-y-4 font-normal">
              <li>
                <button
                  onClick={handleHomeClick}
                  className="font-body-md text-zinc-400 hover:text-secondary leading-relaxed transition-colors cursor-pointer"
                >
                  {t('navbar.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={handleWizardClick}
                  className="font-body-md text-zinc-400 hover:text-secondary leading-relaxed transition-colors cursor-pointer"
                >
                  {t('navbar.screening')}
                </button>
              </li>
              <li>
                <button
                  onClick={handleAboutClick}
                  className="font-body-md text-zinc-400 hover:text-secondary leading-relaxed transition-colors cursor-pointer"
                >
                  {t('navbar.about')}
                </button>
              </li>
            </ul>
          </div>

          {/* Medical Disclaimer */}
          <div className="text-center md:text-left md:col-span-2">
            <h5 className="font-headline-lg text-3xl font-bold text-white mb-6 text-center md:text-left uppercase">
              {t('footer.disclaimer_title')}
            </h5>
            <p className="font-body-md text-zinc-400 leading-relaxed text-left md:text-justify animate-fade-in">
              {t('footer.disclaimer_text')}
            </p>
          </div>
        </div>
      </div>

      {/* Gigantic Brand Name */}
      <div className="mt-auto overflow-hidden pointer-events-none select-none w-full relative h-[10.5vw] md:h-[14vw] xl:h-[180px]">
        <h2 className="absolute top-0 left-0 w-full text-[15vw] md:text-[20vw] xl:text-[256px] font-bold text-secondary/15 leading-none text-center uppercase tracking-tighter">
          OBESIGHT
        </h2>
      </div>
    </footer>
  );
};
export default Footer;
