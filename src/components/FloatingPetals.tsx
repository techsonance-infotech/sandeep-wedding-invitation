import React, { useMemo } from 'react';

const PETAL_ITEMS = ['🌸', '🌿', '🌸', '🌼', '🌿', '🌸'];

interface Props {
  count?: number;
}

export const FloatingPetals: React.FC<Props> = ({ count = 18 }) => {
  // Generate stable random values for each petal
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      char: PETAL_ITEMS[index % PETAL_ITEMS.length],
      left: Math.random() * 100,
      duration: 14 + Math.random() * 16,
      delay: Math.random() * 12,
      size: 14 + Math.random() * 22,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute animate-float-petal select-none"
          style={{
            left: `${petal.left}%`,
            top: '-10vh',
            fontSize: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            filter: 'drop-shadow(0 2px 4px rgba(59, 44, 34, 0.12))',
          }}
          aria-hidden="true"
        >
          {petal.char}
        </span>
      ))}
    </div>
  );
};
