import React, { useState } from 'react';
import { EVENT_CONFIG, AwardCategory } from '../config/eventConfig.ts';
import {
  Award,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Calendar,
  MapPin,
  Trophy,
  X,
  Send,
  Eye,
  AlertCircle
} from 'lucide-react';

export const RecognitionSection: React.FC = () => {
  const [selectedAward, setSelectedAward] = useState<AwardCategory | null>(null);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeBatch, setNomineeBatch] = useState('');
  const [nominationReason, setNominationReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleNominateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomineeName.trim() || !nominationReason.trim()) {
      setError('Please provide the nominee name and a brief rationale.');
      return;
    }
    setError('');
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const resetNomination = () => {
    setSelectedAward(null);
    setNomineeName('');
    setNomineeBatch('');
    setNominationReason('');
    setIsSubmitted(false);
    setError('');
  };

  return (
    <section id="awards" className="relative py-20 sm:py-28 px-4 sm:px-8 bg-transparent border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Main Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.25em] text-[#C9A227] uppercase">
            <Trophy className="w-3.5 h-3.5" />
            <span>SHALOM ANNUAL ALUMNI MEET 2026</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-editorial font-bold text-[#FAFAFA] tracking-tight">
            Alumni Awards 2026
          </h2>
          <div className="text-base sm:text-lg font-serif-editorial italic text-[#E8D9A8] mt-2">
            “Tracing Roots, Embracing Wings”
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mt-3 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-xs font-mono text-[#E8D9A8]">
            <span>reconnect · relive · reunite</span>
          </div>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 font-light max-w-xl mx-auto">
            Recognising meaningful achievement, not seniority. Conferred on 14 November 2026 at Shalom Hills International School.
          </p>
        </div>

        {/* Official Poster Showcase Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#17150F]/90 via-[#121215]/90 to-[#0F0F12]/90 backdrop-blur-md border border-[#C9A227]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Clickable Poster Thumbnail */}
            <div
              onClick={() => setIsPosterModalOpen(true)}
              className="relative group w-32 sm:w-36 h-44 rounded-lg overflow-hidden border border-[#C9A227]/50 shadow-xl shrink-0 cursor-pointer hover:border-[#C9A227] transition-all"
              title="Click to view full official poster"
            >
              <img
                src="/images/alumni_awards_2026_poster.jpeg"
                alt="Shalom Footprints Alumni Awards 2026 Official Poster"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#080808]/40 group-hover:bg-[#080808]/10 transition-colors flex items-center justify-center">
                <span className="p-1.5 rounded-full bg-[#080808]/80 text-[#E8D9A8] border border-[#C9A227]/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A227] font-semibold">
                Official Honors Bulletin
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#FAFAFA]">
                10 Official Alumni Categories
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-lg leading-relaxed">
                Celebrating exceptional milestones across academics, venture innovation, arts, athletic grit, international presence, and enduring commitment to the school community.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#E8D9A8]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>14 November 2026</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Shalom Hills International School</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsPosterModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#FAFAFA] bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#C9A227] rounded transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>View Official Poster</span>
            </button>
            <span className="text-[11px] font-serif-editorial italic text-[#E8D9A8]">
              “Once a Shalomite... Always a Shalomite!”
            </span>
          </div>
        </div>

        {/* 10 Official Awards Cards Grid (2-Column Layout matching poster) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {EVENT_CONFIG.awardCategories.map((award) => (
            <div
              key={award.id}
              className="group relative p-6 sm:p-7 rounded-xl bg-[#111114]/80 backdrop-blur-md border border-white/10 hover:border-[#C9A227]/50 hover:bg-[#141418]/90 transition-all duration-300 shadow-xl flex items-start gap-5 hover:-translate-y-0.5"
            >
              {/* Circular Number Badge Matching Poster */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1C1A14] to-[#0A0A0C] border-2 border-[#C9A227] flex items-center justify-center text-[#E8D9A8] font-serif-editorial font-bold text-lg sm:text-xl shrink-0 shadow-[0_0_15px_rgba(201,162,39,0.2)] group-hover:scale-105 transition-transform">
                {award.number}
              </div>

              {/* Award Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="text-lg sm:text-xl font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8] transition-colors leading-snug">
                    {award.title}
                  </h3>
                </div>

                {award.subtitle && (
                  <div className="text-xs font-serif-editorial italic text-[#C9A227] mb-2 font-medium">
                    {award.subtitle}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed mb-4">
                  {award.description}
                </p>

                {/* Footer Action Strip */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Nominations Open</span>
                  </span>

                  <button
                    onClick={() => setSelectedAward(award)}
                    className="text-xs text-[#E8D9A8] hover:text-[#FAFAFA] font-medium flex items-center gap-1 hover:underline cursor-pointer transition-colors"
                  >
                    <span>Nominate an Alumnus</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline & Submission Notice */}
        <div className="mt-14 p-6 rounded-lg bg-white/[0.02] border border-white/5 text-center max-w-2xl mx-auto space-y-2">
          <div className="text-sm font-serif-editorial italic text-[#E8D9A8]">
            “Once a Shalomite... Always a Shalomite!”
          </div>
          <div className="text-xs text-[#71717A]">
            All citations will be conferred live on stage during the Shalom Footprints evening on 14 November 2026.
          </div>
        </div>
      </div>

      {/* Official Poster Lightbox Modal */}
      {isPosterModalOpen && (
        <div
          onClick={() => setIsPosterModalOpen(false)}
          className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[92vh] bg-[#121215] border border-[#C9A227]/40 rounded-xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#16161A]">
              <div className="text-xs font-mono uppercase tracking-wider text-[#C9A227] flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5" />
                <span>Alumni Awards 2026 Official Poster</span>
              </div>
              <button
                onClick={() => setIsPosterModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 overflow-y-auto flex items-center justify-center bg-black/60">
              <img
                src="/images/alumni_awards_2026_poster.jpeg"
                alt="Official Alumni Awards 2026 Poster"
                className="max-h-[80vh] w-auto rounded object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Nomination Modal */}
      {selectedAward && (
        <div
          onClick={resetNomination}
          className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#121215] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16161A]">
              <div className="text-xs font-mono text-[#C9A227] uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>Award Nomination Form</span>
              </div>
              <button
                onClick={resetNomination}
                className="p-1 rounded-full hover:bg-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A227]">
                  Category #{selectedAward.number}
                </span>
                <h3 className="text-xl font-serif-editorial font-bold text-[#FAFAFA] mt-0.5">
                  {selectedAward.title}
                </h3>
                {selectedAward.subtitle && (
                  <div className="text-xs italic text-[#E8D9A8] mt-0.5">
                    {selectedAward.subtitle}
                  </div>
                )}
                <p className="text-xs text-[#A1A1AA] mt-1">
                  {selectedAward.description}
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Nomination submitted successfully.</span>
                    Thank you! The Shalom Footprints Alumni Award Committee will review this candidate for {selectedAward.title}.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNominateSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#71717A] block mb-1.5">
                      Nominee Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priyancaa Thukral"
                      value={nomineeName}
                      onChange={(e) => setNomineeName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#71717A] block mb-1.5">
                      Graduation Batch (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2017-18"
                      value={nomineeBatch}
                      onChange={(e) => setNomineeBatch(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#71717A] block mb-1.5">
                      Why does this alumnus deserve this award?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe their accomplishments, impact, and why they fit this category..."
                      value={nominationReason}
                      onChange={(e) => setNominationReason(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={resetNomination}
                      className="px-4 py-2 text-xs text-[#A1A1AA] hover:text-[#FAFAFA] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {submitting ? <span>Submitting...</span> : <span>Submit Nomination</span>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
