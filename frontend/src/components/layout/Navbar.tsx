import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateWizard: () => void;
  onOpenAbout: () => void;
  isWizardActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateWizard,
  onOpenAbout,
  isWizardActive,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="top-nav"
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full py-4 transition-all duration-500 floating-nav ${isScrolled ? 'navbar-scrolled' : 'bg-transparent'
        }`}
    >
      <div
        id="nav-container"
        className={`max-w-container-max mx-auto flex justify-between items-center transition-all duration-500 px-4 md:px-8 ${isScrolled ? 'md:px-6' : 'md:px-page-margin-desktop'
          }`}
      >
        {/* Brand Logo */}
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
        >
          <span className="text-xl font-bold tracking-tight text-on-surface">
            OBESIGHT
          </span>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={onNavigateHome}
            className={`font-medium pt-1 pb-1 border-y-2 border-x-0 font-body-md transition-colors cursor-pointer border-t-transparent ${!isWizardActive
              ? 'text-secondary border-b-secondary'
              : 'text-on-surface-variant hover:text-secondary border-b-transparent'
              }`}
          >
            Beranda
          </button>
          <button
            onClick={onNavigateWizard}
            className={`font-medium pt-1 pb-1 border-y-2 border-x-0 font-body-md transition-colors cursor-pointer border-t-transparent ${isWizardActive
              ? 'text-secondary border-b-secondary'
              : 'text-on-surface-variant hover:text-secondary border-b-transparent'
              }`}
          >
            Skrining
          </button>
          <button
            onClick={onOpenAbout}
            className="text-on-surface-variant hover:text-secondary transition-colors duration-200 font-body-md cursor-pointer border-y-2 border-x-0 border-t-transparent border-b-transparent pt-1 pb-1 font-medium"
          >
            Tentang
          </button>
        </div>

        {/* Align element to preserve three-column layout */}
        <div className="flex items-center gap-4"></div>
      </div>
    </header>
  );
};
export default Navbar;
