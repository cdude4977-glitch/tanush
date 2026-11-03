import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, CheckCircle2, MessageSquare, UserCheck } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';

interface TrackMatcherProps {
  onNavigateTab: (tabId: string) => void;
}

export const TrackMatcher: React.FC<TrackMatcherProps> = ({ onNavigateTab }) => {
  const [selectedInterest, setSelectedInterest] = useState<string>('tech');

  const tracks = [
    {
      id: 'tech',
      title: 'Technology & AI',
      subtitle: 'Software, AI Systems & Data',
      alumniMatch: 'Technology Leader (Cohort 2017)',
      sector: 'Technology',
      description: 'Ideal for students targeting Computer Science, AI ethics, software engineering, and global tech internships.',
      sampleQuestions: [
        'How do I build a technical project portfolio while in high school?',
        'What should I prioritize between competitive programming vs personal projects?',
        'How are AI breakthroughs reshaping software career opportunities?',
      ],
      breakoutRoom: 'Auditorium Sector Alpha',
    },
    {
      id: 'med',
      title: 'Medicine & Healthcare',
      subtitle: 'Clinical Rigor & Research',
      alumniMatch: 'Medical Scholar (Cohort 2015)',
      sector: 'Medicine & Healthcare',
      description: 'For aspiring doctors, researchers, and public health innovators balancing academic rigor and personal well-being.',
      sampleQuestions: [
        'What was your honest study regimen for national medical entrance exams?',
        'How does clinical residency differ from medical school expectations?',
        'What career options exist at the intersection of medicine and research?',
      ],
      breakoutRoom: 'Seminar Room Beta 1',
    },
    {
      id: 'biz',
      title: 'Startups & Business',
      subtitle: 'Venture, Product & Growth',
      alumniMatch: 'Venture Founder (Cohort 2014)',
      sector: 'Business & Entrepreneurship',
      description: 'For students curious about launching startups, angel funding, product management, and modern commerce.',
      sampleQuestions: [
        'How did your school experience at Shalom spark your entrepreneurial spirit?',
        'How do you evaluate whether an idea is ready to become a real business?',
        'What undergraduate degrees best prepare someone for venture and leadership?',
      ],
      breakoutRoom: 'Innovation Amphitheatre',
    },
    {
      id: 'law',
      title: 'Law & Governance',
      subtitle: 'Litigation, Policy & Civil Service',
      alumniMatch: 'Appellate Counsel (Cohort 2016)',
      sector: 'Law',
      description: 'Navigating national law entrances (CLAT), moot court advocacy, constitutional jurisprudence, and public policy.',
      sampleQuestions: [
        'What is the practical difference between corporate law and litigation practice?',
        'How do you prepare effectively for competitive law entrance examinations?',
        'What role does public policy play in shaping modern governance?',
      ],
      breakoutRoom: 'Chambers Hall 3',
    },
    {
      id: 'design',
      title: 'Design & Creative Arts',
      subtitle: 'Architecture, UX & Brand',
      alumniMatch: 'Creative Director (Cohort 2019)',
      sector: 'Design & Creative Industries',
      description: 'Transforming visual curiosity and fine arts into international product design and brand leadership careers.',
      sampleQuestions: [
        'How do I assemble an entrance portfolio for top design institutes (NID/UCEED)?',
        'What does a day in the life of an international creative director look like?',
        'How can creative thinking combine with modern technology?',
      ],
      breakoutRoom: 'Studio Galleria',
    },
  ];

  const currentTrack = tracks.find((t) => t.id === selectedInterest) || tracks[0];

  return (
    <div className="w-full my-12 p-6 sm:p-10 rounded-xl bg-gradient-to-br from-[#131316] via-[#101012] to-[#0A0A0C] border border-white/10 shadow-2xl">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Guidance Tool</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#FAFAFA]">
          Find Your Recommended Mentorship Cluster
        </h3>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 font-light">
          Select your primary ambition to preview the matching alumni mentor cohort, breakout room, and questions to ask.
        </p>
      </div>

      {/* Track Selector Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => setSelectedInterest(track.id)}
            className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              selectedInterest === track.id
                ? 'bg-[#C9A227] text-[#080808] font-semibold shadow-[0_0_20px_rgba(201,162,39,0.3)]'
                : 'bg-white/5 text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/10 border border-white/5'
            }`}
          >
            <span>{track.title}</span>
          </button>
        ))}
      </div>

      {/* Matched Track Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-lg bg-[#16161A] border border-white/10">
        {/* Left Column: Track overview & mentor match (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#E8D9A8]">
            <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
            <span className="font-semibold uppercase tracking-wider">{currentTrack.subtitle}</span>
            <span className="text-[#71717A]">·</span>
            <span className="text-[#A1A1AA]">{currentTrack.breakoutRoom}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-serif-editorial font-bold text-[#FAFAFA]">
            {currentTrack.title} Guidance Track
          </h4>

          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-light">
            {currentTrack.description}
          </p>

          <div className="p-4 rounded bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/40 flex items-center justify-center text-[#E8D9A8] font-serif-editorial font-bold text-base">
                {currentTrack.alumniMatch.charAt(0)}
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#71717A]">Matched Alumni Mentor</div>
                <div className="text-xs font-semibold text-[#FAFAFA]">{currentTrack.alumniMatch}</div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('alumni')}
              className="text-xs text-[#E8D9A8] hover:text-[#FAFAFA] flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Suggested questions to ask (5 cols) */}
        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-6 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C9A227] flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Suggested Questions for this Cluster</span>
          </div>
          <div className="space-y-2">
            {currentTrack.sampleQuestions.map((q, idx) => (
              <div key={idx} className="p-2.5 rounded bg-white/[0.02] border border-white/5 text-[11px] text-[#A1A1AA] italic">
                “{q}”
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('registration')}
              className="w-full py-2.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Reserve Seat in this Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
