import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroShloka } from './components/IntroShloka';
import { CountdownTimer } from './components/CountdownTimer';
import { InteractiveEnvelope } from './components/InteractiveEnvelope';
import { EventsTimeline } from './components/EventsTimeline';
import { CoupleStory } from './components/CoupleStory';
import { VenuesSection } from './components/VenuesSection';
import { CardGalleryModal } from './components/CardGalleryModal';
import { RSVPSection } from './components/RSVPSection';
import { BlessingsWall } from './components/BlessingsWall';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { AudioPlayer } from './components/AudioPlayer';

export const App: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleOpenCardModal = (cardId: string) => {
    setSelectedCardId(cardId);
    // Smooth scroll to gallery section if requested
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseModal = () => {
    setSelectedCardId(null);
  };

  return (
    <div className="min-h-screen bg-[#24040A] text-[#FDFBF7] relative selection:bg-gold-500 selection:text-[#3D0A14]">
      {/* Ambient Canvas Petals & Gold Sparkles */}
      <ParticleBackground />

      {/* Floating Audio Player */}
      <AudioPlayer />

      {/* Top Navigation */}
      <Navbar />

      <main>
        {/* 1. Cinematic Hero Section */}
        <HeroSection />

        {/* 2. Sacred Ganesha & Shiva-Parvati Blessing Shloka */}
        <IntroShloka />

        {/* 3. Auspicious Muhurtham Countdown */}
        <CountdownTimer />

        {/* 4. Interactive Scratch-to-Reveal Invitation */}
        <InteractiveEnvelope onOpenCardModal={handleOpenCardModal} />

        {/* 5. 4 Wedding Events Timeline & Itinerary */}
        <EventsTimeline onOpenCardModal={handleOpenCardModal} />

        {/* 6. Bride & Groom Lineage & Families (Rudra & Yanagandhula) */}
        <CoupleStory />

        {/* 7. Celebration Venues & Navigation (Suryapet, Thungathurthi, Surat) */}
        <VenuesSection />

        {/* 8. Official Illustrated Invitation Cards Gallery & Lightbox */}
        <CardGalleryModal
          selectedCardId={selectedCardId}
          onCloseModal={handleCloseModal}
        />

        {/* 9. Interactive RSVP Confirmation */}
        <RSVPSection />

        {/* 10. Guestbook & Community Blessings Wall */}
        <BlessingsWall />
      </main>

      {/* 11. Sacred Footer & Social Sharing */}
      <Footer />
    </div>
  );
};

export default App;
