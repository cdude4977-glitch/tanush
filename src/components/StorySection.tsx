import React from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Compass } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-white/10 bg-transparent">
      {/* Decorative Gold Ambient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>{EVENT_CONFIG.story.eyebrow}</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA] leading-tight mb-8">
              {EVENT_CONFIG.story.headline}
            </h2>

            {/* Editorial Body Quotes */}
            <div className="space-y-6 text-[#A1A1AA] text-base sm:text-lg leading-relaxed font-light">
              <p className="border-l border-[#C9A227]/40 pl-5 italic text-[#E8D9A8]/90">
                "{EVENT_CONFIG.story.bodyP1}"
              </p>
              <p>
                {EVENT_CONFIG.story.bodyP2}
              </p>
            </div>

            {/* Three Emphasized Words in Restrained Gold Typography */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              {EVENT_CONFIG.story.corePillars.map((pillar) => (
                <div key={pillar.word} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#E8D9A8] mb-2 tracking-wide">
                    {pillar.word}
                  </span>
                  <span className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                    {pillar.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Corridor Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl shadow-black/80 group">
              <img
                src="/images/story_corridor_path_1793295220463.jpg"
                alt="Architectural corridor of Shalom Hills International School at dusk"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

              {/* Minimalist Caption Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#080808]/85 backdrop-blur-md border border-white/10">
                <div className="text-xs font-serif-editorial italic text-[#E8D9A8]">
                  Corridors of Legacy
                </div>
                <div className="text-[11px] text-[#A1A1AA] mt-1">
                  Walking the same ground where questions turn into conviction.
                </div>
              </div>
            </div>

            {/* Subtle Gold Hairline Path Floating behind visual */}
            <div className="absolute -bottom-6 -left-6 -right-6 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
