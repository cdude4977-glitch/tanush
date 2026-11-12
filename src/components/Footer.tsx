import React from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { ArrowUpRight, Users } from 'lucide-react';

interface FooterProps {
  onExploreAlumni: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onExploreAlumni }) => {
  return (
    <footer className="relative bg-[#050505]/75 backdrop-blur-md text-[#FAFAFA] pt-16 pb-12 px-6 sm:px-8 border-t border-white/10">
      {/* Thin Antique Gold Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand & Mission (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] shadow-[0_0_8px_#C9A227]"></span>
              <span className="text-xl font-serif-editorial font-bold tracking-[0.15em] text-[#FAFAFA]">
                {EVENT_CONFIG.brand.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md font-light leading-relaxed">
              An alumni mentorship and career guidance symposium hosted by Shalom Hills International School. Bringing generations together to illuminate tomorrow's pathways.
            </p>
            <div className="text-xs text-[#E8D9A8] italic font-serif-editorial">
              14 November 2026 · Gurugram, India
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#71717A] font-semibold">
              Exploration
            </div>
            <ul className="space-y-2 text-xs text-[#A1A1AA]">
              <li>
                <a href="#overview" className="hover:text-[#FAFAFA] transition-colors">Event Overview</a>
              </li>
              <li>
                <a href="#alumni" className="hover:text-[#FAFAFA] transition-colors">Alumni Directory</a>
              </li>
              <li>
                <a href="#mentorship" className="hover:text-[#FAFAFA] transition-colors">Guidance Framework</a>
              </li>
              <li>
                <a href="#awards" className="hover:text-[#FAFAFA] transition-colors">Honors &amp; Recognition</a>
              </li>
              <li>
                <a href="#logistics" className="hover:text-[#FAFAFA] transition-colors">Details &amp; Gallery</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#FAFAFA] transition-colors">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Quick Actions (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#71717A] font-semibold">
              Directory &amp; School
            </div>
            <button
              onClick={onExploreAlumni}
              className="w-full py-2.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              <Users className="w-3.5 h-3.5" />
              <span>EXPLORE ALUMNI</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={EVENT_CONFIG.contact.schoolWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-xs text-center text-[#FAFAFA] hover:text-[#C9A227] bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all flex items-center justify-center gap-1.5"
            >
              <span>Shalom Hills School Website</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Closing Quote Line & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm font-serif-editorial italic text-[#E8D9A8]">
            “{EVENT_CONFIG.brand.closingQuote}”
          </p>

          <p className="text-xs text-[#71717A]">
            &copy; 2026 Shalom Hills International School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
