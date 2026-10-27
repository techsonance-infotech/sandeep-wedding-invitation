import React from 'react';

interface EnvelopeScreenProps {
  onOpen: () => void;
  opening: boolean;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onOpen, opening }) => {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative px-4 sm:px-6 py-6 overflow-hidden bg-cream">
      {/* Background Temple & Mandap Image */}
      <img
        src="/assets/image4.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        aria-hidden="true"
      />

      {/* Warm Cream Glass Overlay */}
      <div className="absolute inset-0 bg-cream/40 backdrop-blur-[2px] pointer-events-none" />

      {/* Decorative Drifting Petals in Corners */}
      <span className="absolute top-4 sm:top-6 left-4 sm:left-6 text-2xl sm:text-3xl opacity-75 animate-drift select-none pointer-events-none">
        🌸
      </span>
      <span
        className="absolute top-6 sm:top-8 right-6 sm:right-10 text-xl sm:text-2xl opacity-60 animate-drift select-none pointer-events-none"
        style={{ animationDelay: '1s' }}
      >
        🌼
      </span>
      <span
        className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 text-2xl sm:text-3xl opacity-75 animate-drift select-none pointer-events-none"
        style={{ animationDelay: '2s' }}
      >
        🌿
      </span>
      <span
        className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-2xl sm:text-3xl opacity-75 animate-drift select-none pointer-events-none"
        style={{ animationDelay: '0.5s' }}
      >
        🌿
      </span>

      {/* Interactive Envelope Button */}
      <button
        onClick={onOpen}
        disabled={opening}
        aria-label="Open wedding invitation envelope"
        className={`relative z-10 group transition-transform duration-500 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none max-w-[85vw] ${
          opening ? 'animate-envelope-open' : ''
        }`}
        style={{ perspective: '1000px' }}
      >
        <img
          src="/assets/envelope.png"
          alt="Wedding invitation envelope"
          className="w-[250px] xs:w-[280px] sm:w-[360px] md:w-[420px] max-w-full h-auto drop-shadow-2xl select-none"
          draggable="false"
        />

        {/* Center Golden Wax Seal */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full gradient-gold shadow-gold animate-shimmer flex items-center justify-center">
            <span className="font-cinzel text-[11px] sm:text-xs text-white/95 font-semibold tracking-wider">
              S &amp; N
            </span>
          </span>
        </span>
      </button>

      {/* Text below envelope */}
      <div
        className={`relative z-10 mt-6 sm:mt-10 text-center animate-fade-up delay-300 px-4 ${
          opening ? 'opacity-0 transition-opacity duration-300' : ''
        }`}
      >
        <h2 className="font-script text-3xl sm:text-5xl text-rose-deep drop-shadow-sm leading-tight">
          You're Invited
        </h2>
        <p className="mt-1.5 sm:mt-2 text-rose-deep/90 font-medium italic tracking-wide text-xs sm:text-sm md:text-base">
          Tap the envelope to open your invitation
        </p>
      </div>
    </div>
  );
};
