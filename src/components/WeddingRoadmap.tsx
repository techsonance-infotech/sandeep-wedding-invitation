import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Navigation, CalendarPlus, Shirt } from 'lucide-react';
import { FloralDivider } from './FloralDivider';
import { CornerDecor } from './CornerDecor';

interface Milestone {
  id: string;
  stepNumber: string;
  name: string;
  title: string;
  day: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  city: string;
  state: string;
  pincode?: string;
  mapsUrl: string;
  icon: string;
  accentColor: string;
  dressCode: string;
  description: string;
  rituals: string[];
}

const MILESTONES: Milestone[] = [
  {
    id: 'haldi',
    stepNumber: '01',
    name: 'Haldi Celebration',
    title: 'Mangala Snanam & Golden Turmeric',
    day: 'Thursday',
    date: '19th November 2026',
    time: '10:00 AM Onwards',
    venueName: 'Event Zone Farm House',
    venueAddress: 'Near HPCL Company, Durajpally',
    city: 'Suryapet',
    state: 'Telangana',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Durajpally+Suryapet+Telangana',
    icon: '💛',
    accentColor: '#D97706',
    dressCode: 'Shades of Turmeric Yellow, Mustard & Floral Attire',
    description: 'The auspicious start of our journey. Blessed with golden turmeric paste, traditional marigold flowers, folk melodies, and joyful laughter as the bride and groom prepare for the sacred vows.',
    rituals: ['Nalugu & Mangala Snanam', 'Turmeric Blessing', 'Traditional Melodies', 'Festive Lunch'],
  },
  {
    id: 'sangeet',
    stepNumber: '02',
    name: 'Shaam-e-Sangeet',
    title: 'A Night of Music, Dance & Stars',
    day: 'Thursday',
    date: '19th November 2026',
    time: '06:30 PM Onwards',
    venueName: 'Event Zone Farm House',
    venueAddress: 'Near HPCL Company, Durajpally',
    city: 'Suryapet',
    state: 'Telangana',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Durajpally+Suryapet+Telangana',
    icon: '🎶',
    accentColor: '#8B5CF6',
    dressCode: 'Glamorous Indo-Western, Shimmer Lehengas & Tuxedos',
    description: 'An enchanting starlit evening celebrating love and joy with spectacular choreography, couple entry, high-energy music, and a celebratory feast under twinkling fairy lights.',
    rituals: ['Couple Entry & Performance', 'Family Dance Showcases', 'Musical Gala', 'Royal Dinner Banquet'],
  },
  {
    id: 'marriage',
    stepNumber: '03',
    name: 'Holy Matrimony',
    title: 'Kalyana Mahotsavam (The Sacred Kalyanam)',
    day: 'Sunday',
    date: '22nd November 2026',
    time: 'Auspicious Muhurtham (Morning)',
    venueName: 'Siri Function Hall',
    venueAddress: 'Thungathurthi',
    city: 'Thungathurthi',
    state: 'Telangana',
    pincode: '508280',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Siri+Function+Hall+Thungathurthi+Telangana+508280',
    icon: '🪔',
    accentColor: '#9B1B30',
    dressCode: 'Royal South Indian Silk: Pattu Sarees, Kurta & Dhoti',
    description: 'The pinnacle of our union. Before Lord Agni, elders, and loving families, Sandeep and Nikitha unite with Jeelakarra Bellam, Mangalasutra Dharana, Talambralu, and the sacred Saptapadi.',
    rituals: ['Jeelakarra Bellam', 'Mangalasutra Dharana', 'Talambralu Shower', 'Saptapadi & Arundhati'],
  },
  {
    id: 'reception',
    stepNumber: '04',
    name: 'Grand Reception',
    title: 'Evening of Felicitations & Joy',
    day: 'Sunday',
    date: '29th November 2026',
    time: '07:00 PM Onwards',
    venueName: 'Tulsi Garden',
    venueAddress: 'Near Midas Square, Godadara Road, Limbayat',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395012',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tulsi+Garden+Godadara+Road+Limbayat+Surat+Gujarat+395012',
    icon: '✨',
    accentColor: '#B45309',
    dressCode: 'Royal Formal Wear, Designer Gowns & Bandhgalas',
    description: 'A lavish celebration in the Diamond City of Surat to greet and felicitate the newlyweds. An unforgettable evening of gourmet dining, warm greetings, and cherished memories.',
    rituals: ['Couple Felicitation & Greeting', 'Gourmet Grand Buffet', 'Celebration Toast', 'Photo Memories'],
  },
];

export const WeddingRoadmap: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('marriage');
  const activeMilestone = MILESTONES.find((m) => m.id === activeId) || MILESTONES[2];

  const handleCalendar = (m: Milestone) => {
    let startTime = '';
    let endTime = '';

    if (m.id === 'haldi') {
      startTime = '20261119T043000Z';
      endTime = '20261119T093000Z';
    } else if (m.id === 'sangeet') {
      startTime = '20261119T130000Z';
      endTime = '20261119T173000Z';
    } else if (m.id === 'marriage') {
      startTime = '20261122T023000Z';
      endTime = '20261122T103000Z';
    } else if (m.id === 'reception') {
      startTime = '20261129T133000Z';
      endTime = '20261129T173000Z';
    }

    const title = encodeURIComponent(`${m.name}: Sandeep & Nikitha`);
    const details = encodeURIComponent(`${m.description}\nDress Code: ${m.dressCode}`);
    const location = encodeURIComponent(`${m.venueName}, ${m.venueAddress}, ${m.city}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <section id="roadmap" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-sage-soft/30 overflow-hidden">
      <CornerDecor />
      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-cinzel text-xs text-sage-deep tracking-widest font-semibold uppercase">
            SACRED ITINERARY &amp; ROUTE
          </p>
          <h2 className="font-script text-4xl sm:text-6xl text-rose-deep mt-2">
            The Wedding Journey Roadmap
          </h2>
          <FloralDivider />
          <p className="font-serif-display italic text-sm sm:text-lg text-foreground/80 max-w-2xl mx-auto px-2">
            Follow the celebratory path of Sandeep and Nikitha across each auspicious function — from traditional Haldi and musical Sangeet to the sacred Kalyanam and grand Reception.
          </p>
        </div>

        {/* Interactive Roadmap Milestone Stepper Bar */}
        <div className="relative mb-12">
          {/* Connecting Golden Trail Line */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-gradient-to-r from-gold-soft via-gold to-gold-soft opacity-60 z-0" />

          {/* 4 Milestones Horizontal Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10">
            {MILESTONES.map((m) => {
              const isActive = m.id === activeId;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveId(m.id)}
                  className={`p-3.5 sm:p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-cream border-gold shadow-elegant scale-102 ring-2 ring-gold/40'
                      : 'bg-cream/70 hover:bg-cream border-gold-soft/50 shadow-soft opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-cinzel text-xs font-bold transition-colors ${
                        isActive
                          ? 'gradient-gold text-white shadow-gold'
                          : 'bg-sage-soft/60 text-sage-deep'
                      }`}
                    >
                      {m.stepNumber}
                    </span>
                    <span className="text-xl sm:text-2xl select-none">{m.icon}</span>
                  </div>

                  <div>
                    <h3 className={`font-serif-display text-sm sm:text-base font-bold line-clamp-1 ${
                      isActive ? 'text-rose-deep' : 'text-foreground'
                    }`}>
                      {m.name}
                    </h3>
                    <p className="font-cinzel text-[11px] text-sage-deep mt-0.5">
                      {m.date.split(' ')[0]} {m.date.split(' ')[1]}
                    </p>
                    <p className="text-[10px] text-foreground/60 truncate mt-0.5">
                      {m.city}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Spotlight Detail Card */}
        <div className="bg-cream rounded-3xl border-2 border-gold-soft shadow-elegant p-6 sm:p-10 relative overflow-hidden animate-fade-in">
          {/* Subtle Watermark Backdrop */}
          <div className="absolute -top-10 -right-10 text-9xl opacity-5 select-none pointer-events-none">
            {activeMilestone.icon}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-3 py-1 rounded-full gradient-gold text-white font-cinzel text-[10px] sm:text-xs tracking-wider uppercase font-semibold shadow-gold">
                  Milestone {activeMilestone.stepNumber}
                </span>
                <span className="font-serif-display italic text-xs sm:text-sm text-sage-deep">
                  {activeMilestone.day}, {activeMilestone.date}
                </span>
              </div>

              <h3 className="font-script text-3xl sm:text-5xl text-rose-deep mb-1">
                {activeMilestone.name}
              </h3>
              <p className="font-serif-display text-base sm:text-xl text-gold-soft font-semibold mb-4">
                {activeMilestone.title}
              </p>

              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-serif-display italic mb-6">
                "{activeMilestone.description}"
              </p>

              {/* Timing & Venue Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-sage-soft/30 border border-gold-soft/50 mb-6 text-xs">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-cinzel text-[10px] uppercase text-sage-deep block">Time</span>
                    <span className="font-semibold text-foreground">{activeMilestone.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-cinzel text-[10px] uppercase text-sage-deep block">Venue</span>
                    <span className="font-semibold text-foreground">{activeMilestone.venueName}</span>
                    <p className="text-foreground/70 text-[11px]">
                      {activeMilestone.venueAddress}, {activeMilestone.city}
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-start gap-2.5 pt-2 border-t border-gold-soft/30">
                  <Shirt className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-cinzel text-[10px] uppercase text-sage-deep block">Suggested Dress Code</span>
                    <span className="text-foreground italic">{activeMilestone.dressCode}</span>
                  </div>
                </div>
              </div>

              {/* Ritual Highlights */}
              <div className="mb-6">
                <span className="font-cinzel text-[10px] tracking-widest text-sage-deep uppercase block mb-2 font-semibold">
                  Key Ritual Highlights:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeMilestone.rituals.map((r, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-cream border border-gold-soft/80 text-rose-deep text-xs font-serif-display shadow-soft"
                    >
                      ✦ {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={activeMilestone.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full gradient-gold text-white font-cinzel text-xs tracking-wider shadow-gold hover:opacity-90 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Navigate to Venue</span>
                </a>

                <button
                  onClick={() => handleCalendar(activeMilestone)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream border border-gold-soft text-rose-deep font-cinzel text-xs tracking-wider hover:bg-sage-soft/30 transition-all shadow-soft cursor-pointer"
                >
                  <CalendarPlus className="w-4 h-4 text-gold" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Stamp Card */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-xs aspect-[4/5] rounded-2xl overflow-hidden border-2 border-gold-soft shadow-elegant p-3 bg-cream/70 flex flex-col justify-between text-center relative group">
                <div className="p-4 rounded-xl border border-gold-soft/50 bg-cream h-full flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full gradient-gold shadow-gold flex items-center justify-center text-2xl mb-3">
                    {activeMilestone.icon}
                  </div>
                  <span className="font-cinzel text-xs text-sage-deep tracking-widest">
                    FUNCTION {activeMilestone.stepNumber}
                  </span>
                  <h4 className="font-serif-display font-bold text-xl text-rose-deep mt-1 mb-2">
                    {activeMilestone.city}
                  </h4>
                  <div className="w-12 h-px bg-gold-soft my-2" />
                  <p className="font-serif-display italic text-xs text-foreground/75 leading-relaxed">
                    {activeMilestone.venueName}
                  </p>
                  <p className="font-cinzel text-[11px] text-gold mt-2 font-semibold">
                    {activeMilestone.day} • {activeMilestone.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
