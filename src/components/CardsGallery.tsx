import React, { useState } from 'react';
import { ZoomIn, Download, Eye, Sparkles } from 'lucide-react';
import { FloralDivider } from './FloralDivider';
import { CornerDecor } from './CornerDecor';

interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'couple' | 'function' | 'blessing' | 'main';
  image: string;
  alt: string;
}

const ALL_ITEMS: CardItem[] = [
  {
    id: 'couple-1',
    title: 'A Royal Fairytale Portrait',
    subtitle: 'Nikitha & Sandeep • Palace Elegance',
    category: 'couple',
    image: '/assets/couple/couple_royal_palace.jpg',
    alt: 'Sandeep and Nikitha Royal Palace Gown Portrait',
  },
  {
    id: 'couple-2',
    title: 'Sacred Bond Portrait',
    subtitle: 'Sandeep & Nikitha • Traditional Attire',
    category: 'couple',
    image: '/assets/couple/couple_portrait.jpg',
    alt: 'Sandeep and Nikitha Traditional Portrait',
  },
  {
    id: 'c1',
    title: 'Main Wedding Invitation',
    subtitle: 'Sandeep Weds Nikitha — Kalyanam',
    category: 'main',
    image: '/assets/cards/card_1_invitation.jpeg',
    alt: 'Sandeep and Nikitha Official Wedding Invitation Card',
  },
  {
    id: 'c0',
    title: 'Divine Invocation & Blessings',
    subtitle: 'Vakratunda Mahakaya & Shiva-Parvati Blessings',
    category: 'blessing',
    image: '/assets/cards/card_0_invocation.jpeg',
    alt: 'Sacred Ganesha Shloka and Divine Blessing Card',
  },
  {
    id: 'c2',
    title: 'Haldi Celebration Card',
    subtitle: 'Thu, 19th November 2026 • Suryapet',
    category: 'function',
    image: '/assets/cards/card_2_haldi.jpeg',
    alt: 'Haldi Function Illustrated Invitation Card',
  },
  {
    id: 'c3',
    title: 'Shaam-e-Sangeet Card',
    subtitle: 'Thu, 19th November 2026 • Suryapet',
    category: 'function',
    image: '/assets/cards/card_3_sangeet.jpeg',
    alt: 'Sangeet Night Illustrated Invitation Card',
  },
  {
    id: 'c4',
    title: 'Holy Marriage Ceremony Card',
    subtitle: 'Sun, 22nd November 2026 • Thungathurthi',
    category: 'function',
    image: '/assets/cards/card_4_marriage.jpeg',
    alt: 'Marriage Ceremony Illustrated Invitation Card',
  },
  {
    id: 'c5',
    title: 'Grand Reception Card',
    subtitle: 'Sun, 29th November 2026 • Surat',
    category: 'function',
    image: '/assets/cards/card_5_reception.jpeg',
    alt: 'Grand Reception Illustrated Invitation Card',
  },
  {
    id: 'c6',
    title: 'RSVP & Families Card',
    subtitle: 'Rudra & Yanagandhula Families',
    category: 'blessing',
    image: '/assets/cards/card_6_rsvp.jpeg',
    alt: 'RSVP Traditional Kalasam Card',
  },
];

interface Props {
  onOpenCard?: (cardSrc: string) => void;
}

export const CardsGallery: React.FC<Props> = ({ onOpenCard }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'couple' | 'function' | 'blessing'>('all');

  const filtered =
    activeTab === 'all'
      ? ALL_ITEMS
      : activeTab === 'couple'
      ? ALL_ITEMS.filter((c) => c.category === 'couple')
      : activeTab === 'function'
      ? ALL_ITEMS.filter((c) => c.category === 'function')
      : ALL_ITEMS.filter((c) => c.category === 'blessing' || c.category === 'main');

  return (
    <section id="gallery" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream border-t border-gold-soft/30">
      <CornerDecor />
      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage-soft/60 border border-gold-soft/50 text-sage-deep mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
              GALLERY &amp; KEEPSAKES
            </span>
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
          </div>

          <h2 className="font-script text-4xl sm:text-6xl text-rose-deep mt-1">
            Portraits &amp; Invitation Cards
          </h2>
          <FloralDivider />
          <p className="font-serif-display italic text-sm sm:text-lg text-foreground/80 max-w-xl mx-auto px-2">
            View the official couple portraits and authenticated South Indian wedding invitation cards for Sandeep &amp; Nikitha. Tap any image to inspect or download.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-6">
            {[
              { id: 'all', label: 'All Keepsakes (9)' },
              { id: 'couple', label: 'Couple Portraits (2)' },
              { id: 'function', label: 'Wedding Events (4)' },
              { id: 'blessing', label: 'Invocations & RSVP (3)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'all' | 'couple' | 'function' | 'blessing')}
                className={`px-4 sm:px-5 py-2 rounded-full font-cinzel text-xs tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'gradient-gold text-white font-semibold shadow-gold scale-105'
                    : 'bg-white/80 border border-gold-soft/60 text-sage-deep hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl bg-cream border overflow-hidden shadow-elegant hover:-translate-y-1.5 transition-all duration-500 group flex flex-col justify-between ${
                item.category === 'couple'
                  ? 'border-2 border-gold-soft ring-2 ring-gold-soft/20'
                  : 'border-gold-soft'
              }`}
            >
              {/* Image with Click to Zoom */}
              <div
                onClick={() => onOpenCard?.(item.image)}
                className="relative overflow-hidden cursor-pointer bg-cream/50 aspect-[9/15]"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  style={{
                    objectPosition:
                      item.id === 'couple-1'
                        ? '50% 36%'
                        : item.id === 'couple-2'
                        ? '50% 15%'
                        : '50% 10%',
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {item.category === 'couple' && (
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-gold-soft/50 text-[10px] font-cinzel text-gold-soft">
                    Couple Portrait
                  </div>
                )}

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="p-3 rounded-full bg-cream/95 text-rose-deep border border-gold-soft shadow-gold flex items-center gap-2 font-cinzel text-xs font-semibold">
                    <ZoomIn className="w-4 h-4" />
                    <span>View Full Size</span>
                  </div>
                </div>
              </div>

              {/* Bottom Info & Download Bar */}
              <div className="p-3.5 bg-sage-soft/30 border-t border-gold-soft/40 flex items-center justify-between gap-2">
                <div className="truncate">
                  <h4 className="font-serif-display font-bold text-sm text-foreground truncate">
                    {item.title}
                  </h4>
                  <p className="font-cinzel text-[10px] text-sage-deep truncate">
                    {item.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onOpenCard?.(item.image)}
                    title="View Full Size"
                    className="p-1.5 rounded-lg text-sage-deep hover:text-rose-deep hover:bg-white transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <a
                    href={item.image}
                    download={`${item.title.replace(/\s+/g, '_')}.jpeg`}
                    title="Download High-Res"
                    className="p-1.5 rounded-lg text-sage-deep hover:text-rose-deep hover:bg-white transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
