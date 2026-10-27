import React, { useState, useEffect } from 'react';
import { Menu, X, CalendarCheck, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Blessing', href: '#shloka' },
    { label: 'Invitation', href: '#reveal' },
    { label: 'Events', href: '#events' },
    { label: 'Families', href: '#families' },
    { label: 'Venues', href: '#venues' },
    { label: 'Cards', href: '#gallery' },
    { label: 'Blessings', href: '#blessings' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2A050E]/90 backdrop-blur-md border-b border-gold-500/30 py-3 shadow-xl'
          : 'bg-gradient-to-b from-[#1F040A]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-gold-400/60 bg-[#4A0E17]/80 flex items-center justify-center shadow-lg group-hover:border-gold-300 transition-colors">
            <span className="font-serif text-lg font-bold text-gold-300 tracking-wider">S&amp;N</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base tracking-widest text-[#FDFBF7] uppercase font-medium">
              Sandeep <span className="text-gold-400 font-script normal-case text-lg">&amp;</span> Nikitha
            </span>
            <span className="text-[10px] text-gold-400 tracking-widest uppercase">November 2026</span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs lg:text-sm uppercase tracking-wider text-[#FDFBF7]/80 hover:text-gold-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold-400 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-[#3D0A14] shadow-lg shadow-gold-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>RSVP</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#24040B]/98 border-b border-gold-500/30 px-6 py-6 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif tracking-wider text-[#FDFBF7] hover:text-gold-300 py-2 border-b border-gold-500/10 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <Sparkles className="w-3.5 h-3.5 text-gold-400/60" />
              </a>
            ))}
            <a
              href="#rsvp"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-[#3D0A14] shadow-lg shadow-gold-500/30 text-center"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>RSVP to Celebrations</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
