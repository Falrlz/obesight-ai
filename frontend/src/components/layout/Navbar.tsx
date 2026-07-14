import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateWizard: () => void;
  onNavigateAbout: () => void;
  isWizardActive: boolean;
  isAboutActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateWizard,
  onNavigateAbout,
  isWizardActive,
  isAboutActive,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNav = (action: () => void) => {
    setIsMobileMenuOpen(false);
    action();
  };

  const navLinks = [
    { label: 'Beranda', mobileLabel: 'Beranda', onClick: onNavigateHome, isActive: !isWizardActive && !isAboutActive },
    { label: 'Skrining', mobileLabel: 'Skrining Mandiri', onClick: onNavigateWizard, isActive: isWizardActive },
    { label: 'Tentang', mobileLabel: 'Tentang AI', onClick: onNavigateAbout, isActive: isAboutActive },
  ];

  const headerClass = `fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full py-4 transition-all duration-500 floating-nav ${isScrolled || isMobileMenuOpen ? 'navbar-scrolled' : 'bg-transparent'
    }`;

  const containerClass = `max-w-container-max 2xl:max-w-[1600px] mx-auto flex justify-between items-center transition-all duration-500 ${isScrolled ? 'px-0' : 'px-4 md:px-8 lg:px-[80px] 2xl:px-0'
    }`;

  return (
    <header id="top-nav" className={headerClass}>
      <div id="nav-container" className={containerClass}>
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
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className={`font-medium pt-1 pb-1 border-y-2 border-x-0 font-body-md transition-colors cursor-pointer border-t-transparent ${link.isActive
                  ? 'text-secondary border-b-secondary'
                  : 'text-on-surface-variant hover:text-secondary border-b-transparent'
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex lg:hidden p-2 text-on-surface hover:text-secondary transition-colors z-50 focus:outline-none"
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
        <div className="lg:hidden fixed inset-0 top-[60px] bg-background/95 backdrop-blur-md z-40 flex flex-col p-6 space-y-6 transition-all duration-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleMobileNav(link.onClick)}
              className={`text-left text-xl font-bold py-3 border-b border-outline-variant/20 transition-colors ${link.isActive ? 'text-secondary' : 'text-on-surface-variant'
                }`}
            >
              {link.mobileLabel}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
