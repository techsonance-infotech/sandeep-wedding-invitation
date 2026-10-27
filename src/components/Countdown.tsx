import React, { useState, useEffect } from 'react';

const TARGET_WEDDING_TIME = new Date('2026-11-22T08:00:00+05:30').getTime();

const calculateTimeLeft = () => {
  const difference = Math.max(0, TARGET_WEDDING_TIME - Date.now());
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center min-w-[68px] sm:min-w-[90px]">
          <div className="w-full aspect-square rounded-2xl bg-cream border border-gold-soft shadow-soft flex items-center justify-center backdrop-blur-sm">
            <span className="font-cinzel text-2xl sm:text-4xl text-rose-deep tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="mt-2 text-xs sm:text-sm tracking-widest uppercase text-sage-deep font-medium">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
