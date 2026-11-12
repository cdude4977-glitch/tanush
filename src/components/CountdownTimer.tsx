import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, Check, Copy } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  // Target: 14 November 2026, 11:00 AM IST (UTC+5:30)
  const targetDate = new Date('2026-11-14T11:00:00+05:30').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyDate = () => {
    navigator.clipboard.writeText('14 November 2026, From 11:00 AM IST onwards — Shalom Footprints at Shalom Hills International School');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Shalom Hills International School//Shalom Footprints//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:SHALOM FOOTPRINTS — Alumni Mentorship & Guidance Event',
      'DESCRIPTION:They\\\'ve Walked the Path. Now, They\\\'ll Help You Find Yours. Hosted at Shalom Hills International School.',
      'LOCATION:Shalom Hills International School, Block C, Sushant Lok Phase I, Sector 43, Gurugram, Haryana 122002',
      'DTSTART:20261114T053000Z', // 11:00 AM IST (UTC+5:30)
      'DTEND:20261114T093000Z',   // 03:00 PM IST
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Shalom_Footprints_14Nov2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const padZero = (num: number): string => num.toString().padStart(2, '0');

  const timeUnits = [
    { label: 'Days', value: timeLeft.days.toString(), highlight: false },
    { label: 'Hours', value: padZero(timeLeft.hours), highlight: false },
    { label: 'Minutes', value: padZero(timeLeft.minutes), highlight: false },
    { label: 'Seconds', value: padZero(timeLeft.seconds), highlight: true },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <div className="relative p-6 sm:p-8 rounded-xl bg-[#111114]/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Subtle decorative gold glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#C9A227]/10 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#C9A227]/8 rounded-full blur-[60px] pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-5 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse shadow-[0_0_8px_#C9A227]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8D9A8]">
              Countdown to Gathering
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#A1A1AA]">
            <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="font-semibold text-[#FAFAFA]">14 Nov 2026</span>
            <span className="text-[#71717A]">·</span>
            <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>04:30 PM IST</span>
          </div>
        </div>

        {/* Digits Display */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 my-6">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className={`flex flex-col items-center justify-center p-3 sm:p-5 rounded-lg border transition-all ${
                unit.highlight
                  ? 'bg-gradient-to-b from-[#1C1A14] to-[#121215] border-[#C9A227]/40 shadow-[0_0_15px_rgba(201,162,39,0.15)]'
                  : 'bg-[#16161A] border-white/5'
              }`}
            >
              <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] tabular-nums">
                {unit.value}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#A1A1AA] mt-1.5 font-medium">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Actions Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5 text-xs">
          <span className="text-[#71717A] text-[11px]">
            Venue: {EVENT_CONFIG.schedule.venue}, Gurugram
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDate}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
              title="Copy event schedule to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Copy Date</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadCalendar}
              className="px-3 py-1.5 rounded bg-[#C9A227]/10 hover:bg-[#C9A227]/20 text-[#E8D9A8] border border-[#C9A227]/30 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-medium"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Calendar Saved</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Add to Calendar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
