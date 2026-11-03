import React from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const RecognitionSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#0B0B0C] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>HONORS &amp; ACCOLADES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA]">
            CELEBRATING THE <span className="gold-gradient-text">JOURNEY.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 font-light">
            Recognizing alumni who illuminate paths for others and honoring students whose aspirations leave meaningful footprints.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENT_CONFIG.awardCategories.map((award) => (
            <div
              key={award.id}
              className="relative p-8 rounded-lg bg-[#121214] border border-white/10 hover:border-[#C9A227]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Medallion Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#24242A] to-[#121214] border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] shadow-[0_0_15px_rgba(201,162,39,0.15)] group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-[#E8D9A8]/80 tracking-wider uppercase">
                    {award.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8] transition-colors mb-3">
                  {award.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed mb-6">
                  {award.description}
                </p>

                {/* Eligibility & Criteria Specification */}
                <div className="space-y-3 pt-4 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-[#71717A] uppercase text-[10px] tracking-wider block font-semibold mb-1">
                      Eligibility
                    </span>
                    <span className="text-[#FAFAFA]/90">{award.eligibility}</span>
                  </div>

                  <div>
                    <span className="text-[#71717A] uppercase text-[10px] tracking-wider block font-semibold mb-1">
                      Evaluation Criteria
                    </span>
                    <span className="text-[#A1A1AA]">{award.criteria}</span>
                  </div>
                </div>
              </div>

              {/* Status & Recipient Placeholder */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-[#E8D9A8]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                  <span className="text-[11px] italic text-[#A1A1AA]">{award.recipientPlaceholder}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] text-[#71717A]">
                  <span>Status</span>
                  <span className="text-[#C9A227] font-medium">{award.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on official updates */}
        <div className="mt-12 text-center text-xs text-[#71717A] max-w-xl mx-auto">
          Official prize citations, jury panel details, and nomination links will be published once finalized by the school administration.
        </div>
      </div>
    </section>
  );
};
