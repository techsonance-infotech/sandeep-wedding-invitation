import React, { useState, useEffect } from 'react';
import { EnvelopeScreen } from './components/EnvelopeScreen';
import { MainPage } from './components/MainPage';
import { FloatingPetals } from './components/FloatingPetals';
import { AnimatedButterfly } from './components/AnimatedButterfly';
import { BackgroundMusic } from './components/BackgroundMusic';
import { X, Download } from 'lucide-react';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Sandeep & Nikitha — Wedding Invitation · 22 November 2026';
    const metaDesc =
      document.querySelector('meta[name="description"]') ||
      (() => {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
        return meta;
      })();
    metaDesc.setAttribute(
      'content',
      'Join Sandeep Rudra & Nikitha Yanagandhula for their wedding celebrations from 19th to 29th November 2026. Marriage on Sunday, 22 November 2026 at Siri Function Hall, Thungathurthi.'
    );
  }, []);

  const handleOpenEnvelope = () => {
    setOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 900);
  };

  return (
    <div className="relative min-h-screen bg-cream selection:bg-gold-soft selection:text-foreground">
      {/* 1. Continuous Floating Petals & Flowers */}
      <FloatingPetals />

      {/* 2. Fluttering Blue Butterfly (active once opened) */}
      {isOpen && <AnimatedButterfly />}

      {/* 3. Traditional Background Music Player */}
      <BackgroundMusic play={opening || isOpen} />

      {/* 4. Envelope Screen or Main Page */}
      {isOpen ? (
        <MainPage onOpenCard={(src) => setLightboxImage(src)} />
      ) : (
        <EnvelopeScreen onOpen={handleOpenEnvelope} opening={opening} />
      )}

      {/* 5. Fullscreen Card Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-md w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-gold-soft transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={lightboxImage}
              alt="Invitation Card"
              className="max-h-[82vh] w-auto object-contain rounded-xl border border-gold-soft shadow-2xl bg-cream"
            />

            <a
              href={lightboxImage}
              download="Wedding_Invitation_Card.jpeg"
              className="mt-3 px-6 py-2 rounded-full gradient-gold text-white font-cinzel text-xs tracking-wider shadow-gold hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download High-Res Card</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
