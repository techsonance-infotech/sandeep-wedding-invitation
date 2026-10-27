import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  names: string[];
}

export const FamilyCard: React.FC<Props> = ({ title, subtitle, names }) => {
  return (
    <div className="bg-cream/80 backdrop-blur-sm border border-gold-soft rounded-2xl p-8 shadow-soft text-center">
      <p className="font-cinzel text-xs text-sage-deep tracking-widest font-semibold">
        {title.toUpperCase()}
      </p>

      <div className="my-4 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-gold-soft/80" />
        <span className="text-gold text-sm select-none">❀</span>
        <span className="h-px w-8 bg-gold-soft/80" />
      </div>

      {subtitle && (
        <p className="font-serif-display italic text-sm text-sage-deep mb-2">
          {subtitle}
        </p>
      )}

      <div className="space-y-1">
        {names.map((name, idx) => (
          <p
            key={idx}
            className="font-serif-display text-xl sm:text-2xl text-foreground font-semibold my-1"
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};
