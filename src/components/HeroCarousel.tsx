import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles } from 'lucide-react';

interface Slide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description?: string;
  bgImage: string;
  accentBadge?: string;
  dateInfo?: string;
  locationInfo?: string;
}

const SLIDES: Slide[] = [
  {
    id: 'slide-royal-couple',
    tag: 'THE ROYAL WEDDING CELEBRATION',
    title: 'Sandeep & Nikitha',
    subtitle: 'Sunday, 22nd November 2026 • Siri Function Hall, Thungathurthi',
    description: 'Request your gracious presence and blessings as Sandeep Rudra & Nikitha Yanagandhula unite in holy matrimony.',
    bgImage: '/assets/couple/couple_royal_palace.jpg',
    accentBadge: '#SandeepWedsNikitha',
    dateInfo: 'Sunday, 22nd November 2026',
    locationInfo: 'Thungathurthi, Telangana',
  },
  {
    id: 'slide-portrait-couple',
    tag: 'A LIFETIME OF LOVE & TRADITION',
    title: 'Two Souls, One Sacred Bond',
    subtitle: 'Sandeep Rudra & Nikitha Yanagandhula',
    description: 'Together with the Rudra & Yanagandhula families, celebrating love, laughter, and lifelong devotion.',
    bgImage: '/assets/couple/couple_portrait.jpg',
    accentBadge: 'Rudra & Yanagandhula Families',
    dateInfo: '19th – 29th November 2026',
    locationInfo: 'Telangana & Gujarat',
  },
  {
    id: 'slide-invocation',
    tag: '॥ श्री गणेशाय नमः ॥',
    title: 'Divine Blessings',
    subtitle: 'Vakratunda Mahakaya Suryakoti Samaprabha',
    description: 'Under the holy blessings of Lord Shiva & Goddess Parvati, invoking Lord Ganesha to bless this auspicious union without obstacles.',
    bgImage: '/assets/cards/card_0_invocation.jpeg',
    accentBadge: 'Auspicious Shloka',
    dateInfo: 'Holy Muhurtham',
    locationInfo: 'Siri Function Hall',
  },
  {
    id: 'slide-functions',
    tag: 'FOUR AUSPICIOUS CELEBRATIONS',
    title: 'Haldi • Sangeet • Marriage • Reception',
    subtitle: '19th November to 29th November 2026',
    description: 'From vibrant turmeric mornings in Suryapet to the sacred Kalyanam in Thungathurthi and a grand reception in Surat.',
    bgImage: '/assets/cards/card_4_marriage.jpeg',
    accentBadge: 'Complete Itinerary',
    dateInfo: 'Nov 19, 22 & 29, 2026',
    locationInfo: 'Suryapet • Thungathurthi • Surat',
  },
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = SLIDES.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, current]);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#220409]"
    >
      {/* Background Slides with Zoom / Fade */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image with Ken Burns zoom */}
            <img
              src={slide.bgImage}
              alt={slide.title}
              className={`w-full h-full object-cover object-top sm:object-center transform transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Multi-layered Warm South Indian luxury overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F040A] via-[#1F040A]/60 to-black/35" />
            <div className="absolute inset-0 bg-cream/10 backdrop-blur-[1px]" />
          </div>
        );
      })}

      {/* Slide Content Box */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white flex flex-col items-center">
        {/* Active Slide Info */}
        <div key={SLIDES[current].id} className="animate-fade-up">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/95 backdrop-blur-md border border-gold-soft text-rose-deep shadow-gold mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
              {SLIDES[current].tag}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
          </div>

          {/* Main Title */}
          <h1 className="font-script text-4xl xs:text-5xl sm:text-7xl md:text-8xl text-cream drop-shadow-2xl leading-tight mb-2 sm:mb-3">
            {SLIDES[current].title}
          </h1>

          {/* Subtitle */}
          <p className="font-serif-display text-base sm:text-2xl text-gold-soft drop-shadow font-medium max-w-2xl mx-auto mb-3 sm:mb-4">
            {SLIDES[current].subtitle}
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-soft to-transparent mx-auto my-3" />

          {/* Description */}
          {SLIDES[current].description && (
            <p className="text-xs sm:text-base text-cream/95 font-serif-display italic max-w-xl mx-auto mb-6 leading-relaxed px-2 drop-shadow">
              "{SLIDES[current].description}"
            </p>
          )}

          {/* Date & Location Pill */}
          {(SLIDES[current].dateInfo || SLIDES[current].locationInfo) && (
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-5 py-2.5 rounded-2xl bg-[#1A0307]/85 backdrop-blur-md border border-gold-soft/50 text-cream text-xs sm:text-sm shadow-elegant mb-6">
              {SLIDES[current].dateInfo && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-soft shrink-0" />
                  <span className="font-cinzel text-[11px] sm:text-xs tracking-wider">{SLIDES[current].dateInfo}</span>
                </div>
              )}
              {SLIDES[current].dateInfo && SLIDES[current].locationInfo && (
                <span className="text-gold-soft/50 hidden sm:inline">•</span>
              )}
              {SLIDES[current].locationInfo && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold-soft shrink-0" />
                  <span className="font-serif-display text-xs sm:text-sm font-medium">{SLIDES[current].locationInfo}</span>
                </div>
              )}
            </div>
          )}

          {/* Hashtag / Accent */}
          {SLIDES[current].accentBadge && (
            <div>
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-cream/85 uppercase font-medium">
                {SLIDES[current].accentBadge}
              </span>
            </div>
          )}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 xs:left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/45 hover:bg-black/70 text-cream border border-gold-soft/40 hover:border-gold-soft transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer z-30"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 xs:right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/45 hover:bg-black/70 text-cream border border-gold-soft/40 hover:border-gold-soft transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer z-30"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === current
                  ? 'w-7 sm:w-9 h-2 bg-gradient-to-r from-gold-soft to-gold shadow-gold'
                  : 'w-2 h-2 bg-cream/40 hover:bg-cream/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
