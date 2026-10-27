import React from 'react';
import { Sparkles, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';

export const HeroSection: React.FC = () => {
  const { couple } = WEDDING_CONFIG;

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
      {/* Decorative Traditional Arch & Glow */}
      <div className="absolute inset-0 kolam-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-kumkum-700/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        {/* Sacred Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0A14]/90 border border-gold-400/50 shadow-xl backdrop-blur-md mb-6">
          <span className="text-gold-400 text-sm">🪔</span>
          <span className="text-xs uppercase tracking-[0.2em] font-serif text-gold-200 font-semibold">
            The Auspicious Kalyanam
          </span>
          <span className="text-gold-400 text-sm">🪔</span>
        </div>

        {/* Request Gracious Presence */}
        <p className="font-serif italic text-base sm:text-lg text-gold-200/90 tracking-wide max-w-xl mx-auto mb-2">
          Request your gracious presence at the wedding celebration of
        </p>

        {/* Couple Names */}
        <div className="my-4 flex flex-col items-center">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gold-gradient drop-shadow-lg">
            {couple.groom.firstName}
          </h1>

          <div className="my-2 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold-400/70" />
            <span className="font-script text-3xl sm:text-4xl text-gold-300 font-normal">weds</span>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold-400/70" />
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gold-gradient drop-shadow-lg">
            {couple.bride.firstName}
          </h2>
        </div>

        {/* Full Surnames & Families */}
        <p className="font-serif text-xs sm:text-sm tracking-widest uppercase text-gold-400/90 mt-1 mb-8">
          {couple.groom.fullName} &amp; {couple.bride.fullName}
        </p>

        {/* Date & Location Pill Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full p-4 sm:p-5 rounded-2xl bg-royal-card border border-gold-500/40 shadow-2xl backdrop-blur-lg">
          <div className="flex items-center gap-3.5 px-3 py-2 rounded-xl bg-[#2D070E]/60 border border-gold-500/20 text-left">
            <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-400/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-serif tracking-widest text-gold-300">Wedding Date</p>
              <p className="text-sm font-serif font-bold text-[#FDFBF7]">22nd November 2026</p>
              <p className="text-[11px] text-gold-400/80">Sunday • Auspicious Muhurtham</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 py-2 rounded-xl bg-[#2D070E]/60 border border-gold-500/20 text-left">
            <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-400/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-serif tracking-widest text-gold-300">Ceremony Venue</p>
              <p className="text-sm font-serif font-bold text-[#FDFBF7]">Siri Function Hall</p>
              <p className="text-[11px] text-gold-400/80">Thungathurthi, Telangana</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#events"
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-[#3D0A14] shadow-xl shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Wedding Itinerary</span>
          </a>

          <a
            href="#rsvp"
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#3D0A14] border border-gold-400/60 text-gold-200 hover:text-white hover:border-gold-300 hover:bg-[#5B0E1D] transition-all"
          >
            <span>Confirm RSVP</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center animate-bounce text-gold-400/70">
          <span className="text-[10px] uppercase tracking-widest font-serif mb-1">Scroll Down</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
};
