import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Calendar, Clock, MapPin, Sparkles, Download, ExternalLink, Check, UserCheck } from 'lucide-react';

export const EventDetailsSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCalendar = () => {
    // Generate .ics standard calendar file
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Shalom Hills International School//Shalom Footprints//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:SHALOM FOOTPRINTS — Alumni Mentorship & Guidance Event',
      'DESCRIPTION:They\\\'ve Walked the Path. Now, They\\\'ll Help You Find Yours. Hosted at Shalom Hills International School.',
      'LOCATION:Shalom Hills International School, Block C, Sushant Lok Phase I, Sector 43, Gurugram, Haryana 122002',
      'DTSTART:20261114T110000Z', // approx 4:30 PM IST (UTC+5:30)
      'DTEND:20261114T150000Z',   // approx 8:30 PM IST
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

  return (
    <section id="details" className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#0D0D0F] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>EVENT LOGISTICS &amp; VENUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA]">
            Key Event Information
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 font-light">
            All essential logistics for students, parents, and returning alumni joining us on campus.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Date & Venue Showcase (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-lg bg-[#141418] border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Background subtle gold glow & path */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#C9A227]/10 rounded-full blur-[90px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-[0.25em] text-[#E8D9A8] font-semibold">
                  Official Gathering
                </span>
                <span className="text-xs font-mono text-[#C9A227]">
                  {EVENT_CONFIG.schedule.dayOfWeek}
                </span>
              </div>

              {/* Huge Date Display */}
              <div className="mb-8">
                <div className="text-4xl sm:text-6xl font-serif-editorial font-bold text-[#FAFAFA] leading-tight">
                  14 November 2026
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-[#E8D9A8] mt-2">
                  <Clock className="w-4 h-4 text-[#C9A227]" />
                  <span>{EVENT_CONFIG.schedule.time}</span>
                </div>
                <div className="text-[11px] text-[#71717A] mt-1 italic">
                  *{EVENT_CONFIG.schedule.timeNotice}
                </div>
              </div>

              {/* Venue Info */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-base font-semibold text-[#FAFAFA]">
                      {EVENT_CONFIG.schedule.venue}
                    </div>
                    <div className="text-xs text-[#E8D9A8] mt-0.5">
                      {EVENT_CONFIG.schedule.hall}
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                      {EVENT_CONFIG.schedule.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Add to Calendar & Google Maps */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handleDownloadCalendar}
                className="px-4 py-2.5 text-xs font-medium rounded bg-white/5 hover:bg-white/10 border border-white/15 text-[#FAFAFA] hover:text-[#C9A227] transition-all flex items-center gap-2 cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Added to Calendar (.ics)</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>Save to Calendar (.ics)</span>
                  </>
                )}
              </button>

              <a
                href={EVENT_CONFIG.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-medium rounded bg-[#C9A227]/10 hover:bg-[#C9A227]/20 border border-[#C9A227]/30 text-[#E8D9A8] transition-all flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>View Campus on Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Quick Details Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {/* Eligibility Card */}
            <div className="p-6 rounded-lg bg-[#141418] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A227] uppercase tracking-wider mb-2">
                <UserCheck className="w-4 h-4" />
                <span>Eligibility &amp; Attendees</span>
              </div>
              <p className="text-xs text-[#FAFAFA] leading-relaxed">
                {EVENT_CONFIG.schedule.eligibility}
              </p>
              <div className="text-[11px] text-[#71717A] mt-2">
                Alumni from all graduating cohorts are warmly welcomed to reconnect and mentor.
              </div>
            </div>

            {/* Dress Code & Instructions */}
            <div className="p-6 rounded-lg bg-[#141418] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A227] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Dress Code &amp; Etiquette</span>
              </div>
              <p className="text-xs text-[#FAFAFA] leading-relaxed">
                {EVENT_CONFIG.schedule.dressCode}
              </p>
              <div className="text-[11px] text-[#71717A] mt-2">
                Students attending in school uniform or smart formal attire as directed by school administration.
              </div>
            </div>

            {/* Check-in Procedure */}
            <div className="p-6 rounded-lg bg-[#141418] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A227] uppercase tracking-wider mb-2">
                <Check className="w-4 h-4" />
                <span>Arrival &amp; Check-In</span>
              </div>
              <p className="text-xs text-[#FAFAFA] leading-relaxed">
                Registered attendees are requested to report at the reception desk 20 minutes prior to keynote commencement to collect their mentorship sector badge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
