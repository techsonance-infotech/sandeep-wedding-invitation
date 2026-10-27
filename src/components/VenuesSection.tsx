import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

interface VenueItem {
  id: string;
  name: string;
  eventTypes: string;
  dates: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  mapsUrl: string;
  embedQuery: string;
  notes: string;
}

export const VenuesSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const venues: VenueItem[] = [
    {
      id: 'suryapet',
      name: 'Event Zone Farm House',
      eventTypes: 'Haldi & Sangeet Night',
      dates: 'Thursday, 19th November 2026',
      address: 'Near HPCL Company, Durajpally',
      city: 'Suryapet',
      state: 'Telangana',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Durajpally+Suryapet+Telangana',
      embedQuery: 'Durajpally, Suryapet, Telangana',
      notes: 'Easily accessible via Hyderabad-Vijayawada NH 65 highway with ample valet and guest parking.',
    },
    {
      id: 'thungathurthi',
      name: 'Siri Function Hall',
      eventTypes: 'Holy Matrimony (Marriage)',
      dates: 'Sunday, 22nd November 2026',
      address: 'Thungathurthi',
      city: 'Thungathurthi',
      state: 'Telangana',
      pincode: '508280',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Siri+Function+Hall+Thungathurthi+Telangana+508280',
      embedQuery: 'Thungathurthi, Telangana 508280',
      notes: 'The sacred Kalyanam venue featuring a grand traditional mandap and dining halls.',
    },
    {
      id: 'surat',
      name: 'Tulsi Garden',
      eventTypes: 'Grand Wedding Reception',
      dates: 'Sunday, 29th November 2026',
      address: 'Near Midas Square, Godadara Road, Limbayat',
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395012',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tulsi+Garden+Godadara+Road+Limbayat+Surat+Gujarat+395012',
      embedQuery: 'Tulsi Garden, Godadara Road, Limbayat, Surat, Gujarat 395012',
      notes: 'Magnificent banquet garden in Surat well connected by Surat railway station and airport.',
    },
  ];

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="venues" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-400/40 bg-[#3D0A14] text-gold-300 text-xs font-serif tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Locations &amp; Directions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
            Celebration Venues &amp; Navigation
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#FDFBF7]/80 max-w-xl mx-auto font-serif">
            Interactive maps and directions to help you reach each venue smoothly.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.map((venue) => {
            const fullAddress = `${venue.name}, ${venue.address}, ${venue.city}, ${venue.state} ${venue.pincode || ''}`;
            const isCopied = copiedId === venue.id;

            return (
              <div
                key={venue.id}
                className="rounded-3xl bg-royal-card border border-gold-500/35 shadow-2xl p-6 flex flex-col justify-between hover:border-gold-300 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-serif uppercase tracking-widest px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300">
                      {venue.eventTypes}
                    </span>
                    <MapPin className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-gold-bright mb-1">
                    {venue.name}
                  </h3>

                  <p className="text-xs font-serif text-gold-300/90 mb-3">
                    {venue.dates}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#20040A]/80 border border-gold-500/20 mb-4 text-xs">
                    <p className="text-[#FDFBF7] font-medium leading-relaxed">
                      {venue.address}
                    </p>
                    <p className="text-gold-200/80">
                      {venue.city}, {venue.state} {venue.pincode ? `– ${venue.pincode}` : ''}
                    </p>
                  </div>

                  <p className="text-xs text-[#FDFBF7]/75 leading-relaxed mb-6">
                    {venue.notes}
                  </p>
                </div>

                {/* Venue Action Buttons */}
                <div className="pt-4 border-t border-gold-500/20 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyAddress(venue.id, fullAddress)}
                    className="inline-flex items-center gap-1.5 text-xs text-gold-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-gold-500/10"
                    title="Copy Address"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-[#3D0A14] shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Navigate</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
