import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Menu, X, ArrowUpRight, Users } from 'lucide-react';

export type TabId = 'overview' | 'alumni' | 'awards' | 'logistics' | 'faqs';

interface NavbarProps {
  activeTab: TabId;
  onSelectTab: (tabId: TabId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTabs: { id: TabId; label: string; shortLabel: string }[] = [
    { id: 'overview', label: 'Overview', shortLabel: 'Overview' },
    { id: 'alumni', label: 'Alumni Directory', shortLabel: 'Alumni' },
    { id: 'awards', label: 'Recognition', shortLabel: 'Awards' },
    { id: 'logistics', label: 'Details & Gallery', shortLabel: 'Details' },
    { id: 'faqs', label: 'FAQs & Help', shortLabel: 'FAQs' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3'
            : 'bg-[#080808]/70 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Zone 1: Single text element wordmark */}
            <button
              onClick={() => onSelectTab('overview')}
              className="text-base sm:text-lg font-serif-editorial tracking-wider font-semibold text-[#FAFAFA] hover:text-[#E8D9A8] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#C9A227] shadow-[0_0_8px_#C9A227]" />
              <span className="tracking-[0.15em]">{EVENT_CONFIG.brand.name}</span>
            </button>

            {/* Zone 2: Clean Tab Navigation Bar */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 p-1 rounded-full">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onSelectTab(tab.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A227] text-[#080808] font-semibold shadow-[0_0_15px_rgba(201,162,39,0.35)]'
                        : 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary action - Explore Alumni */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onSelectTab('alumni')}
                className="hidden sm:flex px-4 py-2 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] rounded hover:shadow-[0_0_20px_rgba(201,162,39,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" />
                <span>ALUMNI DIRECTORY</span>
              </button>

              {/* Mobile Hamburger toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#FAFAFA] hover:text-[#C9A227] focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Sub-Tabs Strip on Mobile / Smaller Desktop Screens */}
        <div className="lg:hidden flex items-center gap-1 px-4 pt-2 pb-1 overflow-x-auto no-scrollbar border-t border-white/5 mt-2">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-1 text-[11px] font-medium rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A227] text-[#080808] font-semibold shadow-sm'
                    : 'bg-white/5 text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
              >
                {tab.shortLabel}
              </button>
            );
          })}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-2xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8 border-b border-white/10 animate-in fade-in duration-200">
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#71717A] mb-3">
              Section Tabs
            </div>
            <nav className="flex flex-col gap-1.5 text-base font-medium text-[#FAFAFA]">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[#C9A227]/20 text-[#E8D9A8] border border-[#C9A227]/40 font-semibold'
                        : 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-4 mt-8 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectTab('alumni');
              }}
              className="w-full py-3.5 text-center text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] rounded shadow-[0_0_20px_rgba(201,162,39,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>EXPLORE ALUMNI DIRECTORY</span>
            </button>
            <div className="text-center text-xs text-[#71717A]">
              14 November 2026 · Shalom Hills International School
            </div>
          </div>
        </div>
      )}
    </>
  );
};
