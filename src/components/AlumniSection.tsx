import React, { useState, useMemo } from 'react';
import { EVENT_CONFIG, AlumniProfile } from '../config/eventConfig.ts';
import {
  Users,
  Search,
  CheckCircle2,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  ArrowUpDown,
  Copy,
  Check,
  GraduationCap,
  Filter,
  Briefcase,
  BookOpen,
  MapPin,
  PlusCircle
} from 'lucide-react';
import type { AlumniJourneyRecord } from '../services/alumniJourneyService.ts';

interface AlumniSectionProps {
  onSelectAlumni: (alumni: AlumniProfile) => void;
  onOpenQuestionModal: (alumni: AlumniProfile) => void;
  journeys: AlumniJourneyRecord[];
  onNavigateToUpdates: () => void;
}

export const AlumniSection: React.FC<AlumniSectionProps> = ({
  onSelectAlumni,
  onOpenQuestionModal,
  journeys,
  onNavigateToUpdates,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [onlyWithUpdates, setOnlyWithUpdates] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'default' | 'alphabetical' | 'recent' | 'batch-asc' | 'batch-desc'>('default');
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyContact = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const mergedAlumni = useMemo<AlumniProfile[]>(() => {
    const journeyByAlumniId = new Map<string, AlumniJourneyRecord>();
    const communityEntries: AlumniProfile[] = [];

    for (const j of journeys) {
      if (j.alumniId && j.alumniId !== 'community') {
        if (!journeyByAlumniId.has(j.alumniId)) {
          journeyByAlumniId.set(j.alumniId, j);
        }
      } else {
        communityEntries.push({
          id: j.id,
          name: j.alumniName,
          email: '',
          contactNumber: '',
          timestamp: new Date(j.updatedAtMs).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          batchYear: j.batchYear,
          journey: j,
          isCommunityAdded: true,
        });
      }
    }

    const enrichedRegistered = EVENT_CONFIG.alumniProfiles.map((profile) => {
      const matchedJourney =
        journeyByAlumniId.get(profile.id) ||
        journeys.find(
          (j) =>
            j.alumniId === 'community' &&
            j.alumniName.trim().toLowerCase() === profile.name.trim().toLowerCase() &&
            j.batchYear.trim() === profile.batchYear.trim()
        );
      return matchedJourney ? { ...profile, journey: matchedJourney } : profile;
    });

    // Exclude community entries that matched a static registered alumnus by name + batch
    const unmatchedCommunity = communityEntries.filter(
      (c) =>
        !EVENT_CONFIG.alumniProfiles.some(
          (p) =>
            p.name.trim().toLowerCase() === c.name.trim().toLowerCase() &&
            p.batchYear.trim() === c.batchYear.trim()
        )
    );

    return [...unmatchedCommunity, ...enrichedRegistered];
  }, [journeys]);

  const withUpdatesCount = useMemo(
    () => mergedAlumni.filter((p) => Boolean(p.journey)).length,
    [mergedAlumni]
  );

  const uniqueBatches = useMemo(() => {
    const batches = Array.from(new Set(mergedAlumni.map((p) => p.batchYear).filter(Boolean)));
    return batches.sort();
  }, [mergedAlumni]);

  const filteredAlumni = useMemo(() => {
    let list = [...mergedAlumni];

    // Only with career/college updates toggle
    if (onlyWithUpdates) {
      list = list.filter((profile) => Boolean(profile.journey));
    }

    // Batch filter
    if (selectedBatch !== 'all') {
      list = list.filter((profile) => profile.batchYear === selectedBatch);
    }

    // Text search (name, batch, email, phone, plus submitted profession/college/stream/notes)
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter((profile) => {
        const j = profile.journey;
        return (
          profile.name.toLowerCase().includes(q) ||
          profile.email.toLowerCase().includes(q) ||
          profile.contactNumber.toLowerCase().includes(q) ||
          profile.batchYear.toLowerCase().includes(q) ||
          (j &&
            (j.professionOrRole.toLowerCase().includes(q) ||
              j.collegeOrOrganization.toLowerCase().includes(q) ||
              j.streamOrField.toLowerCase().includes(q) ||
              j.pursuitCategory.toLowerCase().includes(q) ||
              j.currentLocation.toLowerCase().includes(q) ||
              j.whatImDoing.toLowerCase().includes(q)))
        );
      });
    }

    // Sorting
    if (sortOrder === 'alphabetical') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'recent') {
      list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (sortOrder === 'batch-asc') {
      list.sort((a, b) => a.batchYear.localeCompare(b.batchYear));
    } else if (sortOrder === 'batch-desc') {
      list.sort((a, b) => b.batchYear.localeCompare(a.batchYear));
    }

    return list;
  }, [mergedAlumni, onlyWithUpdates, searchQuery, selectedBatch, sortOrder]);

  const displayedAlumni = filteredAlumni.slice(0, visibleCount);

  return (
    <section id="alumni" className="relative py-16 sm:py-24 px-4 sm:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>OFFICIAL ATTENDEE DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA]">
              Registered Alumni Directory
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-2 max-w-2xl font-light">
              Official registrations submitted by Shalom Hills International School alumni for the Shalom Footprints gathering on 14 November 2026, categorized by graduation batches.
            </p>
          </div>

          {/* Search, Batch Filter & Sort Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, batch, profession, college..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(24);
                }}
                className="w-full bg-[#141416] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>

            {/* Batch Filter Dropdown */}
            <div className="relative flex items-center bg-[#141416] border border-white/10 rounded-lg px-3 py-1.5 shrink-0">
              <GraduationCap className="w-3.5 h-3.5 text-[#C9A227] mr-2 shrink-0" />
              <select
                value={selectedBatch}
                onChange={(e) => {
                  setSelectedBatch(e.target.value);
                  setVisibleCount(24);
                }}
                className="bg-transparent text-xs text-[#FAFAFA] focus:outline-none cursor-pointer pr-2"
                aria-label="Filter by Graduation Batch"
              >
                <option value="all" className="bg-[#141416] text-[#FAFAFA]">All Batches ({mergedAlumni.length})</option>
                {uniqueBatches.map((batch) => {
                  const count = mergedAlumni.filter((p) => p.batchYear === batch).length;
                  return (
                    <option key={batch} value={batch} className="bg-[#141416] text-[#FAFAFA]">
                      Batch {batch} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Sort Order Selector */}
            <div className="flex items-center gap-1 bg-[#141416] border border-white/10 rounded-lg p-1 shrink-0 overflow-x-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C9A227] ml-2 mr-1 shrink-0" />
              <button
                onClick={() => setSortOrder('default')}
                className={`px-2.5 py-1.5 text-xs rounded transition-all cursor-pointer whitespace-nowrap ${
                  sortOrder === 'default'
                    ? 'bg-[#C9A227] text-[#080808] font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
              >
                Sheet Order
              </button>
              <button
                onClick={() => setSortOrder('alphabetical')}
                className={`px-2.5 py-1.5 text-xs rounded transition-all cursor-pointer whitespace-nowrap ${
                  sortOrder === 'alphabetical'
                    ? 'bg-[#C9A227] text-[#080808] font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
              >
                A → Z
              </button>
              <button
                onClick={() => setSortOrder('batch-asc')}
                className={`px-2.5 py-1.5 text-xs rounded transition-all cursor-pointer whitespace-nowrap ${
                  sortOrder === 'batch-asc'
                    ? 'bg-[#C9A227] text-[#080808] font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
                title="Sort from earliest graduation batch"
              >
                Senior Batches
              </button>
              <button
                onClick={() => setSortOrder('batch-desc')}
                className={`px-2.5 py-1.5 text-xs rounded transition-all cursor-pointer whitespace-nowrap ${
                  sortOrder === 'batch-desc'
                    ? 'bg-[#C9A227] text-[#080808] font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
                title="Sort from most recent graduation batch"
              >
                Recent Batches
              </button>
            </div>
          </div>
        </div>

        {/* Batch Pills Quick Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-thin">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3 h-3 text-[#C9A227]" />
            <span>Batches:</span>
          </span>
          <button
            onClick={() => {
              setSelectedBatch('all');
              setVisibleCount(24);
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer shrink-0 ${
              selectedBatch === 'all'
                ? 'bg-[#C9A227] text-[#080808] font-bold'
                : 'bg-white/5 text-[#A1A1AA] hover:text-[#FAFAFA] border border-white/5'
            }`}
          >
            All ({mergedAlumni.length})
          </button>
          <button
            onClick={() => {
              setOnlyWithUpdates((prev) => !prev);
              setVisibleCount(24);
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
              onlyWithUpdates
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'bg-white/5 text-[#E8D9A8] hover:text-[#FAFAFA] border border-[#C9A227]/30'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span>With Career / College Info ({withUpdatesCount})</span>
          </button>
          {uniqueBatches.map((batch) => {
            const count = mergedAlumni.filter((p) => p.batchYear === batch).length;
            const isSelected = selectedBatch === batch;
            return (
              <button
                key={batch}
                onClick={() => {
                  setSelectedBatch(batch);
                  setVisibleCount(24);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#C9A227] text-[#080808] font-bold shadow-md shadow-[#C9A227]/20'
                    : 'bg-white/5 text-[#A1A1AA] hover:text-[#FAFAFA] border border-white/5 hover:border-[#C9A227]/30'
                }`}
              >
                <span>{batch}</span>
                <span className={`text-[10px] ${isSelected ? 'text-[#080808]/70' : 'text-[#71717A]'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Official Registry Status Banner + CTA to Share Updates */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 mb-8 rounded-lg bg-gradient-to-r from-[#18160E] to-[#111114] border border-[#C9A227]/30 text-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center text-[#E8D9A8] shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
            </div>
            <div>
              <span className="font-semibold text-[#FAFAFA] block sm:inline">
                Live Alumni Registry:
              </span>{' '}
              <span className="text-[#A1A1AA]">
                Displaying {filteredAlumni.length} alumni across graduating batches (2013–2028) · {withUpdatesCount} with recorded profession/college updates.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigateToUpdates}
            className="self-start md:self-auto px-4 py-2 rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] hover:shadow-[0_0_20px_rgba(201,162,39,0.35)] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add / Update Your Profession &amp; College</span>
          </button>
        </div>

        {/* Alumni Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayedAlumni.map((alumni) => {
            const initial = alumni.name.trim().charAt(0).toUpperCase() || 'A';
            return (
              <div
                key={alumni.id}
                className="group relative flex flex-col justify-between p-5 rounded-lg bg-[#111114]/80 backdrop-blur-md border border-white/10 hover:border-[#C9A227]/40 hover:bg-[#141418]/90 transition-all duration-300 shadow-lg shadow-black/40 hover:-translate-y-1"
              >
                <div>
                  {/* Top Status & Batch Badge Row */}
                  <div className="flex items-center justify-between text-xs text-[#71717A] mb-3 pb-2.5 border-b border-white/5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#C9A227]/15 text-[#E8D9A8] border border-[#C9A227]/30 text-[11px] font-mono font-semibold">
                      <GraduationCap className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>Batch {alumni.batchYear}</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Monogram Avatar & Name */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#222019] to-[#0A0A0C] border border-[#C9A227]/40 flex items-center justify-center text-[#E8D9A8] font-serif-editorial text-xl font-bold group-hover:border-[#C9A227] transition-colors shrink-0">
                      {initial}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8] transition-colors leading-snug">
                        {alumni.name}
                      </h3>
                      <div className="text-[11px] text-[#71717A] mt-0.5 font-mono">
                        {alumni.isCommunityAdded ? 'Community Profile · Shalom Hills' : `ID: ${alumni.id.toUpperCase()} · Shalom Hills`}
                      </div>
                    </div>
                  </div>

                  {/* Submitted Profession / College / Stream (only shown when recorded) */}
                  {alumni.journey && (
                    <div className="space-y-1.5 py-3 px-3.5 rounded-md bg-[#C9A227]/10 border border-[#C9A227]/30 my-3 text-xs">
                      <div className="flex items-center justify-between gap-2 pb-1 border-b border-[#C9A227]/20">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A227] font-semibold">
                          {alumni.journey.pursuitCategory}
                        </span>
                        <Sparkles className="w-3 h-3 text-[#C9A227]" />
                      </div>
                      {alumni.journey.professionOrRole && (
                        <div className="flex items-start gap-2 text-[#FAFAFA]">
                          <Briefcase className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                          <span className="font-medium leading-snug">{alumni.journey.professionOrRole}</span>
                        </div>
                      )}
                      {alumni.journey.collegeOrOrganization && (
                        <div className="flex items-start gap-2 text-[#E8D9A8]">
                          <GraduationCap className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                          <span className="leading-snug">{alumni.journey.collegeOrOrganization}</span>
                        </div>
                      )}
                      {alumni.journey.streamOrField && (
                        <div className="flex items-start gap-2 text-[#A1A1AA]">
                          <BookOpen className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                          <span className="leading-snug">{alumni.journey.streamOrField}</span>
                        </div>
                      )}
                      {alumni.journey.currentLocation && (
                        <div className="flex items-start gap-2 text-[#A1A1AA]">
                          <MapPin className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                          <span className="leading-snug">{alumni.journey.currentLocation}</span>
                        </div>
                      )}
                      {alumni.journey.whatImDoing && (
                        <p className="text-[11px] text-[#A1A1AA] line-clamp-2 pt-1 italic border-t border-white/5">
                          “{alumni.journey.whatImDoing}”
                        </p>
                      )}
                    </div>
                  )}

                  {/* Verified Contact Details (only shown when present) */}
                  {(alumni.email || alumni.contactNumber) && (
                    <div className="space-y-2 py-3 px-3.5 rounded-md bg-white/[0.02] border border-white/5 my-3 text-xs text-[#A1A1AA]">
                      {alumni.email && (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 truncate">
                            <Mail className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                            <span className="truncate text-[11px] font-mono text-[#FAFAFA]/90">{alumni.email}</span>
                          </div>
                          <button
                            onClick={(e) => handleCopyContact(alumni.email, `${alumni.id}-email`, e)}
                            className="text-[#71717A] hover:text-[#C9A227] p-1 cursor-pointer shrink-0"
                            title="Copy email"
                            aria-label="Copy Email"
                          >
                            {copiedId === `${alumni.id}-email` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}

                      {alumni.contactNumber && (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                            <span className="text-[11px] font-mono text-[#FAFAFA]/90">{alumni.contactNumber}</span>
                          </div>
                          <button
                            onClick={(e) => handleCopyContact(alumni.contactNumber, `${alumni.id}-phone`, e)}
                            className="text-[#71717A] hover:text-[#C9A227] p-1 cursor-pointer shrink-0"
                            title="Copy phone number"
                            aria-label="Copy Phone"
                          >
                            {copiedId === `${alumni.id}-phone` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Form Submission Timestamp */}
                  <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1 px-1">
                    <Calendar className="w-3 h-3 text-[#C9A227]/70" />
                    <span>{alumni.isCommunityAdded ? `Updated: ${alumni.timestamp}` : `Registered: ${alumni.timestamp}`}</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-2">
                  <button
                    onClick={() => onSelectAlumni(alumni)}
                    className="text-xs text-[#FAFAFA] hover:text-[#C9A227] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Attendee Card</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenQuestionModal(alumni)}
                    className="p-1.5 rounded bg-white/5 hover:bg-[#C9A227]/20 hover:text-[#E8D9A8] text-[#A1A1AA] transition-colors cursor-pointer"
                    title={`Submit a question for ${alumni.name}`}
                    aria-label="Submit Question"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {filteredAlumni.length > visibleCount && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-6 py-2.5 rounded-lg text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] transition-all cursor-pointer shadow-lg"
            >
              Load More Alumni ({filteredAlumni.length - visibleCount} Remaining)
            </button>
          </div>
        )}

        {filteredAlumni.length === 0 && (
          <div className="text-center py-16 bg-[#111114] rounded-lg border border-white/5">
            <p className="text-[#A1A1AA] text-sm">
              No alumni records found matching your current filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBatch('all');
                setOnlyWithUpdates(false);
                setSortOrder('default');
              }}
              className="mt-4 px-4 py-2 text-xs text-[#C9A227] hover:underline cursor-pointer"
            >
              Reset Search &amp; Batch Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
