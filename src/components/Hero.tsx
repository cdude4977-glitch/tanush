import React from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { ArrowUpRight, Sparkles, Calendar, MapPin, Info, Briefcase } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer.tsx';

interface HeroProps {
  onExploreAlumni: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreAlumni, onNavigateTab }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-8 pt-24 pb-12 overflow-hidden">
      {/* Ambient Lighting & Golden Trail over Global Auditorium Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Ambient horizon warm glow representing the future */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#C9A227]/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Animated SVG Path & Footsteps Motif */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
        >
          <defs>
            <linearGradient id="heroGoldenTrail" x1="50%" y1="100%" x2="50%" y2="20%">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E8D9A8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFF7E6" stopOpacity="0" />
            </linearGradient>
            <filter id="trailGlowFilter">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 500 1000 Q 520 800 480 650 T 510 400 T 500 250"
            fill="none"
            stroke="url(#heroGoldenTrail)"
            strokeWidth="2.5"
            strokeDasharray="8 8"
            filter="url(#trailGlowFilter)"
            className="animate-pulse"
          />
        </svg>

        {/* Subtle Floating Star / Dust Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.12] pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4 text-xs sm:text-sm font-medium tracking-[0.25em] text-[#E8D9A8]/90 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>{EVENT_CONFIG.brand.eyebrow}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-editorial font-bold tracking-tight text-[#FAFAFA] leading-[0.92] mb-4">
          <span className="block">SHALOM</span>
          <span className="block gold-gradient-text tracking-[0.04em]">FOOTPRINTS</span>
        </h1>

        {/* Supporting Headline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif-editorial italic text-[#E8D9A8] max-w-2xl mx-auto mb-4 leading-snug">
          “{EVENT_CONFIG.brand.tagline}”
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-[#A1A1AA] max-w-2xl mx-auto mb-6 font-normal leading-relaxed">
          {EVENT_CONFIG.brand.heroDescription}
        </p>

        {/* Event Quick Info Badge Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-[#E8D9A8] mb-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="font-semibold tracking-wider uppercase text-[#FAFAFA]">14 NOVEMBER 2026</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="text-[#FAFAFA]">{EVENT_CONFIG.brand.host}</span>
          </div>
        </div>

        {/* FRONT PAGE COUNTDOWN TIMER */}
        <CountdownTimer />

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mt-2">
          <button
            onClick={onExploreAlumni}
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-poppins font-medium uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] rounded-md shadow-[0_0_30px_rgba(201,162,39,0.35)] hover:shadow-[0_0_40px_rgba(201,162,39,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>EXPLORE ALUMNI DIRECTORY</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('updates')}
                className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-poppins font-medium uppercase tracking-wider text-[#E8D9A8] bg-[#C9A227]/10 hover:bg-[#C9A227]/20 border border-[#C9A227]/35 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>SHARE YOUR PATH</span>
              </button>

              <button
                onClick={() => onNavigateTab('logistics')}
                className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-poppins font-medium uppercase tracking-wider text-[#FAFAFA] bg-white/5 hover:bg-white/10 border border-white/15 rounded-md hover:border-[#C9A227]/50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>EVENT DETAILS</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
