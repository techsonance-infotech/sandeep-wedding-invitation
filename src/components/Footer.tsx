import React, { useState } from 'react';
import { Share2, ArrowUp, Copy, Check, Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';

export const Footer: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const { couple } = WEDDING_CONFIG;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = `🌸 *Wedding Invitation: Sandeep Rudra & Nikitha Yanagandhula* 🌸\n\nRequest your gracious presence at the wedding celebrations from 19th to 29th November 2026.\n\nView the auspicious invitation & itinerary here:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#180307] border-t-2 border-gold-500/30 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center text-xs overflow-hidden">
      {/* Decorative Kolam Background */}
      <div className="absolute inset-0 kolam-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Sacred Sanskrit Shloka */}
        <p className="font-serif text-gold-300 text-sm sm:text-base font-semibold tracking-widest uppercase mb-2">
          ॥ ॐ शान्तिः शान्తిః शान्తిః ॥
        </p>
        <p className="font-serif italic text-gold-200/80 mb-6 text-xs sm:text-sm">
          "సర్వే జనాః సుఖినో భవంతు — May peace, prosperity, and joy abound for all."
        </p>

        {/* Couple & Family Signature */}
        <div className="my-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient mb-1">
            {couple.groom.firstName} <span className="text-gold-400 font-script text-3xl font-normal">&amp;</span> {couple.bride.firstName}
          </h3>
          <p className="font-serif text-gold-400/90 tracking-widest uppercase text-[11px] mb-4">
            Rudra Family &amp; Yanagandhula Family
          </p>
        </div>

        {/* Wedding Hashtag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0A14] border border-gold-500/40 text-gold-200 font-serif text-xs mb-8">
          <span>{couple.hashtag}</span>
        </div>

        {/* Social Share & Copy Link Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={handleShareWhatsApp}
            className="px-4 py-2 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share on WhatsApp</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-full bg-[#3D0A14] hover:bg-[#5B0E1D] text-gold-300 border border-gold-500/40 transition-all flex items-center gap-2 text-xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Invitation Link'}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-[#3D0A14] hover:bg-[#5B0E1D] text-gold-300 border border-gold-500/40 transition-all"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent my-4" />

        <p className="text-[11px] text-[#FDFBF7]/60 flex items-center justify-center gap-1">
          <span>With love &amp; festive joy from the Rudra &amp; Yanagandhula Families</span>
          <Heart className="w-3 h-3 text-red-400 fill-red-400 inline" />
        </p>
      </div>
    </footer>
  );
};
