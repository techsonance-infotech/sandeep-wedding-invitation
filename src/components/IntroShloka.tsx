import React from 'react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { Sparkles } from 'lucide-react';

export const IntroShloka: React.FC = () => {
  const { invocation } = WEDDING_CONFIG;

  return (
    <section id="shloka" className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-20">
        {/* Sacred Ganesha Emblem */}
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-[#3D0A14] border border-gold-400/40 shadow-inner">
          <span className="text-2xl text-gold-300">ॐ</span>
        </div>

        {/* Title */}
        <p className="font-serif tracking-[0.25em] text-xs sm:text-sm text-gold-300 font-semibold uppercase mb-3 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{invocation.title}</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        </p>

        {/* Sanskrit Shloka */}
        <div className="my-6 p-6 sm:p-8 rounded-2xl bg-royal-card border border-gold-500/30 shadow-2xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-[#5B0E1D] border border-gold-400/40 rounded-full text-[11px] font-serif text-gold-300 tracking-wider">
            मंगल श्लोकम्
          </div>

          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-gold-gradient font-bold leading-relaxed mb-4">
            {invocation.sanskritShloka}
          </h2>

          <p className="font-serif italic text-sm sm:text-base text-gold-200/90 tracking-wide mb-4">
            "{invocation.transliteration}"
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent mx-auto my-4" />

          <p className="text-xs sm:text-sm text-[#FDFBF7]/80 max-w-2xl mx-auto leading-relaxed">
            {invocation.englishMeaning}
          </p>
        </div>

        {/* Sub blessing */}
        <p className="text-sm sm:text-base text-gold-100/90 font-serif italic max-w-xl mx-auto leading-relaxed mt-4">
          {invocation.subBlessing}
        </p>
      </div>
    </section>
  );
};
