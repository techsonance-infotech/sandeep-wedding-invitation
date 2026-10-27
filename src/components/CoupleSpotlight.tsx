import React from 'react';
import { Sparkles, Heart, ZoomIn, Eye } from 'lucide-react';
import { FloralDivider } from './FloralDivider';
import { CornerDecor } from './CornerDecor';

interface Props {
  onOpenPhoto?: (src: string) => void;
}

export const CoupleSpotlight: React.FC<Props> = ({ onOpenPhoto }) => {
  return (
    <section
      id="the-couple"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream border-t border-gold-soft/30 overflow-hidden"
    >
      <CornerDecor />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-soft/60 border border-gold-soft/60 text-sage-deep mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-widest uppercase">
              CELEBRATING TRUE LOVE
            </span>
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
          </div>

          <h2 className="font-script text-4xl sm:text-6xl lg:text-7xl text-rose-deep mt-1 leading-tight">
            The Happy Couple
          </h2>

          <FloralDivider />

          <p className="font-serif-display italic text-base sm:text-xl text-foreground/80 max-w-2xl mx-auto px-2 leading-relaxed">
            With hearts full of love and gratitude, we invite you to share in the joy of our union as we begin our forever together.
          </p>
        </div>

        {/* Dual Luxury Photo Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
          {/* Photo 1: Royal Palace Promenade (Faces guaranteed uncropped with focal point 50% 36%) */}
          <div className="group relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-white/95 via-cream/90 to-sage-soft/30 border-2 border-gold-soft/80 shadow-elegant hover:shadow-gold transition-all duration-700 flex flex-col justify-between">
            {/* Top Monogram Tag */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-gold-soft/40">
              <span className="font-cinzel text-[11px] font-semibold text-rose-deep tracking-wider flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-rose-deep fill-rose-deep" />
                ROYAL ELEGANCE
              </span>
              <span className="font-cinzel text-[10px] tracking-widest text-sage-deep">
                #SandeepWedsNikitha
              </span>
            </div>

            {/* Image Container with Royal Arch Proportions & Specific Focal Point */}
            <div
              onClick={() => onOpenPhoto?.('/assets/couple/couple_royal_palace.jpg')}
              className="relative my-3 rounded-t-[2.5rem] rounded-b-2xl overflow-hidden aspect-[9/14] sm:aspect-[9/13.5] bg-cream border border-gold-soft/50 shadow-inner cursor-pointer"
            >
              <img
                src="/assets/couple/couple_royal_palace.jpg"
                alt="Sandeep and Nikitha Royal Palace Gown Portrait"
                loading="lazy"
                style={{ objectPosition: '50% 36%' }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gentle bottom-only shadow so faces stay bright & completely clear */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

              {/* Hover Zoom Pill */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/95 text-rose-deep font-cinzel text-xs font-semibold border border-gold-soft shadow-gold">
                  <ZoomIn className="w-4 h-4 text-gold" />
                  View Full Portrait
                </span>
              </div>

              {/* Bottom Subtle Photo Tag */}
              <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                <span className="inline-block px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-cream text-[11px] font-cinzel tracking-wider border border-white/20">
                  A Royal Fairytale
                </span>
              </div>
            </div>

            {/* Bottom Caption & Names */}
            <div className="pt-2 pb-1 px-2 text-center">
              <h3 className="font-script text-3xl sm:text-4xl text-rose-deep">
                Nikitha &amp; Sandeep
              </h3>
              <p className="font-cinzel text-xs font-semibold text-sage-deep tracking-wider mt-1">
                A ROYAL PROMISE OF ETERNITY
              </p>
              <p className="font-serif-display italic text-sm text-foreground/80 mt-2 leading-relaxed">
                "In your eyes, I have found my forever home. Together, every step is a blessing."
              </p>
              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => onOpenPhoto?.('/assets/couple/couple_royal_palace.jpg')}
                  className="inline-flex items-center gap-1.5 text-rose-deep hover:text-gold-soft font-cinzel text-[11px] tracking-wider transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to view uncropped high-resolution</span>
                </button>
              </div>
            </div>
          </div>

          {/* Photo 2: Traditional Sacred Portrait (Focal point 50% 15% preserves groom's head & smile) */}
          <div className="group relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-white/95 via-cream/90 to-sage-soft/30 border-2 border-gold-soft/80 shadow-elegant hover:shadow-gold transition-all duration-700 flex flex-col justify-between">
            {/* Top Monogram Tag */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-gold-soft/40">
              <span className="font-cinzel text-[11px] font-semibold text-rose-deep tracking-wider flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-rose-deep fill-rose-deep" />
                SACRED TRADITION
              </span>
              <span className="font-cinzel text-[10px] tracking-widest text-sage-deep">
                22ND NOVEMBER 2026
              </span>
            </div>

            {/* Image Container with Royal Arch Proportions & Specific Focal Point */}
            <div
              onClick={() => onOpenPhoto?.('/assets/couple/couple_portrait.jpg')}
              className="relative my-3 rounded-t-[2.5rem] rounded-b-2xl overflow-hidden aspect-[9/14] sm:aspect-[9/13.5] bg-cream border border-gold-soft/50 shadow-inner cursor-pointer"
            >
              <img
                src="/assets/couple/couple_portrait.jpg"
                alt="Sandeep and Nikitha Traditional Intimate Portrait"
                loading="lazy"
                style={{ objectPosition: '50% 15%' }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gentle bottom-only shadow so faces stay bright & completely clear */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

              {/* Hover Zoom Pill */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/95 text-rose-deep font-cinzel text-xs font-semibold border border-gold-soft shadow-gold">
                  <ZoomIn className="w-4 h-4 text-gold" />
                  View Full Portrait
                </span>
              </div>

              {/* Bottom Subtle Photo Tag */}
              <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                <span className="inline-block px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-cream text-[11px] font-cinzel tracking-wider border border-white/20">
                  Two Souls, One Sacred Bond
                </span>
              </div>
            </div>

            {/* Bottom Caption & Names */}
            <div className="pt-2 pb-1 px-2 text-center">
              <h3 className="font-script text-3xl sm:text-4xl text-rose-deep">
                Sandeep &amp; Nikitha
              </h3>
              <p className="font-cinzel text-xs font-semibold text-sage-deep tracking-wider mt-1">
                UNITED BY LOVE &amp; BLESSINGS
              </p>
              <p className="font-serif-display italic text-sm text-foreground/80 mt-2 leading-relaxed">
                "Blessed by our beloved parents and guided by tradition, we celebrate our eternal union."
              </p>
              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => onOpenPhoto?.('/assets/couple/couple_portrait.jpg')}
                  className="inline-flex items-center gap-1.5 text-rose-deep hover:text-gold-soft font-cinzel text-[11px] tracking-wider transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to view uncropped high-resolution</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grand Wedding Quote Card */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto text-center p-6 sm:p-8 rounded-3xl bg-white/70 border border-gold-soft/70 shadow-elegant relative">
          <span className="text-3xl select-none">🪷</span>
          <p className="font-script text-3xl sm:text-4xl text-rose-deep mt-2">
            "Where there is love, there is life."
          </p>
          <div className="w-20 h-px bg-gold-soft mx-auto my-3" />
          <p className="font-cinzel text-xs text-sage-deep tracking-widest font-semibold uppercase">
            SANDEEP RUDRA &amp; NIKITHA YANAGANDHULA
          </p>
          <p className="font-serif-display text-xs sm:text-sm text-foreground/75 mt-1 italic">
            With the blessings of the Rudra &amp; Yanagandhula Families
          </p>
        </div>
      </div>
    </section>
  );
};
