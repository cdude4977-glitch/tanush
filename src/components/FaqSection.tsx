import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = EVENT_CONFIG.faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faqs" className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#080808] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CLARITY &amp; ANSWERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 font-light max-w-xl mx-auto">
            Everything you need to know about the Shalom Footprints mentorship and alumni gathering.
          </p>

          {/* Quick Search */}
          <div className="relative max-w-md mx-auto mt-8">
            <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. registration, venue, timing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] transition-colors"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-lg bg-[#111113] border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#C9A227]">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-serif-editorial font-bold text-[#FAFAFA]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A227] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#A1A1AA] font-light leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    {faq.isConfirmed && (
                      <div className="mt-3 text-[11px] text-[#71717A] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Verified by Event Secretariat</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-[#111113] rounded-lg border border-white/5">
            <p className="text-[#A1A1AA] text-sm">No questions matched your search query.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs text-[#C9A227] hover:underline cursor-pointer"
            >
              Clear Search Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
