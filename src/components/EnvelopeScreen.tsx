import React from 'react';

interface EnvelopeScreenProps {
  onOpen: () => void;
  opening: boolean;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onOpen, opening }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 overflow-hidden bg-cream">
      {/* Background Temple & Mandap Image */}
      <img
        src="/assets/image4.png"
        alt="South Indian Temple Mandap"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Warm Cream Glass Overlay */}
      <div className="absolute inset-0 bg-cream/40 backdrop-blur-[2px]" />

      {/* Decorative Drifting Petals in Corners */}
      <span className="absolute top-6 left-6 text-3xl opacity-75 animate-drift select-none">
        🌸
      </span>
      <span
        className="absolute top-8 right-10 text-2xl opacity-60 animate-drift select-none"
        style={{ animationDelay: '1s' }}
      >
        🌼
      </span>
      <span
        className="absolute bottom-8 left-10 text-3xl opacity-75 animate-drift select-none"
        style={{ animationDelay: '2s' }}
      >
        🌿
      </span>
      <span
        className="absolute bottom-6 right-6 text-3xl opacity-75 animate-drift select-none"
        style={{ animationDelay: '0.5s' }}
      >
        🌿
      </span>

      {/* Interactive Envelope Button */}
      <button
        onClick={onOpen}
        disabled={opening}
        aria-label="Open wedding invitation envelope"
        className={`relative z-10 group transition-transform duration-500 hover:scale-105 cursor-pointer focus:outline-none ${
          opening ? 'animate-envelope-open' : ''
        }`}
        style={{ perspective: '1000px' }}
      >
        <img
          src="/assets/envelope.png"
          alt="Wedding invitation envelope"
          className="w-[280px] sm:w-[360px] md:w-[420px] h-auto drop-shadow-2xl select-none"
          draggable="false"
        />

        {/* Center Golden Wax Seal */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="w-20 h-20 sm:w-24 sm:h-24 rounded-full gradient-gold shadow-gold animate-shimmer flex items-center justify-center">
            <span className="font-cinzel text-xs text-white/95 font-semibold tracking-wider">
              S &amp; N
            </span>
          </span>
        </span>
      </button>

      {/* Text below envelope */}
      <div
        className={`relative z-10 mt-10 text-center animate-fade-up delay-300 ${
          opening ? 'opacity-0 transition-opacity duration-300' : ''
        }`}
      >
        <h2 className="font-script text-4xl sm:text-5xl text-rose-deep drop-shadow-sm">
          You're Invited
        </h2>
        <p className="mt-2 text-rose-deep/90 font-medium italic tracking-wide text-sm sm:text-base">
          Tap the envelope to open your invitation
        </p>
      </div>
    </div>
  );
};
