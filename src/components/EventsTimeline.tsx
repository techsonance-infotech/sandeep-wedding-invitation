import React from 'react';
import { Sparkles, Calendar, Clock, MapPin, Shirt, ExternalLink, CalendarPlus, ZoomIn } from 'lucide-react';
import { EVENTS } from '../data/weddingData';
import { WeddingEvent } from '../types/wedding';

interface Props {
  onOpenCardModal?: (cardId: string) => void;
}

export const EventsTimeline: React.FC<Props> = ({ onOpenCardModal }) => {
  const getCardIdForEvent = (eventId: string) => {
    switch (eventId) {
      case 'haldi':
        return 'card-haldi';
      case 'sangeet':
        return 'card-sangeet';
      case 'marriage':
        return 'card-marriage';
      case 'reception':
        return 'card-reception';
      default:
        return 'card-main';
    }
  };

  const addToCalendar = (event: WeddingEvent) => {
    let startTime = '';
    let endTime = '';

    if (event.id === 'haldi') {
      startTime = '20261119T043000Z'; // 10:00 AM IST
      endTime = '20261119T093000Z';   // 03:00 PM IST
    } else if (event.id === 'sangeet') {
      startTime = '20261119T130000Z'; // 06:30 PM IST
      endTime = '20261119T173000Z';   // 11:00 PM IST
    } else if (event.id === 'marriage') {
      startTime = '20261122T023000Z'; // 08:00 AM IST
      endTime = '20261122T103000Z';   // 04:00 PM IST
    } else if (event.id === 'reception') {
      startTime = '20261129T133000Z'; // 07:00 PM IST
      endTime = '20261129T173000Z';   // 11:00 PM IST
    }

    const title = encodeURIComponent(`${event.title}: Sandeep & Nikitha`);
    const details = encodeURIComponent(`${event.description}\nDress Code: ${event.dressCode}`);
    const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}, ${event.city}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/40 bg-[#3D0A14] text-gold-300 text-xs font-serif tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Sacred Ceremonies &amp; Celebrations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
            Wedding Itinerary &amp; Events
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#FDFBF7]/80 max-w-xl mx-auto font-serif">
            We cordially invite you and your family to grace each of our wedding festivities with your blessings.
          </p>
        </div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EVENTS.map((event, index) => (
            <div
              key={event.id}
              className="rounded-3xl bg-royal-card border border-gold-500/35 shadow-2xl overflow-hidden hover:border-gold-300 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Event Card Top Image & Details */}
              <div>
                <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#24040A]">
                  <img
                    src={event.cardImage}
                    alt={event.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D0A14] via-transparent to-black/30" />

                  {/* Event Index Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#3D0A14]/90 border border-gold-400/50 backdrop-blur-md text-[11px] font-serif uppercase tracking-widest text-gold-300 font-semibold">
                    Function 0{index + 1}
                  </div>

                  {/* Zoom Card Button */}
                  <button
                    onClick={() => onOpenCardModal?.(getCardIdForEvent(event.id))}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#3D0A14]/90 border border-gold-400/50 text-gold-300 hover:text-white backdrop-blur-md transition-transform hover:scale-110 flex items-center gap-1 text-xs"
                    title="View Original Invitation Card"
                  >
                    <ZoomIn className="w-4 h-4" />
                    <span className="hidden sm:inline text-[10px] uppercase font-serif tracking-wider">Card</span>
                  </button>

                  {/* Date Overlay in Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                        {event.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gold-300 font-serif font-medium drop-shadow">
                        {event.day}, {event.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event Body */}
                <div className="p-6">
                  {/* Time & Venue Info */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-[#FDFBF7]">
                      <Clock className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-gold-200">Timing: </span>
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs sm:text-sm text-[#FDFBF7]">
                      <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-gold-200">Venue: </span>
                        <span className="font-medium text-white">{event.venueName}</span>
                        <p className="text-xs text-[#FDFBF7]/70">
                          {event.venueAddress}, {event.city}, {event.state} {event.pincode ? `– ${event.pincode}` : ''}
                        </p>
                      </div>
                    </div>

                    {event.dressCode && (
                      <div className="flex items-start gap-3 text-xs sm:text-sm text-[#FDFBF7]">
                        <Shirt className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-gold-200">Suggested Attire: </span>
                          <span className="text-gold-100/90 italic">{event.dressCode}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[#FDFBF7]/80 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Key Rituals / Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {event.rituals.map((ritual) => (
                      <span
                        key={ritual}
                        className="text-[10px] font-serif uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#24040A] border border-gold-500/20 text-gold-300"
                      >
                        ✦ {ritual}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-gold-500/20 flex flex-wrap items-center justify-between gap-3 mt-4">
                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:text-gold-100 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 text-gold-400/80" />
                </a>

                <button
                  onClick={() => addToCalendar(event)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/40 text-gold-300 hover:text-white hover:bg-gold-500/20 transition-all text-xs"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-gold-400" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
