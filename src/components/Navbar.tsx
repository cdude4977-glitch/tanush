import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Alumni', href: '#alumni' },
    { label: 'Mentorship', href: '#mentorship' },
    { label: 'Details', href: '#details' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#"
              className="text-lg sm:text-xl font-serif-editorial tracking-wider font-semibold text-[#FAFAFA] hover:text-[#E8D9A8] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#C9A227] shadow-[0_0_8px_#C9A227]"></span>
              <span className="tracking-[0.15em]">{EVENT_CONFIG.brand.name}</span>
            </a>

            {/* Zone 2: 4-5 clean single-line text navigation links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#FAFAFA] transition-colors hover:underline hover:decoration-[#C9A227] hover:underline-offset-8 whitespace-nowrap shrink-0"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <button
                onClick={onOpenRegister}
                className="px-5 py-2 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] rounded hover:shadow-[0_0_20px_rgba(201,162,39,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#FAFAFA] hover:text-[#C9A227] focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10 border-b border-white/10 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-5 text-lg font-medium text-[#FAFAFA]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[#C9A227] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3.5 text-center text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] rounded shadow-[0_0_20px_rgba(201,162,39,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>REGISTER FOR FOOTPRINTS</span>
              <ArrowUpRight className="w-4 h-4" />
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
