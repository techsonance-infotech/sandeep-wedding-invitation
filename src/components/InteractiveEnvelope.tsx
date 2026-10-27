import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Eye, Download, RotateCcw } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';

interface Props {
  onOpenCardModal?: (cardId: string) => void;
}

export const InteractiveEnvelope: React.FC<Props> = ({ onOpenCardModal }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#9B1B30', '#F3E5AB', '#FFF'],
    });
  }, []);

  // Initialize Scratch Canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Fill with royal gold textured coating
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#AA8222');
    grad.addColorStop(0.3, '#E6C875');
    grad.addColorStop(0.6, '#D4AF37');
    grad.addColorStop(1, '#8C6D1F');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Kolam-style dots / pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let x = 15; x < width; x += 30) {
      for (let y = 15; y < height; y += 30) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Text on scratch surface
    ctx.font = 'bold 15px Cinzel, serif';
    ctx.fillStyle = '#3D0A14';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH OR CLICK TO REVEAL ✨', width / 2, height / 2 - 12);

    ctx.font = 'italic 12px Cormorant Garamond, serif';
    ctx.fillStyle = '#5B0E1D';
    ctx.fillText('Auspicious Wedding Invitation', width / 2, height / 2 + 14);

    setIsRevealed(false);
    setScratchProgress(0);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  const calculateProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;
    const step = 32; // Sample every 32nd pixel for performance

    for (let i = 3; i < pixels.length; i += 4 * step) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalSampled = pixels.length / (4 * step);
    const percent = Math.round((transparentCount / totalSampled) * 100);
    return percent;
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    const currentPercent = calculateProgress();
    setScratchProgress(currentPercent);

    if (currentPercent >= 38 && !isRevealed) {
      setIsRevealed(true);
      fireConfetti();
    }
  };

  // Pointer events
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
  };

  const handleQuickReveal = () => {
    setIsRevealed(true);
    setScratchProgress(100);
    fireConfetti();
  };

  const handleReset = () => {
    initCanvas();
  };

  return (
    <section id="reveal" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/40 bg-[#3D0A14] text-gold-300 text-xs font-serif tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Interactive Sacred Invitation</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-gold-gradient font-bold tracking-wide">
            Unveil The Auspicious Invitation
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#FDFBF7]/80 max-w-xl mx-auto">
            Scratch the golden seal with your finger/cursor, or click the button below to reveal the traditional royal card.
          </p>
        </div>

        {/* Card Container */}
        <div
          ref={containerRef}
          className="relative max-w-sm sm:max-w-md mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/50 bg-[#3D0A14]"
        >
          {/* Revealed Underlying Card Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/assets/cards/card_1_invitation.jpeg"
              alt="Sandeep & Nikitha Wedding Invitation Card"
              className="w-full h-full object-cover select-none"
              loading="eager"
            />
          </div>

          {/* Scratch Canvas Overlay */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="absolute inset-0 w-full h-full z-20 cursor-pointer touch-none"
              style={{ touchAction: 'none' }}
            />
          )}

          {/* Golden Corner Embellishments */}
          <div className="absolute top-2 left-2 z-30 pointer-events-none text-gold-400 text-xs font-serif">✤</div>
          <div className="absolute top-2 right-2 z-30 pointer-events-none text-gold-400 text-xs font-serif">✤</div>
          <div className="absolute bottom-2 left-2 z-30 pointer-events-none text-gold-400 text-xs font-serif">✤</div>
          <div className="absolute bottom-2 right-2 z-30 pointer-events-none text-gold-400 text-xs font-serif">✤</div>
        </div>

        {/* Controls & Status */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {!isRevealed ? (
            <>
              <div className="text-xs font-serif text-gold-300 bg-[#3D0A14]/80 px-4 py-2 rounded-full border border-gold-500/30">
                Revealed: <span className="font-bold text-gold-400">{scratchProgress}%</span>
              </div>
              <button
                onClick={handleQuickReveal}
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-[#3D0A14] shadow-lg shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Instant Reveal</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenCardModal?.('card-main')}
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-[#3D0A14] shadow-lg shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Screen</span>
              </button>
              <a
                href="/assets/cards/card_1_invitation.jpeg"
                download="Sandeep_Nikitha_Wedding_Invitation.jpeg"
                className="px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#3D0A14] border border-gold-500/50 text-gold-300 hover:text-gold-100 hover:border-gold-300 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Card</span>
              </a>
              <button
                onClick={handleReset}
                title="Scratch Again"
                className="p-2.5 rounded-full bg-[#3D0A14] border border-gold-500/50 text-gold-300 hover:text-gold-100 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
