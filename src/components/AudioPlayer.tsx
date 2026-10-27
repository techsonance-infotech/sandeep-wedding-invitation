import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize generative Indian Tanpura & Raag Bhupali/Yaman meditative wedding drone
  const startTanpura = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Authentic Indian Tanpura frequencies in C# (Sa - Pa - Sa' - Sa):
      // C#3 = 138.59, G#3 = 207.65, C#4 = 277.18
      const freqs = [138.59, 207.65, 277.18, 138.59 * 1.5, 415.30];
      oscillatorsRef.current = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const oscGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle gentle pitch chorus
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.2 / freqs.length, ctx.currentTime);

        if (panner) {
          panner.pan.setValueAtTime((idx - 2) * 0.3, ctx.currentTime);
          osc.connect(panner);
          panner.connect(oscGain);
        } else {
          osc.connect(oscGain);
        }

        oscGain.connect(masterGain);
        osc.start();
        oscillatorsRef.current.push(osc);
      });

      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio error:', err);
    }
  };

  const stopTanpura = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        oscillatorsRef.current = [];
        setIsPlaying(false);
      }, 800);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopTanpura();
    } else {
      startTanpura();
    }
  };

  useEffect(() => {
    // Prompt user gently on first click anywhere to enable music if preferred
    const handleFirstClick = () => {
      if (!hasInteracted && !isPlaying) {
        // We can let user choose or trigger on explicit button click
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstClick);
      stopTanpura();
    };
  }, [hasInteracted, isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {!hasInteracted && !isPlaying && (
        <div className="hidden sm:flex items-center gap-2 bg-[#3D0A14]/90 border border-gold-500/50 text-[#FDFBF7] text-xs px-3 py-1.5 rounded-full shadow-xl backdrop-blur-md animate-bounce">
          <Music className="w-3.5 h-3.5 text-gold-400" />
          <span>Play Auspicious Music</span>
        </div>
      )}

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Mute traditional wedding music' : 'Play traditional wedding music'}
        className={`group relative p-3.5 rounded-full shadow-2xl transition-all duration-300 border ${
          isPlaying
            ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 border-gold-200 text-[#3D0A14] scale-105 shadow-gold-500/40'
            : 'bg-[#3D0A14]/90 border-gold-500/50 text-gold-300 hover:text-gold-100 hover:border-gold-300 backdrop-blur-md'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-5 h-5 text-[#3D0A14] animate-pulse" />
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-[#3D0A14] animate-[bounce_0.8s_infinite] h-2"></span>
              <span className="w-0.5 bg-[#3D0A14] animate-[bounce_1.1s_infinite] h-3"></span>
              <span className="w-0.5 bg-[#3D0A14] animate-[bounce_0.7s_infinite] h-1.5"></span>
            </div>
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}

        <span className="sr-only">{isPlaying ? 'Mute' : 'Play'}</span>
      </button>
    </div>
  );
};
