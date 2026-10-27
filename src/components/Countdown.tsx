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
    <div className="grid grid-cols-4 gap-2 xs:gap-2.5 sm:gap-4 md:gap-6 max-w-[320px] xs:max-w-xs sm:max-w-md mx-auto">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="w-full aspect-square rounded-xl sm:rounded-2xl bg-cream border border-gold-soft shadow-soft flex items-center justify-center backdrop-blur-sm">
            <span className="font-cinzel text-xl xs:text-2xl sm:text-4xl text-rose-deep tabular-nums font-semibold">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs tracking-wider uppercase text-sage-deep font-medium">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
