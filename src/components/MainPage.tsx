import React, { useState } from 'react';
import { CornerDecor } from './CornerDecor';
import { FloralDivider } from './FloralDivider';
import { HeroCarousel } from './HeroCarousel';
import { ScratchCard } from './ScratchCard';
import { Countdown } from './Countdown';
import { CoupleSpotlight } from './CoupleSpotlight';
import { WeddingRoadmap } from './WeddingRoadmap';
import { CardsGallery } from './CardsGallery';
import { FamilyCard } from './FamilyCard';
import { RSVPSection } from './RSVPSection';
import { Navigation, CalendarPlus } from 'lucide-react';

interface Props {
  onOpenCard?: (cardSrc: string) => void;
}

export const MainPage: React.FC<Props> = ({ onOpenCard }) => {
  const [revealed, setRevealed] = useState(false);

  const handleAddToCalendar = () => {
    const startTime = '20261122T023000Z'; // 08:00 AM IST
    const endTime = '20261122T173000Z';
    const title = encodeURIComponent('Marriage: Sandeep Rudra & Nikitha Yanagandhula');
    const details = encodeURIComponent(
      'Auspicious wedding ceremony of Sandeep Rudra and Nikitha Yanagandhula at Siri Function Hall, Thungathurthi.'
    );
    const location = encodeURIComponent('Siri Function Hall, Thungathurthi, Telangana 508280');
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`,
      '_blank'
    );
  };

  return (
    <main className="relative animate-fade-in bg-cream">
      {/* 1. Full-Screen Cinematic Carousel with Wedding Details */}
      <HeroCarousel />

      {/* 2. Scratch to Reveal & Countdown */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 bg-cream border-t border-gold-soft/30">
        <CornerDecor />
        <div className="relative max-w-3xl mx-auto text-center">
          <FloralDivider />
          <div className="mb-8 sm:mb-10">
            <ScratchCard revealed={revealed} onRevealed={() => setRevealed(true)} />
          </div>
          <div
            className={`transition-all duration-700 ${
              revealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden'
            }`}
            aria-hidden={!revealed}
          >
            <Countdown />
            <div className="mt-6 sm:mt-8 flex justify-center">
              <button
                onClick={handleAddToCalendar}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full border border-gold-soft/80 text-rose-deep font-cinzel text-xs tracking-wider hover:bg-gold-soft/20 transition-all shadow-sm max-w-full justify-center cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4 text-gold shrink-0" />
                <span>Add to Google Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Happy Couple Spotlight (Sandeep & Nikitha Luxury Feature) */}
      <CoupleSpotlight onOpenPhoto={onOpenCard} />

      {/* 4. The Wedding Journey Roadmap (Haldi -> Sangeet -> Kalyanam -> Reception) */}
      <WeddingRoadmap />

      {/* 4. Digital Keepsake Gallery (All Original Illustrated Cards) */}
      <CardsGallery onOpenCard={onOpenCard} />

      {/* 5. Awaiting your noble presence */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-cream text-center border-t border-gold-soft/30">
        <CornerDecor />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-script text-4xl sm:text-6xl text-rose-deep leading-tight">
            <span className="font-script-capital-a">A</span>waiting your noble presence
          </h2>
          <FloralDivider />
          <p className="font-serif-display italic text-base sm:text-xl text-foreground/80 leading-relaxed px-2">
            We look forward to celebrating our special day with you.
            <br className="hidden sm:inline" />
            Your presence and blessings will make this occasion truly memorable.
          </p>
        </div>
      </section>

      {/* 6. The Families */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 bg-sage-soft/30 border-t border-gold-soft/30">
        <CornerDecor />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="font-cinzel text-xs text-sage-deep tracking-widest font-semibold">
            WITH LOVE
          </p>
          <h2 className="font-script text-4xl sm:text-6xl text-rose-deep mt-2">
            The Families
          </h2>
          <FloralDivider />
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <FamilyCard
              title="Bride's Family"
              subtitle="Yanagandhula Family"
              names={['Smt. Umarani Yanagandhula', 'Shri. Yadagiri Yanagandhula']}
            />
            <FamilyCard
              title="Groom's Family"
              subtitle="Rudra Family"
              names={['Smt. Kalyani Rudra', 'Shri. Shankar Rudra']}
            />
          </div>
        </div>
      </section>

      {/* 7. Where We Celebrate (Venues) */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 bg-cream border-t border-gold-soft/30">
        <CornerDecor />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="font-cinzel text-xs text-sage-deep tracking-widest font-semibold">
            VENUE
          </p>
          <h2 className="font-script text-4xl sm:text-6xl text-rose-deep mt-2">
            Where We Celebrate
          </h2>
          <FloralDivider />
          <p className="font-serif-display text-base sm:text-2xl text-foreground/90 max-w-xl mx-auto font-medium px-2">
            Siri Function Hall, Thungathurthi, Telangana – 508280
          </p>

          <div className="mt-8 sm:mt-10 rounded-2xl overflow-hidden border border-gold-soft shadow-elegant">
            <iframe
              title="Venue map"
              src="https://maps.google.com/maps?q=Siri+Function+Hall+Thungathurthi+Telangana+508280&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[260px] sm:h-[360px]"
              loading="lazy"
            />
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Siri+Function+Hall+Thungathurthi+Telangana+508280"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 sm:mt-8 w-full sm:w-auto"
          >
            <button className="gradient-gold text-white border-0 hover:opacity-90 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 shadow-gold font-cinzel text-xs tracking-wider inline-flex items-center justify-center cursor-pointer w-full sm:w-auto">
              <Navigation className="mr-2 h-4 w-4 shrink-0" /> Get Directions
            </button>
          </a>
        </div>
      </section>

      {/* 8. RSVP Section */}
      <RSVPSection />

      {/* 9. Footer */}
      <footer className="bg-foreground text-cream py-12 sm:py-16 px-4 sm:px-6 text-center text-primary-foreground">
        <p className="font-cinzel text-xs tracking-[0.3em] sm:tracking-[0.4em] text-gold-soft">WITH LOVE</p>
        <h3 className="font-script text-4xl sm:text-6xl text-cream mt-2 sm:mt-3 text-primary-foreground">
          <span className="font-script-capital-a">S</span>andeep &amp;{' '}
          <span className="font-script-capital-a">N</span>ikitha
        </h3>
        <div className="my-4 sm:my-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 sm:w-12 bg-gold-soft/40" />
          <span className="text-xl sm:text-2xl select-none">💐</span>
          <span className="h-px w-10 sm:w-12 bg-gold-soft/40" />
        </div>
        <p className="font-serif-display text-base sm:text-lg italic">22nd November 2026</p>
        <p className="mt-2.5 sm:mt-3 font-cinzel text-xs tracking-widest text-cream/70">
          #SandeepWedsNikitha
        </p>
      </footer>
    </main>
  );
};
