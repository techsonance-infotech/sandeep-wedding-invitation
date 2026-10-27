import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { WEDDING_CONFIG, FAMILIES } from '../data/weddingData';

export const CoupleStory: React.FC = () => {
  const { couple } = WEDDING_CONFIG;
  const groomFamily = FAMILIES.find((f) => f.side === 'groom');
  const brideFamily = FAMILIES.find((f) => f.side === 'bride');

  return (
    <section id="families" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/40 bg-[#3D0A14] text-gold-300 text-xs font-serif tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Divine Companionship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
            The Bride, The Groom &amp; Their Families
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#FDFBF7]/80 max-w-xl mx-auto font-serif italic">
            "కల్యాణం అద్భుతం — Two sacred souls uniting with the blessings of ancestors and loving families."
          </p>
        </div>

        {/* Two Columns: Groom & Bride */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom Card */}
          <div className="p-8 rounded-3xl bg-royal-card border border-gold-500/40 shadow-2xl relative flex flex-col justify-between group hover:border-gold-300 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-serif uppercase tracking-widest bg-gold-500/10 border border-gold-400/30 text-gold-300">
                  The Groom
                </span>
                <span className="text-xs text-gold-400 font-serif font-semibold">Rudra Family</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-gold-bright font-bold mb-1">
                {couple.groom.fullName}
              </h3>
              <p className="text-xs uppercase font-serif tracking-widest text-gold-300/80 mb-4">
                {couple.groom.parentsPrefix} {couple.groom.parentsNames}
              </p>

              <div className="w-16 h-[1.5px] bg-gold-400/40 mb-4" />

              <p className="text-xs sm:text-sm text-[#FDFBF7]/85 leading-relaxed mb-6">
                {couple.groom.bio}
              </p>
            </div>

            {/* Family blessings box */}
            {groomFamily && (
              <div className="p-4 rounded-xl bg-[#20040A]/80 border border-gold-500/20 text-xs text-gold-200/90 italic">
                <p className="font-serif text-gold-400 font-semibold not-italic mb-1">
                  From {groomFamily.familyName}:
                </p>
                <p>"{groomFamily.blessingQuote}"</p>
                <p className="mt-2 font-serif text-[11px] text-gold-300 not-italic font-medium">
                  — {groomFamily.parents.father} &amp; {groomFamily.parents.mother}
                </p>
              </div>
            )}
          </div>

          {/* Bride Card */}
          <div className="p-8 rounded-3xl bg-royal-card border border-gold-500/40 shadow-2xl relative flex flex-col justify-between group hover:border-gold-300 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-serif uppercase tracking-widest bg-gold-500/10 border border-gold-400/30 text-gold-300">
                  The Bride
                </span>
                <span className="text-xs text-gold-400 font-serif font-semibold">Yanagandhula Family</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-gold-bright font-bold mb-1">
                {couple.bride.fullName}
              </h3>
              <p className="text-xs uppercase font-serif tracking-widest text-gold-300/80 mb-4">
                {couple.bride.parentsPrefix} {couple.bride.parentsNames}
              </p>

              <div className="w-16 h-[1.5px] bg-gold-400/40 mb-4" />

              <p className="text-xs sm:text-sm text-[#FDFBF7]/85 leading-relaxed mb-6">
                {couple.bride.bio}
              </p>
            </div>

            {/* Family blessings box */}
            {brideFamily && (
              <div className="p-4 rounded-xl bg-[#20040A]/80 border border-gold-500/20 text-xs text-gold-200/90 italic">
                <p className="font-serif text-gold-400 font-semibold not-italic mb-1">
                  From {brideFamily.familyName}:
                </p>
                <p>"{brideFamily.blessingQuote}"</p>
                <p className="mt-2 font-serif text-[11px] text-gold-300 not-italic font-medium">
                  — {brideFamily.parents.father} &amp; {brideFamily.parents.mother}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Central Union Blessing Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#3D0A14] via-[#5B0E1D] to-[#3D0A14] border border-gold-500/40 text-center shadow-xl">
          <div className="flex items-center justify-center gap-2 text-gold-300 mb-2">
            <Heart className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span className="font-serif text-xs uppercase tracking-widest font-semibold">The Sacred Union</span>
            <Heart className="w-4 h-4 text-gold-400 fill-gold-400" />
          </div>
          <p className="font-serif text-sm sm:text-base text-[#FDFBF7] max-w-2xl mx-auto">
            "With joy in our hearts and prayers on our lips, the Rudra and Yanagandhula families eagerly await your gracious presence to bless Sandeep and Nikitha."
          </p>
        </div>
      </div>
    </section>
  );
};
