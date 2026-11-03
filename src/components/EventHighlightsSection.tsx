import React from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const EventHighlightsSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EVENT HORIZONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA] tracking-tight">
            ONE EVENING. <span className="gold-gradient-text">COUNTLESS POSSIBILITIES.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 font-light">
            Designed as an immersive continuum of conversations, guidance pods, and community fellowship.
          </p>
        </div>

        {/* Dynamic Bento-style Grid with alternating card spans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_CONFIG.highlights.map((item, index) => {
            const isFeatured = index === 0 || index === 4;
            return (
              <div
                key={item.title}
                className={`relative p-8 rounded-lg bg-[#111111] border border-white/10 hover:border-[#C9A227]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#18181B] to-[#0E0E10]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#71717A] mb-6">
                    <span className="font-mono text-[11px] text-[#C9A227]">0{index + 1}</span>
                    <span className="text-[#E8D9A8]/80 text-[11px] uppercase tracking-wider">{item.metric}</span>
                  </div>

                  <h3 className="text-xl font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8] transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#71717A]">
                  <span>Planned Agenda Module</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A227] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-[#71717A]">
          *Detailed minute-by-minute itinerary will be shared with registered attendees prior to 14 November 2026.
        </div>
      </div>
    </section>
  );
};
