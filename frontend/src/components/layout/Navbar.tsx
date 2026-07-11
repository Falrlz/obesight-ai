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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      // Optimize by only triggering a state update if the scroll threshold state actually changes,
      // avoiding redundant React renders on every single scroll event.
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  const handleMobileNav = (action: () => void) => {
    setIsMobileMenuOpen(false);
    action();
  };

  return (
    <header
      id="top-nav"
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full py-4 transition-all duration-500 floating-nav ${
        isScrolled || isMobileMenuOpen ? 'navbar-scrolled' : 'bg-transparent'
      }`}
    >
      <div
        id="nav-container"
        className={`max-w-container-max mx-auto flex justify-between items-center transition-all duration-500 px-4 md:px-8 ${
          isScrolled ? 'md:px-6' : 'md:px-page-margin-desktop'
        }`}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleMobileNav(onNavigateHome)}
          className="flex items-center gap-2.5 cursor-pointer transition-transform active:scale-95 z-50"
        >
          {/* Ikon Timbangan Cerdas (Smart Scale) */}
          <svg className="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <rect x="9" y="6" width="6" height="3" rx="1" strokeWidth="1.5" />
            <path d="M6 10v6a2 2 0 0 0 2 2h1" />
            <path d="M18 10v6a2 2 0 0 1-2 2h-1" />
          </svg>
          <span className="text-xl font-bold tracking-tight text-on-surface">
            OBESIGHT
          </span>
        </div>

        {/* Navigation Items (Desktop) */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={onNavigateHome}
            className={`font-medium pt-1 pb-1 border-y-2 border-x-0 font-body-md transition-colors cursor-pointer border-t-transparent ${
              !isWizardActive
                ? 'text-secondary border-b-secondary'
                : 'text-on-surface-variant hover:text-secondary border-b-transparent'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={onNavigateWizard}
            className={`font-medium pt-1 pb-1 border-y-2 border-x-0 font-body-md transition-colors cursor-pointer border-t-transparent ${
              isWizardActive
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

        {/* Mobile Menu Button (Hamburger) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden p-2 text-on-surface hover:text-secondary transition-colors z-50 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background/95 backdrop-blur-md z-40 flex flex-col p-6 space-y-6 transition-all duration-300">
          <button
            onClick={() => handleMobileNav(onNavigateHome)}
            className={`text-left text-xl font-bold py-3 border-b border-outline-variant/20 transition-colors ${
              !isWizardActive ? 'text-secondary' : 'text-on-surface-variant'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => handleMobileNav(onNavigateWizard)}
            className={`text-left text-xl font-bold py-3 border-b border-outline-variant/20 transition-colors ${
              isWizardActive ? 'text-secondary' : 'text-on-surface-variant'
            }`}
          >
            Skrining Mandiri
          </button>
          <button
            onClick={() => handleMobileNav(onOpenAbout)}
            className="text-left text-xl font-bold py-3 border-b border-outline-variant/20 text-on-surface-variant transition-colors"
          >
            Tentang AI
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
