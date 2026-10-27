import React from 'react';

export const CornerDecor: React.FC = () => {
  return (
    <>
      <span className="pointer-events-none absolute top-6 left-4 text-4xl opacity-20 select-none">
        🌿
      </span>
      <span className="pointer-events-none absolute top-12 right-6 text-3xl opacity-20 select-none">
        🌸
      </span>
      <span className="pointer-events-none absolute bottom-10 left-10 text-3xl opacity-20 select-none">
        🌼
      </span>
      <span className="pointer-events-none absolute bottom-6 right-4 text-4xl opacity-20 select-none">
        🌿
      </span>
    </>
  );
};
