import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Sparkles, Users, HeartHandshake, Utensils, Edit3 } from 'lucide-react';
import { RSVPSubmission } from '../types/wedding';
import { EVENTS } from '../data/weddingData';

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

  // Load saved RSVP from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sandeep_nikitha_rsvp');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedData(parsed);
        setSubmitted(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => {
      const exists = prev.attendingEvents.includes(eventId);
      if (exists) {
        return {
          ...prev,
          attendingEvents: prev.attendingEvents.filter((id) => id !== eventId),
        };
      } else {
        return {
          ...prev,
          attendingEvents: [...prev.attendingEvents, eventId],
        };
      }
    });
  };

  const handleSelectAllEvents = () => {
    if (formData.attendingEvents.length === EVENTS.length) {
      setFormData((prev) => ({ ...prev, attendingEvents: [] }));
    } else {
      setFormData((prev) => ({ ...prev, attendingEvents: EVENTS.map((e) => e.id) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your Name and Phone Number to confirm your RSVP.');
      return;
    }

    const submission: RSVPSubmission = {
      id: `rsvp_${Date.now()}`,
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('sandeep_nikitha_rsvp', JSON.stringify(submission));
    } catch {
      // ignore
    }

    setSavedData(submission);
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#9B1B30', '#F3E5AB'],
    });
  };

  const handleEdit = () => {
    if (savedData) {
      setFormData({
        name: savedData.name,
        phone: savedData.phone,
        email: savedData.email,
        guestsCount: savedData.guestsCount,
        dietaryPreference: savedData.dietaryPreference,
        attendingEvents: savedData.attendingEvents,
        blessingMessage: savedData.blessingMessage,
      });
    }
    setSubmitted(false);
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/40 bg-[#3D0A14] text-gold-300 text-xs font-serif tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Honored Presence</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
            RSVP &amp; Confirm Presence
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#FDFBF7]/80 max-w-xl mx-auto font-serif">
            Awaiting your gracious presence — Rudra Family &amp; Yanagandhula Family
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl bg-royal-card border border-gold-500/40 shadow-2xl p-6 sm:p-10 relative">
          {submitted && savedData ? (
            /* Confirmation Success State */
            <div className="text-center py-8 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border-2 border-gold-400 text-gold-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-bright mb-2">
                Thank You, {savedData.name}!
              </h3>

              <p className="text-sm text-[#FDFBF7]/90 max-w-md mx-auto mb-6">
                Your presence has been lovingly recorded. The Rudra and Yanagandhula families eagerly look forward to welcoming you and celebrating this sacred milestone together.
              </p>

              {/* Summary Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#20040A]/90 border border-gold-500/30 text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between py-1 border-b border-gold-500/10">
                  <span className="text-gold-300 font-serif">Guest Name:</span>
                  <span className="font-semibold text-white">{savedData.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gold-500/10">
                  <span className="text-gold-300 font-serif">Contact Phone:</span>
                  <span className="font-semibold text-white">{savedData.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gold-500/10">
                  <span className="text-gold-300 font-serif">Guests Attending:</span>
                  <span className="font-semibold text-white">{savedData.guestsCount} Person(s)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gold-500/10">
                  <span className="text-gold-300 font-serif">Dietary Choice:</span>
                  <span className="font-semibold text-white capitalize">{savedData.dietaryPreference.replace('-', ' ')}</span>
                </div>
                <div className="py-1">
                  <span className="text-gold-300 font-serif block mb-1">Functions Attending:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {savedData.attendingEvents.map((id) => {
                      const ev = EVENTS.find((e) => e.id === id);
                      return (
                        <span key={id} className="px-2 py-0.5 rounded bg-gold-500/20 text-gold-200 text-[10px] font-serif uppercase">
                          {ev ? ev.name : id}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={handleEdit}
                className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-gold-300 hover:text-white px-4 py-2 rounded-full border border-gold-500/30 hover:border-gold-400 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modify My RSVP Response</span>
              </button>
            </div>
          ) : (
            /* Interactive RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srikanth Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#20040A]/90 border border-gold-500/30 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                    Mobile / WhatsApp <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#20040A]/90 border border-gold-500/30 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Guests Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#20040A]/90 border border-gold-500/30 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2 flex items-center justify-between">
                    <span>Number of Guests</span>
                    <span className="text-gold-400 font-bold">{formData.guestsCount}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, '6+'].map((num) => {
                      const val = typeof num === 'string' ? 6 : num;
                      const isSelected = formData.guestsCount === val;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, guestsCount: val })}
                          className={`flex-1 py-2.5 rounded-lg text-xs font-serif font-bold transition-all ${
                            isSelected
                              ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-[#3D0A14] shadow-md'
                              : 'bg-[#20040A]/90 border border-gold-500/30 text-gold-300 hover:text-white'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Attending Events Checkboxes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-serif uppercase tracking-widest text-gold-300">
                    Which Celebrations Will You Grace?
                  </label>
                  <button
                    type="button"
                    onClick={handleSelectAllEvents}
                    className="text-[11px] font-serif text-gold-400 hover:text-gold-200 underline"
                  >
                    {formData.attendingEvents.length === EVENTS.length ? 'Deselect All' : 'Select All Events'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EVENTS.map((event) => {
                    const isChecked = formData.attendingEvents.includes(event.id);
                    return (
                      <div
                        key={event.id}
                        onClick={() => handleEventToggle(event.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-[#3D0A14] border-gold-400 shadow-md'
                            : 'bg-[#20040A]/70 border-gold-500/20 text-[#FDFBF7]/70 hover:border-gold-500/40'
                        }`}
                      >
                        <div className="text-left">
                          <p className={`font-serif text-xs font-bold ${isChecked ? 'text-gold-200' : 'text-white'}`}>
                            {event.name}
                          </p>
                          <p className="text-[11px] text-[#FDFBF7]/60">
                            {event.day}, {event.date} • {event.city}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent div
                          className="w-4 h-4 accent-gold-500 rounded cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                  Dietary Preference (Traditional South Indian Feast)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'pure-veg', label: 'Pure Veg Traditional' },
                    { id: 'jain', label: 'Jain Meal' },
                    { id: 'standard', label: 'Standard Feast' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          dietaryPreference: option.id as 'pure-veg' | 'jain' | 'standard',
                        })
                      }
                      className={`py-2 px-3 rounded-xl text-xs font-serif transition-all text-center border ${
                        formData.dietaryPreference === option.id
                          ? 'bg-gold-500/20 border-gold-400 text-gold-200 font-semibold'
                          : 'bg-[#20040A]/70 border-gold-500/20 text-[#FDFBF7]/70 hover:text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Blessing Note */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-2">
                  Warm Wishes &amp; Blessings to the Couple
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your prayers and heartfelt blessings for Sandeep & Nikitha..."
                  value={formData.blessingMessage}
                  onChange={(e) => setFormData({ ...formData, blessingMessage: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#20040A]/90 border border-gold-500/30 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-serif font-bold text-xs sm:text-sm uppercase tracking-widest bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-[#3D0A14] shadow-xl shadow-gold-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm RSVP Attendance</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
