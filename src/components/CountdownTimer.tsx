import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Clock } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date(WEDDING_CONFIG.couple.weddingDateISO).getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  // Helper for Google Calendar
  const handleAddToGoogleCalendar = () => {
    const startTime = '20261122T023000Z'; // 08:00 AM IST
    const endTime = '20261122T173000Z';   // 11:00 PM IST
    const title = encodeURIComponent('Marriage: Sandeep Rudra & Nikitha Yanagandhula');
    const details = encodeURIComponent(
      'Auspicious wedding ceremony of Sandeep Rudra and Nikitha Yanagandhula. Join the Rudra & Yanagandhula families in blessing the newly wedded couple.'
    );
    const location = encodeURIComponent('Siri Function Hall, Thungathurthi, Telangana 508280');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sandeep & Nikitha Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:sandeep-nikitha-marriage-20261122',
      'DTSTAMP:20261027T120000Z',
      'DTSTART:20261122T023000Z',
      'DTEND:20261122T173000Z',
      'SUMMARY:Marriage Ceremony: Sandeep & Nikitha',
      'DESCRIPTION:Sacred Kalyanam of Sandeep Rudra & Nikitha Yanagandhula at Siri Function Hall\\, Thungathurthi.',
      'LOCATION:Siri Function Hall\\, Thungathurthi\\, Telangana - 508280',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Sandeep_Nikitha_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 sm:p-10 rounded-3xl bg-royal-card border border-gold-500/40 shadow-2xl relative overflow-hidden text-center">
          {/* Subtle floral watermark */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="flex items-center justify-center gap-2 mb-2 text-gold-300">
            <Clock className="w-4 h-4 text-gold-400" />
            <span className="text-xs uppercase font-serif tracking-[0.2em] font-semibold">Counting Down To The Sacred Muhurtham</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-gold-gradient font-bold mb-6">
            Until Sandeep &amp; Nikitha Tie The Holy Knot
          </h3>

          {/* Countdown Boxes */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto mb-8">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#20040A]/80 border border-gold-500/30 shadow-lg"
              >
                <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-gold-bright tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-gold-300 mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar integration buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleAddToGoogleCalendar}
              className="px-4 py-2 rounded-full text-xs font-medium bg-[#3D0A14] border border-gold-500/40 text-gold-200 hover:text-white hover:border-gold-300 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>Add to Google Calendar</span>
            </button>

            <button
              onClick={handleDownloadICS}
              className="px-4 py-2 rounded-full text-xs font-medium bg-[#3D0A14] border border-gold-500/40 text-gold-200 hover:text-white hover:border-gold-300 transition-all flex items-center gap-2"
            >
              <Bell className="w-4 h-4 text-gold-400" />
              <span>Download iCal / Outlook</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
