import React from 'react';

export const AnimatedButterfly: React.FC = () => {
  return (
    <div className="butterfly-path pointer-events-none" aria-hidden="true">
      <span className="butterfly-wings">
        <svg width="38" height="32" viewBox="0 0 64 52" xmlns="http://www.w3.org/2000/svg">
          <g>
            <ellipse cx="32" cy="26" rx="1.6" ry="11" fill="#1f2937" />
            <circle cx="32" cy="14" r="2.2" fill="#1f2937" />
            <path
              d="M32 13 C 29 8, 27 6, 25 5"
              stroke="#1f2937"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M32 13 C 35 8, 37 6, 39 5"
              stroke="#1f2937"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M30 22 C 10 10, 2 22, 6 32 C 10 42, 24 38, 30 30 Z"
              fill="#3b82f6"
              opacity="0.95"
            />
            <path
              d="M30 30 C 18 38, 10 44, 14 48 C 20 50, 28 42, 30 36 Z"
              fill="#60a5fa"
              opacity="0.95"
            />
            <path
              d="M34 22 C 54 10, 62 22, 58 32 C 54 42, 40 38, 34 30 Z"
              fill="#3b82f6"
              opacity="0.95"
            />
            <path
              d="M34 30 C 46 38, 54 44, 50 48 C 44 50, 36 42, 34 36 Z"
              fill="#60a5fa"
              opacity="0.95"
            />
            <circle cx="14" cy="26" r="1.6" fill="#fff" opacity="0.85" />
            <circle cx="50" cy="26" r="1.6" fill="#fff" opacity="0.85" />
          </g>
        </svg>
      </span>
    </div>
  );
};
