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
      title: 'Technology & Engineering',
      subtitle: 'Software, AI Systems & IIT / Thapar Trajectories',
      alumniMatch: 'Abhishek Chauhan (IIT BHU) & Devadutt Menon',
      sector: 'Engineering & Technology',
      description: 'Ideal for students targeting Computer Science, chemical & systems engineering, AI systems, and tech careers.',
      sampleQuestions: [
        'How do I build a technical project portfolio while in high school?',
        'What should I prioritize between competitive engineering entrances vs college selection?',
        'How did your time at Shalom prepare you for premier institutes like IIT BHU?',
      ],
      breakoutRoom: 'Auditorium Sector Alpha',
    },
    {
      id: 'med',
      title: 'Medicine & Healthcare',
      subtitle: 'Clinical Rigor, MBBS & Public Health',
      alumniMatch: 'Dr. Anamika Gupta (MS, MBBS) & Dr. Mahek Dua',
      sector: 'Medicine & Healthcare',
      description: 'For aspiring doctors, surgeons, and healthcare innovators balancing medical school entrance rigor and clinical practice.',
      sampleQuestions: [
        'What was your honest study regimen for national medical entrance exams?',
        'How does clinical residency and surgical specialty differ from medical school?',
        'What advice would you give to students choosing between MBBS in India vs overseas?',
      ],
      breakoutRoom: 'Seminar Room Beta 1',
    },
    {
      id: 'biz',
      title: 'Business & Management',
      subtitle: 'Venture, Strategy & ISB Trajectories',
      alumniMatch: 'Ritish Grover (ISB) & Priyancaa Thukral',
      sector: 'Business & Management',
      description: 'For students curious about business school, commerce, corporate consulting, and modern enterprise leadership.',
      sampleQuestions: [
        'How did your school experience at Shalom spark your business acumen?',
        'What skills should commerce and management students build early on?',
        'What does an MBA experience at institutions like ISB demand from candidates?',
      ],
      breakoutRoom: 'Innovation Amphitheatre',
    },
    {
      id: 'law',
      title: 'Law & Legal Studies',
      subtitle: 'Litigation, Advocacy & Jurisprudence',
      alumniMatch: 'Jahnvi Ahluwalia (Advocate) & Avdhesh Vakil',
      sector: 'Law & Legal Studies',
      description: 'Navigating national law entrances (CLAT), moot court advocacy, constitutional jurisprudence, and litigation practice.',
      sampleQuestions: [
        'What is the practical difference between corporate law and litigation practice?',
        'How do you prepare effectively for competitive law entrance examinations?',
        'What role does legal mentorship play in building courtroom advocacy?',
      ],
      breakoutRoom: 'Chambers Hall 3',
    },
    {
      id: 'higher-ed',
      title: 'Higher Education & Global Careers',
      subtitle: 'Christ University, Global Programs & Research',
      alumniMatch: 'Anvisha Chopra (Global Alum) & Ishir',
      sector: 'Higher Education & Research',
      description: 'Navigating competitive college admissions, international university applications, humanities, and academic research.',
      sampleQuestions: [
        'How do I assemble strong applications for premier universities like Christ and global colleges?',
        'What should students know before considering undergraduate studies abroad?',
        'How do you transition smoothly from Shalom Hills into higher academic environments?',
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
              onClick={() => onNavigateTab('alumni')}
              className="w-full py-2.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Mentors in this Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
