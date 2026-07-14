import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/obesight-icon.svg';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateWizard: () => void;
  onNavigateAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateWizard,
  onNavigateAbout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and allow Escape to dismiss while the menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleMobileNav = (action: () => void) => {
    setIsMobileMenuOpen(false);
    action();
  };

  const isHomeActive = location.pathname === '/';
  const isWizardActive = location.pathname === '/wizard';
  const isAboutActive = location.pathname === '/tentang';

  const navLinks = [
    { label: 'Beranda', mobileLabel: 'Beranda', onClick: onNavigateHome, isActive: isHomeActive },
    { label: 'Skrining', mobileLabel: 'Skrining Mandiri', onClick: onNavigateWizard, isActive: isWizardActive },
    { label: 'Tentang', mobileLabel: 'Tentang AI', onClick: onNavigateAbout, isActive: isAboutActive },
  ];

  const handleLinkClick = (link: (typeof navLinks)[number]) => {
    if (link.isActive) {
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleMobileNav(link.onClick);
    }
  };

  // The header collapses into its floating pill both on scroll and while the menu is open,
  // so the dropdown below always stays aligned with it.
  const isCompact = isScrolled || isMobileMenuOpen;

  const headerClass = `fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full py-4 transition-all duration-500 floating-nav ${
    isCompact ? 'navbar-scrolled' : 'bg-transparent'
  }`;

  const containerClass = `max-w-container-max 2xl:max-w-[1600px] mx-auto flex justify-between items-center transition-all duration-500 ${
    isCompact ? 'px-0' : 'px-4 md:px-8 lg:px-[80px] 2xl:px-0'
  }`;

  return (
    <>
      {/* Backdrop — rendered outside <header> because the header is transformed,
          which would otherwise make `fixed` resolve against the header box. */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-on-surface/25 backdrop-blur-[2px] animate-fade-in"
          aria-hidden="true"
        />
      )}

      <header id="top-nav" className={headerClass}>
        <div id="nav-container" className={containerClass}>
          {/* Brand Logo */}
          <div
            onClick={() => {
              if (isHomeActive) {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                handleMobileNav(onNavigateHome);
              }
            }}
            className="flex items-center gap-2.5 cursor-pointer transition-transform active:scale-95"
          >
            <img src={logo} className="w-6 h-6 object-contain" alt="" />
            <span className="text-xl font-bold tracking-tight text-on-surface">OBESIGHT</span>
          </div>

          {/* Navigation Items (Desktop) */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                aria-current={link.isActive ? 'page' : undefined}
                className={`font-medium pt-1 pb-1 border-y-2 border-x-0 font-body-md transition-colors cursor-pointer border-t-transparent ${
                  link.isActive
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
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={`flex lg:hidden items-center justify-center w-10 h-10 -mr-1 rounded-full transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
              isMobileMenuOpen
                ? 'bg-secondary/[0.08] text-secondary'
                : 'text-on-surface hover:bg-surface-container-low hover:text-secondary'
            }`}
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown — anchored to the header so it tracks the floating pill */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden absolute left-0 right-0 top-full pt-3">
            <nav className="p-2 rounded-3xl border border-outline-variant/60 bg-white/95 backdrop-blur-xl shadow-[0_16px_40px_-12px_rgba(0,0,0,0.18)] animate-fade-in">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  aria-current={link.isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between gap-3 text-left px-4 py-3.5 rounded-2xl text-base font-semibold transition-colors cursor-pointer ${
                    link.isActive
                      ? 'bg-secondary/[0.08] text-secondary'
                      : 'text-text-secondary hover:bg-surface-container-low active:bg-surface-container-low'
                  }`}
                >
                  {link.mobileLabel}
                  {link.isActive && <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
