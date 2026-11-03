import React from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Compass, Check, ArrowRight } from 'lucide-react';

interface MentorshipSectionProps {
  onOpenRegister: () => void;
}

export const MentorshipSection: React.FC<MentorshipSectionProps> = ({ onOpenRegister }) => {
  return (
    <section id="mentorship" className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#0D0D0E] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>ALUMNI GUIDANCE FRAMEWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA] leading-tight">
            Their Experience. <span className="italic text-[#E8D9A8]">Your Next Chapter.</span>
          </h2>
          <p className="text-base text-[#A1A1AA] mt-4 font-light leading-relaxed">
            Navigating academic options, stream choices, college admissions, and modern careers requires grounded wisdom. Shalom Footprints connects students directly with mentors who have tested these waters themselves.
          </p>
        </div>

        {/* 3 Elegant Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENT_CONFIG.mentorshipPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="relative p-8 rounded-lg bg-[#141416] border border-white/10 hover:border-[#C9A227]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl shadow-black/50"
            >
              <div>
                {/* Number & Line Motif */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                  <span className="font-serif-editorial text-2xl font-bold text-[#C9A227]">
                    {pillar.number}
                  </span>
                  <div className="w-12 h-[1px] bg-[#C9A227]/30 group-hover:w-20 group-hover:bg-[#C9A227] transition-all" />
                </div>

                <h3 className="text-2xl font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8] transition-colors mb-3">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 font-light">
                  {pillar.description}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-2.5 pt-2 mb-8">
                  {pillar.takeaways.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#FAFAFA]/90">
                      <Check className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Assurance Note */}
              <div className="pt-4 border-t border-white/5 text-[11px] text-[#71717A]">
                Conducted in structured thematic cohort circles and open interactive dialogues.
              </div>
            </div>
          ))}
        </div>

        {/* Callout Strip */}
        <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-serif-editorial font-bold text-[#FAFAFA]">
              Have a specific question for an upcoming sector panel?
            </h4>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Submit your questions during registration to have them prioritized during the live alumni breakout sessions.
            </p>
          </div>
          <button
            onClick={onOpenRegister}
            className="px-6 py-2.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 shrink-0"
          >
            <span>JOIN THE DIALOGUE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
