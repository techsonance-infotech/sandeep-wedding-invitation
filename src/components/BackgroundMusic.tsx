import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  play: boolean;
  src?: string;
}

export const BackgroundMusic: React.FC<Props> = ({ play, src = '/audio/background.mp3' }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.45;
      audio.loop = true;
      if (play && !isMuted) {
        audio.play().catch(() => {
          // Handled gracefully on mobile / autoplay restrictions
        });
      } else {
        audio.pause();
      }
    }
  }, [play, isMuted]);

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      {play && (
        <button
          type="button"
          aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
          onClick={() => setIsMuted((prev) => !prev)}
          className="fixed bottom-5 right-5 z-50 h-11 w-11 rounded-full bg-foreground/80 text-cream backdrop-blur shadow-elegant flex items-center justify-center hover:scale-105 transition cursor-pointer"
        >
          {isMuted ? <VolumeX className="h-5 w-5 text-cream" /> : <Volume2 className="h-5 w-5 text-cream" />}
        </button>
      )}
    </>
  );
};
