import React, { useState } from 'react';
import { EVENT_CONFIG, AlumniProfile } from '../config/eventConfig.ts';
import { Users, Search, GraduationCap, Briefcase, ArrowUpRight, MessageSquare, Info } from 'lucide-react';

interface AlumniSectionProps {
  onSelectAlumni: (alumni: AlumniProfile) => void;
  onOpenQuestionModal: (alumni: AlumniProfile) => void;
}

export const AlumniSection: React.FC<AlumniSectionProps> = ({ onSelectAlumni, onOpenQuestionModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAlumni = EVENT_CONFIG.alumniProfiles.filter((profile) => {
    const matchesCategory =
      selectedCategory === 'All' || profile.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.mentorshipTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="alumni" className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>THE PEOPLE WHO LIGHT THE WAY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA]">
              Alumni Mentors &amp; Trailblazers
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 max-w-2xl">
              Accomplished graduates returning to Shalom Hills to share insights, lessons, and industry realities.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by field, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] transition-colors"
            />
          </div>
        </div>

        {/* Clear Notice Banner regarding Placeholder Profiles as per Prompt Directive */}
        <div className="flex items-start gap-3 p-4 mb-8 rounded-lg bg-[#111111] border border-white/10 text-xs text-[#A1A1AA]">
          <Info className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#FAFAFA]">Official Secretariat Notice:</span> The profiles below represent illustrative mentorship cohorts and career tracks. Confirmed alumni speakers, biographies, and designated panel schedules will be posted here as finalized by the school organizing committee.
          </div>
        </div>

        {/* Category Filter Bar (Buttons with functional click handlers) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {EVENT_CONFIG.categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === category
                  ? 'bg-[#C9A227] text-[#080808] font-semibold shadow-[0_0_15px_rgba(201,162,39,0.35)]'
                  : 'bg-white/5 text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/10 border border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Alumni Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlumni.map((alumni) => (
            <div
              key={alumni.id}
              className="group relative flex flex-col justify-between p-6 rounded-lg bg-[#111111]/80 border border-white/10 hover:border-[#C9A227]/40 hover:bg-[#141414] transition-all duration-300 shadow-lg shadow-black/40 hover:-translate-y-1"
            >
              <div>
                {/* Top Row: Graduation Year & Category (Zero-pill clean metadata) */}
                <div className="flex items-center justify-between text-xs text-[#71717A] mb-4">
                  <span className="flex items-center gap-1.5 text-[#E8D9A8]/90 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-[#C9A227]" />
                    {alumni.graduationYear}
                  </span>
                  <span>{alumni.category}</span>
                </div>

                {/* Avatar / Monogram Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1C1C20] to-[#0A0A0A] border border-[#C9A227]/30 flex items-center justify-center text-[#E8D9A8] font-serif-editorial text-lg font-bold group-hover:border-[#C9A227] transition-colors shrink-0">
                    {alumni.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#FAFAFA] group-hover:text-[#E8D9A8] transition-colors leading-snug">
                      {alumni.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-[#A1A1AA] mt-0.5">
                      <Briefcase className="w-3 h-3 text-[#71717A]" />
                      <span className="truncate max-w-[170px]">{alumni.profession}</span>
                    </div>
                  </div>
                </div>

                {/* Short Organization */}
                <div className="text-[11px] text-[#71717A] mb-3 italic">
                  {alumni.organization}
                </div>

                {/* Short Bio */}
                <p className="text-xs text-[#A1A1AA] line-clamp-3 leading-relaxed mb-4">
                  {alumni.bio}
                </p>

                {/* Mentorship Topics */}
                <div className="mb-6">
                  <div className="text-[11px] uppercase tracking-wider text-[#71717A] font-semibold mb-2">
                    Mentorship Focus:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {alumni.mentorshipTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-[#E8D9A8] bg-white/[0.04] border border-white/5 px-2.5 py-1 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => onSelectAlumni(alumni)}
                  className="text-xs text-[#FAFAFA] hover:text-[#C9A227] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Explore Track</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenQuestionModal(alumni)}
                  className="p-1.5 rounded bg-white/5 hover:bg-[#C9A227]/20 hover:text-[#E8D9A8] text-[#A1A1AA] transition-colors cursor-pointer"
                  title="Ask this mentor a question"
                  aria-label="Submit Question"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-16 bg-[#111111] rounded-lg border border-white/5">
            <p className="text-[#A1A1AA] text-sm">No profiles found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs text-[#C9A227] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
