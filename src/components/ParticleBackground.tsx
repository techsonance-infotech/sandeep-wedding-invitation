import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle types: Gold Sparkles & Soft Jasmine/Rose Petals
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulseSpeed: number;
      color: string;
      isPetal: boolean;
      rotation: number;
      rotSpeed: number;
    }

    const particles: Particle[] = [];
    const count = window.innerWidth < 768 ? 35 : 65;

    for (let i = 0; i < count; i++) {
      const isPetal = Math.random() > 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal ? Math.random() * 5 + 3 : Math.random() * 2.5 + 0.8,
        speedY: isPetal ? Math.random() * 0.8 + 0.3 : -(Math.random() * 0.5 + 0.1),
        speedX: Math.sin(i) * 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: isPetal
          ? (Math.random() > 0.5 ? 'rgba(255, 182, 193, ' : 'rgba(243, 229, 171, ')
          : 'rgba(212, 175, 55, ',
        isPetal,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += Math.sin(time + i) * 0.5;
        p.rotation += p.rotSpeed;

        // Wrap around
        if (p.isPetal) {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isPetal) {
          // Draw small soft petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity * 0.65})`;
          ctx.fill();
        } else {
          // Draw sparkling gold star / circle
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#D4AF37';
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
      aria-hidden="true"
    />
  );
};
