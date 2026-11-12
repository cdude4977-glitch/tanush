import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Compass, Footprints } from 'lucide-react';

export const JourneyTimelineSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 bg-transparent border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
            <Footprints className="w-3.5 h-3.5" />
            <span>THE EXPERIENCE PATHWAY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA]">
            From Curiosity to Clarity.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 font-light">
            Five sequential milestones defining the student experience at Shalom Footprints.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative mb-16">
          {/* Continuous Glowing Golden Line */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#C9A227]/20 via-[#C9A227] to-[#C9A227]/20 z-0" />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {EVENT_CONFIG.journeyStages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* Step Node */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 mb-6 ${
                      isSelected
                        ? 'bg-[#C9A227] text-[#080808] scale-110 shadow-[0_0_25px_rgba(201,162,39,0.6)] ring-4 ring-[#E8D9A8]/20'
                        : 'bg-[#18181B] border border-white/20 text-[#A1A1AA] group-hover:border-[#C9A227] group-hover:text-[#FAFAFA]'
                    }`}
                  >
                    {stage.step}
                  </div>

                  <h3 className={`text-lg font-serif-editorial font-bold transition-colors ${
                    isSelected ? 'text-[#E8D9A8]' : 'text-[#FAFAFA]'
                  }`}>
                    {stage.title}
                  </h3>
                  <div className="text-xs text-[#C9A227] font-medium mt-1">
                    {stage.tagline}
                  </div>
                  <p className="text-xs text-[#A1A1AA] mt-2 line-clamp-3 leading-relaxed max-w-[200px]">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative pl-6 border-l-2 border-[#C9A227]/40 space-y-8 mb-12">
          {EVENT_CONFIG.journeyStages.map((stage, idx) => (
            <div
              key={stage.step}
              onClick={() => setActiveStage(idx)}
              className="relative cursor-pointer group"
            >
              {/* Node indicator */}
              <div
                className={`absolute -left-[31px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  activeStage === idx
                    ? 'bg-[#C9A227] text-[#080808] shadow-[0_0_15px_#C9A227]'
                    : 'bg-[#18181B] border border-white/20 text-[#A1A1AA]'
                }`}
              >
                {stage.step}
              </div>

              <div className="bg-[#121214] p-5 rounded-lg border border-white/10">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-lg font-serif-editorial font-bold text-[#FAFAFA]">
                    {stage.title}
                  </h3>
                  <span className="text-xs text-[#C9A227] font-medium">{stage.tagline}</span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Stage Insight Panel */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#111113] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] shrink-0 mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#C9A227] font-mono uppercase tracking-wider">
                Stage {EVENT_CONFIG.journeyStages[activeStage].step} · {EVENT_CONFIG.journeyStages[activeStage].tagline}
              </div>
              <h4 className="text-xl font-serif-editorial font-bold text-[#FAFAFA] mt-1">
                {EVENT_CONFIG.journeyStages[activeStage].title} Focus
              </h4>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1.5 max-w-2xl leading-relaxed">
                {EVENT_CONFIG.journeyStages[activeStage].description}
              </p>
            </div>
          </div>

          <div className="text-xs text-[#71717A] italic md:text-right shrink-0">
            *Experience stages reflect attendee guidance continuum.
          </div>
        </div>
      </div>
    </section>
  );
};
