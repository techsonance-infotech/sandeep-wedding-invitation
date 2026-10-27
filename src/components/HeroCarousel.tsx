import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, Heart } from 'lucide-react';

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
  focalPoint: string;
  photoTag: string;
}

const SLIDES: Slide[] = [
  {
    id: 'slide-royal-couple',
    tag: 'THE ROYAL WEDDING CELEBRATION',
    title: 'Sandeep & Nikitha',
    subtitle: 'Sunday, 22nd November 2026 • Siri Function Hall, Thungathurthi',
    description:
      'With great joy and devotion, we invite you to celebrate the holy matrimony of Sandeep Rudra & Nikitha Yanagandhula.',
    bgImage: '/assets/couple/couple_royal_palace.jpg',
    accentBadge: '#SandeepWedsNikitha',
    dateInfo: 'Sunday, 22nd November 2026',
    locationInfo: 'Thungathurthi, Telangana',
    focalPoint: '50% 36%',
    photoTag: 'A Royal Fairytale',
  },
  {
    id: 'slide-portrait-couple',
    tag: 'A LIFETIME OF LOVE & TRADITION',
    title: 'Two Souls, One Sacred Bond',
    subtitle: 'Sandeep Rudra & Nikitha Yanagandhula',
    description:
      'United by love and blessed by the Rudra & Yanagandhula families, stepping together into an auspicious new journey.',
    bgImage: '/assets/couple/couple_portrait.jpg',
    accentBadge: 'Rudra & Yanagandhula Families',
    dateInfo: '19th – 29th November 2026',
    locationInfo: 'Telangana & Gujarat',
    focalPoint: '50% 16%',
    photoTag: 'Sacred Devotion',
  },
  {
    id: 'slide-invocation',
    tag: '॥ श्री गणेशाय नमः ॥',
    title: 'Divine Blessings',
    subtitle: 'Vakratunda Mahakaya Suryakoti Samaprabha',
    description:
      'Under the holy blessings of Lord Shiva & Goddess Parvati, invoking Lord Ganesha to bless this auspicious union with peace and happiness.',
    bgImage: '/assets/cards/card_0_invocation.jpeg',
    accentBadge: 'Auspicious Shloka',
    dateInfo: 'Holy Muhurtham',
    locationInfo: 'Siri Function Hall',
    focalPoint: '50% 12%',
    photoTag: 'Shri Ganesh Invocation',
  },
  {
    id: 'slide-functions',
    tag: 'FOUR AUSPICIOUS CELEBRATIONS',
    title: 'Haldi • Sangeet • Kalyanam • Reception',
    subtitle: '19th November to 29th November 2026',
    description:
      'Join us across four joyous celebrations from vibrant turmeric mornings in Suryapet to sacred Kalyanam and grand reception in Surat.',
    bgImage: '/assets/cards/card_4_marriage.jpeg',
    accentBadge: 'Complete Itinerary',
    dateInfo: 'Nov 19, 22 & 29, 2026',
    locationInfo: 'Suryapet • Thungathurthi • Surat',
    focalPoint: '50% 18%',
    photoTag: 'Holy Marriage Card',
  },
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const total = SLIDES.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, current]);

  const activeSlide = SLIDES[current];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[92dvh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#1A0307]"
    >
      {/* 1. Atmospheric Ambient Backdrop with Dreamy Soft Blur */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.bgImage}
              alt=""
              aria-hidden="true"
              style={{ objectPosition: slide.focalPoint }}
              className="w-full h-full object-cover blur-2xl scale-110 opacity-30 brightness-75"
            />
            {/* Royal Crimson & Gold Ambient Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0307] via-[#24050D]/80 to-[#1A0307]/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0,transparent_70%)]" />
          </div>
        );
      })}

      {/* 2. Main Luxury Hero Stage (Split on Desktop, Stacked on Mobile) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 flex flex-col justify-center">
        <div
          key={activeSlide.id}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center animate-fade-up"
        >
          {/* Featured Visual in Royal Gold Arch (Left Column on Desktop, Centered on Mobile) */}
          <div className="md:col-span-5 flex justify-center order-1 md:order-1">
            <div className="relative group max-w-[280px] xs:max-w-[320px] sm:max-w-[340px] md:max-w-[380px] w-full">
              {/* Outer Golden Halo Glow */}
              <div className="absolute -inset-1.5 rounded-t-[3.5rem] rounded-b-3xl bg-gradient-to-b from-gold-soft via-gold/40 to-transparent opacity-60 blur-md group-hover:opacity-80 transition-opacity" />

              {/* Royal Arch Frame */}
              <div className="relative rounded-t-[3.5rem] rounded-b-3xl p-1.5 sm:p-2 bg-gradient-to-b from-gold-soft via-gold/30 to-gold-soft/50 border border-gold-soft shadow-2xl">
                <div className="relative rounded-t-[3.2rem] rounded-b-2xl overflow-hidden bg-[#24050D] aspect-[9/14] max-h-[38vh] xs:max-h-[42vh] sm:max-h-[48vh] md:max-h-[520px] w-full shadow-inner">
                  <img
                    src={activeSlide.bgImage}
                    alt={activeSlide.title}
                    style={{ objectPosition: activeSlide.focalPoint }}
                    className="w-full h-full object-cover transition-transform duration-7000 ease-out group-hover:scale-105"
                  />

                  {/* Soft bottom vignette for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Photo Accent Tag */}
                  <div className="absolute bottom-3 left-0 right-0 text-center px-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-gold-soft text-[10px] sm:text-xs font-cinzel tracking-wider border border-gold-soft/40 shadow-sm">
                      <Sparkles className="w-3 h-3 text-gold shrink-0" />
                      {activeSlide.photoTag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wedding Announcement Details (Right Column on Desktop, Bottom on Mobile) */}
          <div className="md:col-span-7 text-center md:text-left text-white order-2 md:order-2 flex flex-col items-center md:items-start">
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-cream/95 backdrop-blur-md border border-gold-soft text-rose-deep shadow-gold mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                {activeSlide.tag}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            </div>

            {/* Main Couple Names */}
            <h1 className="font-script text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-cream drop-shadow-2xl leading-tight mb-2 sm:mb-3">
              {activeSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="font-serif-display text-sm xs:text-base sm:text-xl lg:text-2xl text-gold-soft drop-shadow font-medium max-w-xl mb-3 sm:mb-4">
              {activeSlide.subtitle}
            </p>

            <div className="w-20 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-gold-soft to-transparent md:from-gold-soft md:to-transparent my-2" />

            {/* Description */}
            {activeSlide.description && (
              <p className="text-xs sm:text-sm lg:text-base text-cream/90 font-serif-display italic max-w-xl mb-4 sm:mb-6 leading-relaxed px-1 md:px-0 drop-shadow">
                "{activeSlide.description}"
              </p>
            )}

            {/* Date & Location Pill */}
            {(activeSlide.dateInfo || activeSlide.locationInfo) && (
              <div className="inline-flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-[#2A060E]/85 backdrop-blur-md border border-gold-soft/50 text-cream text-xs sm:text-sm shadow-elegant mb-4 sm:mb-6">
                {activeSlide.dateInfo && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-soft shrink-0" />
                    <span className="font-cinzel text-[11px] sm:text-xs tracking-wider">
                      {activeSlide.dateInfo}
                    </span>
                  </div>
                )}
                {activeSlide.dateInfo && activeSlide.locationInfo && (
                  <span className="text-gold-soft/50 hidden sm:inline">•</span>
                )}
                {activeSlide.locationInfo && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-soft shrink-0" />
                    <span className="font-serif-display text-xs sm:text-sm font-medium">
                      {activeSlide.locationInfo}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Hashtag & Quick Scroll Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {activeSlide.accentBadge && (
                <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-gold-soft uppercase font-semibold px-3 py-1 rounded-full bg-white/5 border border-gold-soft/30">
                  {activeSlide.accentBadge}
                </span>
              )}

              <a
                href="#the-couple"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full gradient-gold text-white font-cinzel text-xs tracking-wider shadow-gold hover:opacity-90 transition-all cursor-pointer"
              >
                <Heart className="w-3 h-3 fill-white" />
                <span>Meet Couple</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 xs:left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/45 hover:bg-black/70 text-cream border border-gold-soft/40 hover:border-gold-soft transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer z-30"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 xs:right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/45 hover:bg-black/70 text-cream border border-gold-soft/40 hover:border-gold-soft transition-all backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer z-30"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* 4. Pagination Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === current
                ? 'w-6 sm:w-8 h-2 bg-gradient-to-r from-gold-soft to-gold shadow-gold'
                : 'w-2 h-2 bg-cream/40 hover:bg-cream/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
