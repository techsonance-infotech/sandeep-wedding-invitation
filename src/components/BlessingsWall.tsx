import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageSquareQuote } from 'lucide-react';
import { INITIAL_BLESSINGS } from '../data/weddingData';
import { BlessingItem } from '../types/wedding';

export const BlessingsWall: React.FC = () => {
  const [blessings, setBlessings] = useState<BlessingItem[]>(INITIAL_BLESSINGS);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Family & Friends');
  const [message, setMessage] = useState('');
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sandeep_nikitha_blessings');
      if (stored) {
        setBlessings(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) return;
    setLikedIds([...likedIds, id]);
    setBlessings((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b));
      try {
        localStorage.setItem('sandeep_nikitha_blessings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handlePostBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newBlessing: BlessingItem = {
      id: `bless_${Date.now()}`,
      author: name.trim(),
      relation: relation.trim() || 'Well-wisher',
      message: message.trim(),
      date: 'Just now',
      likes: 1,
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    try {
      localStorage.setItem('sandeep_nikitha_blessings', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setName('');
    setMessage('');
  };

  const quickBlessings = [
    'కల్యాణమస్తు! (Kalyanamastu) Wishing eternal happiness & love.',
    'Shubham Bhavatu! Hearty congratulations to Sandeep & Nikitha!',
    'Heartiest congratulations to the Rudra & Yanagandhula families!',
    'May Lord Venkateswara shower divine grace on your sacred journey.',
  ];

  return (
    <section id="blessings" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/40 bg-[#3D0A14] text-gold-300 text-xs font-serif tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Words of Grace</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
            Guest Blessings &amp; Wishes
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#FDFBF7]/80 max-w-xl mx-auto font-serif">
            Shower your affectionate prayers, good thoughts, and blessings upon Sandeep &amp; Nikitha.
          </p>
        </div>

        {/* Post a Blessing Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-royal-card border border-gold-500/40 shadow-2xl">
          <h3 className="font-serif text-lg font-bold text-gold-bright mb-4 flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-gold-400" />
            <span>Leave a Blessing for the Couple</span>
          </h3>

          <form onSubmit={handlePostBlessing} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Ramesh &amp; Family)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#20040A]/90 border border-gold-500/30 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Your Relation / City (e.g. Hyderabad / Friends)"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#20040A]/90 border border-gold-500/30 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <textarea
                required
                rows={2}
                placeholder="Write your prayers and auspicious blessings..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#20040A]/90 border border-gold-500/30 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* Quick pre-set chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-gold-300 font-serif">Quick wishes:</span>
              {quickBlessings.map((qb, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMessage(qb)}
                  className="text-[11px] font-serif bg-gold-500/10 hover:bg-gold-500/20 text-gold-200 border border-gold-500/30 px-2.5 py-1 rounded-full transition-colors truncate max-w-[280px]"
                >
                  {qb}
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full font-serif font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-[#3D0A14] shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Blessing</span>
              </button>
            </div>
          </form>
        </div>

        {/* Blessings Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blessings.map((bless) => (
            <div
              key={bless.id}
              className="p-5 rounded-2xl bg-[#28050D]/90 border border-gold-500/30 shadow-lg flex flex-col justify-between hover:border-gold-400 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-gold-200">{bless.author}</h4>
                    <p className="text-[10px] uppercase font-serif tracking-widest text-[#FDFBF7]/60">
                      {bless.relation}
                    </p>
                  </div>
                  <span className="text-[10px] text-gold-400/70 font-serif">{bless.date}</span>
                </div>

                <p className="text-xs text-[#FDFBF7]/85 italic leading-relaxed mb-4">
                  "{bless.message}"
                </p>
              </div>

              <div className="pt-3 border-t border-gold-500/20 flex items-center justify-end">
                <button
                  onClick={() => handleLike(bless.id)}
                  className={`flex items-center gap-1.5 text-xs font-serif transition-colors ${
                    likedIds.includes(bless.id) ? 'text-red-400' : 'text-gold-300 hover:text-red-400'
                  }`}
                  title="Send Love & Blessings"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likedIds.includes(bless.id) ? 'fill-red-400 text-red-400' : 'text-gold-400'
                    }`}
                  />
                  <span>{bless.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
