import React from 'react';

interface Props {
  title: string;
  bg?: string;
  onClick?: () => void;
}

export const EventCard: React.FC<Props> = ({ title, bg, onClick }) => {
  return (
    <article
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden shadow-elegant border border-gold-soft transition-all duration-500 hover:-translate-y-1 group isolate bg-cream cursor-pointer"
    >
      {bg && (
        <img
          src={bg}
          alt={title}
          loading="lazy"
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
        />
      )}
    </article>
  );
};
