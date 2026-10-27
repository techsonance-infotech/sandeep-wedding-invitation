import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  onRevealed: () => void;
  revealed: boolean;
}

export const ScratchCard: React.FC<Props> = ({ onRevealed, revealed }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const [hasRevealed, setHasRevealed] = useState(revealed);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const init = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, '#bf953f');
      grad.addColorStop(0.25, '#fcf6ba');
      grad.addColorStop(0.5, '#b38728');
      grad.addColorStop(0.75, '#fbf5b7');
      grad.addColorStop(1, '#aa771c');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = '#4a2f0f';
      ctx.font = '600 15px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦  SCRATCH TO REVEAL  ✦', rect.width / 2, rect.height / 2);
    };

    init();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  const fireCelebration = () => {
    const fire = (origin: { x: number; y: number }) =>
      confetti({
        particleCount: 120,
        spread: 90,
        startVelocity: 45,
        origin,
        colors: ['#d4a574', '#f5d199', '#c75a6b', '#7a8a6a', '#ffffff'],
        scalar: 1.1,
      });

    fire({ x: 0.2, y: 0.4 });
    fire({ x: 0.5, y: 0.3 });
    fire({ x: 0.8, y: 0.4 });
    setTimeout(() => fire({ x: 0.5, y: 0.5 }), 250);
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clearPixels = 0;
    const step = 160;

    for (let i = 3; i < data.length; i += step) {
      if (data[i] < 60) clearPixels++;
    }

    const total = data.length / step;
    if (clearPixels / total > 0.45) {
      setHasRevealed(true);
      ctx.clearRect(0, 0, width, height);
      fireCelebration();
      onRevealed();
    }
  };

  const erase = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 28, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-md h-32 rounded-2xl overflow-hidden border-2 border-gold-soft shadow-elegant select-none"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream">
        <p className="font-cinzel tracking-[0.35em] text-sage-deep text-sm sm:text-base font-semibold">
          SAVE THE DATE
        </p>
        <p className="font-script text-3xl sm:text-4xl text-rose-deep mt-1 font-normal">
          22nd November 2026
        </p>
      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            isDownRef.current = true;
            erase(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (isDownRef.current) {
              e.preventDefault();
              erase(e.clientX, e.clientY);
            }
          }}
          onPointerUp={() => {
            isDownRef.current = false;
            checkProgress();
          }}
          onPointerLeave={() => {
            isDownRef.current = false;
            checkProgress();
          }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />
      )}
    </div>
  );
};
