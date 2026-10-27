import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Sparkles, Edit3 } from 'lucide-react';
import { FloralDivider } from './FloralDivider';
import { CornerDecor } from './CornerDecor';

interface RSVPSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  guestsCount: number;
  dietaryPreference: 'pure-veg' | 'jain' | 'standard';
  attendingEvents: string[];
  blessingMessage: string;
  submittedAt: string;
}

const EVENTS_LIST = [
  { id: 'haldi', name: 'Haldi Ceremony', date: 'Thu, 19th Nov 2026', city: 'Suryapet' },
  { id: 'sangeet', name: 'Sangeet Night', date: 'Thu, 19th Nov 2026', city: 'Suryapet' },
  { id: 'marriage', name: 'Marriage Ceremony', date: 'Sun, 22nd Nov 2026', city: 'Thungathurthi' },
  { id: 'reception', name: 'Wedding Reception', date: 'Sun, 29th Nov 2026', city: 'Surat' },
];

export const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guestsCount: 1,
    dietaryPreference: 'pure-veg' as 'pure-veg' | 'jain' | 'standard',
    attendingEvents: ['marriage'],
    blessingMessage: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [savedData, setSavedData] = useState<RSVPSubmission | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sandeep_nikitha_rsvp');
      if (stored) {
        setSavedData(JSON.parse(stored));
        setSubmitted(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => {
      const exists = prev.attendingEvents.includes(eventId);
      return {
        ...prev,
        attendingEvents: exists
          ? prev.attendingEvents.filter((id) => id !== eventId)
          : [...prev.attendingEvents, eventId],
      };
    });
  };

  const handleSelectAll = () => {
    if (formData.attendingEvents.length === EVENTS_LIST.length) {
      setFormData((prev) => ({ ...prev, attendingEvents: [] }));
    } else {
      setFormData((prev) => ({ ...prev, attendingEvents: EVENTS_LIST.map((e) => e.id) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your Name and Mobile Number.');
      return;
    }

    const sub: RSVPSubmission = {
      id: `rsvp_${Date.now()}`,
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('sandeep_nikitha_rsvp', JSON.stringify(sub));
    } catch {
      // ignore
    }

    setSavedData(sub);
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c59145', '#941f35', '#e4c79b', '#5e7052'],
    });
  };

  return (
    <section id="rsvp" className="relative py-20 px-6 bg-cream border-t border-gold-soft/30">
      <CornerDecor />
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-cinzel text-xs text-sage-deep tracking-widest font-semibold uppercase">
            RUDRA &amp; YANAGANDHULA FAMILIES
          </p>
          <h2 className="font-script text-5xl sm:text-6xl text-rose-deep mt-2">
            RSVP &amp; Blessings
          </h2>
          <FloralDivider />
          <p className="font-serif-display italic text-base sm:text-lg text-foreground/80 max-w-xl mx-auto">
            Please let us know if you will be able to join us for our wedding celebrations.
          </p>
        </div>

        <div className="bg-cream/90 backdrop-blur-md rounded-2xl border border-gold-soft p-6 sm:p-10 shadow-elegant">
          {submitted && savedData ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-rose-deep/10 border border-rose-deep/30 text-rose-deep flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-rose-deep mb-2">
                Thank You, {savedData.name}!
              </h3>
              <p className="text-sm font-serif-display italic text-foreground/80 max-w-md mx-auto mb-6">
                Your presence has been lovingly recorded. The Rudra and Yanagandhula families eagerly await welcoming you!
              </p>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-sage-soft/30 border border-gold-soft text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between py-1 border-b border-gold-soft/30">
                  <span className="text-sage-deep font-cinzel">Guest Name:</span>
                  <span className="font-medium text-foreground">{savedData.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gold-soft/30">
                  <span className="text-sage-deep font-cinzel">Mobile:</span>
                  <span className="font-medium text-foreground">{savedData.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gold-soft/30">
                  <span className="text-sage-deep font-cinzel">Guests:</span>
                  <span className="font-medium text-foreground">{savedData.guestsCount} Person(s)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sage-deep font-cinzel">Dietary Preference:</span>
                  <span className="font-medium text-foreground capitalize">
                    {savedData.dietaryPreference.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-1.5 text-xs font-cinzel uppercase tracking-wider text-rose-deep hover:text-foreground transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit RSVP</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-cinzel tracking-wider text-sage-deep mb-2 font-semibold">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Garu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-gold-soft text-foreground text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-cinzel tracking-wider text-sage-deep mb-2 font-semibold">
                    MOBILE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-gold-soft text-foreground text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-xs font-cinzel tracking-wider text-sage-deep mb-2 font-semibold">
                  NUMBER OF GUESTS: <span className="text-rose-deep font-bold">{formData.guestsCount}</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, '6+'].map((num) => {
                    const val = typeof num === 'string' ? 6 : num;
                    const isSelected = formData.guestsCount === val;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, guestsCount: val })}
                        className={`flex-1 py-2 rounded-lg text-xs font-cinzel font-semibold transition-all ${
                          isSelected
                            ? 'gradient-gold text-white shadow-gold'
                            : 'bg-white/80 border border-gold-soft text-sage-deep hover:bg-white'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Events Attendance Checkboxes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-cinzel tracking-wider text-sage-deep font-semibold">
                    WHICH FUNCTIONS WILL YOU ATTEND?
                  </label>
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-[11px] font-cinzel text-rose-deep hover:underline"
                  >
                    {formData.attendingEvents.length === EVENTS_LIST.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {EVENTS_LIST.map((ev) => {
                    const checked = formData.attendingEvents.includes(ev.id);
                    return (
                      <div
                        key={ev.id}
                        onClick={() => handleEventToggle(ev.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          checked
                            ? 'bg-sage-soft/40 border-gold shadow-sm'
                            : 'bg-white/60 border-gold-soft/50 text-foreground/70'
                        }`}
                      >
                        <div>
                          <p className={`font-serif-display text-sm font-semibold ${checked ? 'text-rose-deep' : 'text-foreground'}`}>
                            {ev.name}
                          </p>
                          <p className="text-[11px] text-sage-deep">{ev.date} • {ev.city}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {}}
                          className="w-4 h-4 accent-[#c59145] rounded"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personal Blessing Note */}
              <div>
                <label className="block text-xs font-cinzel tracking-wider text-sage-deep mb-2 font-semibold">
                  A BLESSING FOR SANDEEP &amp; NIKITHA
                </label>
                <textarea
                  rows={2}
                  placeholder="Share your prayers and heartfelt wishes..."
                  value={formData.blessingMessage}
                  onChange={(e) => setFormData({ ...formData, blessingMessage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-gold-soft text-foreground text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full gradient-gold text-white font-cinzel text-xs tracking-wider shadow-gold hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>CONFIRM ATTENDANCE</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
