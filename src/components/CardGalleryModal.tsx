import React, { useState, useEffect } from 'react';
import { Sparkles, ZoomIn, Download, ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';
import { INVITATION_CARDS } from '../data/weddingData';
import { InvitationCard } from '../types/wedding';

interface Props {
  selectedCardId?: string | null;
  onCloseModal?: () => void;
}

export const CardGalleryModal: React.FC<Props> = ({ selectedCardId, onCloseModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxCard, setLightboxCard] = useState<InvitationCard | null>(null);

  // Sync external card selection
  useEffect(() => {
    if (selectedCardId) {
      const found = INVITATION_CARDS.find((c) => c.id === selectedCardId);
      if (found) {
        setLightboxCard(found);
      }
    }
  }, [selectedCardId]);

  // Handle keyboard navigation in Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxCard) return;
      if (e.key === 'Escape') {
        setLightboxCard(null);
        onCloseModal?.();
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxCard]);

  const navigateLightbox = (direction: number) => {
    if (!lightboxCard) return;
    const currentIndex = INVITATION_CARDS.findIndex((c) => c.id === lightboxCard.id);
    const nextIndex = (currentIndex + direction + INVITATION_CARDS.length) % INVITATION_CARDS.length;
    setLightboxCard(INVITATION_CARDS[nextIndex]);
  };

  const filteredCards =
    activeCategory === 'all'
      ? INVITATION_CARDS
      : INVITATION_CARDS.filter((c) => {
          if (activeCategory === 'functions') {
            return ['haldi', 'sangeet', 'marriage', 'reception'].includes(c.category);
          }
          return c.category === activeCategory;
        });

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/40 bg-[#3D0A14] text-gold-300 text-xs font-serif tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Digital Keepsake</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
            Official Invitation Cards Gallery
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#FDFBF7]/80 max-w-xl mx-auto font-serif">
            Browse and download each authentic illustrated wedding card handcrafted for Sandeep and Nikitha.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Cards (7)' },
            { id: 'main', label: 'Main Invite' },
            { id: 'functions', label: 'Functions (4)' },
            { id: 'invocation', label: 'Invocation' },
            { id: 'rsvp', label: 'RSVP Card' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-[#3D0A14] font-semibold shadow-md'
                  : 'bg-[#3D0A14] border border-gold-500/30 text-gold-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl bg-royal-card border border-gold-500/35 overflow-hidden shadow-xl hover:border-gold-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div
                onClick={() => setLightboxCard(card)}
                className="relative aspect-[9/16] overflow-hidden cursor-pointer bg-[#24040A]"
              >
                <img
                  src={card.image}
                  alt={card.altText}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-[#3D0A14]/90 border border-gold-400 text-gold-300 flex items-center gap-2 text-xs font-serif uppercase tracking-wider">
                    <ZoomIn className="w-4 h-4" />
                    <span>View Card</span>
                  </div>
                </div>
              </div>

              {/* Card Meta & Download */}
              <div className="p-4 bg-[#2A050E] border-t border-gold-500/20 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-gold-bright line-clamp-1">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-[#FDFBF7]/70 line-clamp-1">{card.subtitle}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setLightboxCard(card)}
                    className="p-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 hover:text-white transition-colors"
                    title="View Full Size"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <a
                    href={card.image}
                    download={`${card.title.replace(/\s+/g, '_')}.jpeg`}
                    className="p-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 hover:text-white transition-colors"
                    title="Download Card"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-screen Lightbox Modal */}
        {lightboxCard && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => {
              setLightboxCard(null);
              onCloseModal?.();
            }}
          >
            {/* Modal Controls */}
            <div
              className="relative max-w-lg w-full max-h-[92vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setLightboxCard(null);
                  onCloseModal?.();
                }}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gold-300 transition-colors"
                title="Close Lightbox"
              >
                <X className="w-7 h-7" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={() => navigateLightbox(-1)}
                className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#3D0A14]/80 border border-gold-500/40 text-gold-300 hover:text-white transition-all hover:scale-110"
                title="Previous Card"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateLightbox(1)}
                className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#3D0A14]/80 border border-gold-500/40 text-gold-300 hover:text-white transition-all hover:scale-110"
                title="Next Card"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* High-res Image Preview */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-gold-400 shadow-2xl bg-[#1C0308] max-h-[78vh]">
                <img
                  src={lightboxCard.image}
                  alt={lightboxCard.altText}
                  className="max-h-[78vh] w-auto object-contain"
                />
              </div>

              {/* Bottom Caption & Download Bar */}
              <div className="mt-3 w-full bg-[#2A050E]/90 border border-gold-500/30 rounded-xl p-3 flex items-center justify-between text-xs backdrop-blur-md">
                <div>
                  <h4 className="font-serif font-bold text-gold-200">{lightboxCard.title}</h4>
                  <p className="text-[11px] text-[#FDFBF7]/70">{lightboxCard.subtitle}</p>
                </div>
                <a
                  href={lightboxCard.image}
                  download={`${lightboxCard.title.replace(/\s+/g, '_')}.jpeg`}
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-[#3D0A14] font-semibold flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
