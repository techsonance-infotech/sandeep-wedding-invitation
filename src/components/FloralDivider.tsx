import React from 'react';

export const FloralDivider: React.FC = () => {
  return (
    <div className="my-6 flex items-center justify-center gap-3">
      <span className="h-px w-16 bg-gold-soft/80" />
      <span className="text-gold text-lg select-none">❀</span>
      <span className="h-px w-16 bg-gold-soft/80" />
    </div>
  );
};
