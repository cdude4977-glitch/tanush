/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, TabId } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { StorySection } from './components/StorySection.tsx';
import { AlumniSection } from './components/AlumniSection.tsx';
import { MentorshipSection } from './components/MentorshipSection.tsx';
import { TrackMatcher } from './components/TrackMatcher.tsx';
import { EventHighlightsSection } from './components/EventHighlightsSection.tsx';
import { RecognitionSection } from './components/RecognitionSection.tsx';
import { JourneyTimelineSection } from './components/JourneyTimelineSection.tsx';
import { EventDetailsSection } from './components/EventDetailsSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { RegistrationSection } from './components/RegistrationSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { RegistrationModal } from './components/RegistrationModal.tsx';
import { AlumniDetailModal } from './components/AlumniDetailModal.tsx';
import { AlumniProfile } from './config/eventConfig.ts';
import { Compass, Users, Award, Calendar, FileText, HelpCircle, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    // Read initial tab from URL hash if available
    const hash = window.location.hash.replace('#', '') as TabId;
    const validTabs: TabId[] = ['overview', 'alumni', 'mentorship', 'awards', 'logistics', 'registration', 'faqs'];
    return validTabs.includes(hash) ? hash : 'overview';
  });

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [isQuestionMode, setIsQuestionMode] = useState(false);

  // Sync activeTab with URL hash
  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabId;
      const validTabs: TabId[] = ['overview', 'alumni', 'mentorship', 'awards', 'logistics', 'registration', 'faqs'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenRegister = () => {
    handleSelectTab('registration');
  };

  const handleExploreAlumni = () => {
    handleSelectTab('alumni');
  };

  const handleSelectAlumni = (alumni: AlumniProfile) => {
    setSelectedAlumni(alumni);
    setIsQuestionMode(false);
  };

  const handleOpenQuestionModal = (alumni: AlumniProfile) => {
    setSelectedAlumni(alumni);
    setIsQuestionMode(true);
  };

  const handleCloseAlumniModal = () => {
    setSelectedAlumni(null);
    setIsQuestionMode(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FAFAFA] flex flex-col font-sans selection:bg-[#C9A227]/30 selection:text-[#FFF7E6]">
      {/* Refined Tabular Navbar with active state */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
      />

      {/* Main Tab Views Container */}
      <main className="flex-1 pt-16">
        {/* TAB 1: OVERVIEW & STORY */}
        {activeTab === 'overview' && (
          <div className="animate-in fade-in duration-300">
            <Hero
              onOpenRegister={handleOpenRegister}
              onExploreAlumni={handleExploreAlumni}
              onNavigateTab={(tab) => handleSelectTab(tab as TabId)}
            />
            <StorySection />

            {/* Quick Transition Banner to Other Tabs */}
            <section className="py-16 px-4 sm:px-8 border-t border-white/5 bg-[#0C0C0E]">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227]">
                    Explore Event Dimensions
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#FAFAFA] mt-1">
                    Where Would You Like to Go Next?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => handleSelectTab('alumni')}
                    className="p-5 rounded-lg bg-[#141417] border border-white/10 hover:border-[#C9A227]/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] mb-3 group-hover:scale-110 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8]">
                      Alumni Directory
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] mt-1">
                      Browse mentors across Tech, Medicine, Law, Finance &amp; Design.
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectTab('mentorship')}
                    className="p-5 rounded-lg bg-[#141417] border border-white/10 hover:border-[#C9A227]/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] mb-3 group-hover:scale-110 transition-transform">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8]">
                      Guidance Tracks
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] mt-1">
                      Interactive track finder &amp; 5-stage experience pathway.
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectTab('logistics')}
                    className="p-5 rounded-lg bg-[#141417] border border-white/10 hover:border-[#C9A227]/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] mb-3 group-hover:scale-110 transition-transform">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8]">
                      Logistics &amp; Gallery
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] mt-1">
                      14 Nov 2026 venue schedule, campus directions &amp; lightbox.
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectTab('registration')}
                    className="p-5 rounded-lg bg-[#141417] border border-[#C9A227]/30 hover:border-[#C9A227] text-left transition-all group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-[#C9A227] mb-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8]">
                      Register &amp; Forms
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] mt-1">
                      Official Google Forms integration &amp; express RSVP form.
                    </div>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: ALUMNI DIRECTORY */}
        {activeTab === 'alumni' && (
          <div className="animate-in fade-in duration-300 pt-6">
            <AlumniSection
              onSelectAlumni={handleSelectAlumni}
              onOpenQuestionModal={handleOpenQuestionModal}
            />
          </div>
        )}

        {/* TAB 3: MENTORSHIP & GUIDANCE TRACKS */}
        {activeTab === 'mentorship' && (
          <div className="animate-in fade-in duration-300 pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              {/* Interactive Career Cluster & Question Matcher */}
              <TrackMatcher onNavigateTab={(tab) => handleSelectTab(tab as TabId)} />
            </div>
            <MentorshipSection onOpenRegister={handleOpenRegister} />
            <JourneyTimelineSection />
            <EventHighlightsSection />
          </div>
        )}

        {/* TAB 4: RECOGNITION & AWARDS */}
        {activeTab === 'awards' && (
          <div className="animate-in fade-in duration-300 pt-6">
            <RecognitionSection />
          </div>
        )}

        {/* TAB 5: EVENT LOGISTICS & GALLERY */}
        {activeTab === 'logistics' && (
          <div className="animate-in fade-in duration-300 pt-6">
            <EventDetailsSection />
            <GallerySection />
          </div>
        )}

        {/* TAB 6: REGISTRATION & GOOGLE FORMS */}
        {activeTab === 'registration' && (
          <div className="animate-in fade-in duration-300 pt-6">
            <RegistrationSection />
          </div>
        )}

        {/* TAB 7: FAQS & CONTACT */}
        {activeTab === 'faqs' && (
          <div className="animate-in fade-in duration-300 pt-6">
            <FaqSection />
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenRegister={handleOpenRegister} />

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      <AlumniDetailModal
        alumni={selectedAlumni}
        onClose={handleCloseAlumniModal}
        initialQuestionMode={isQuestionMode}
      />
    </div>
  );
}
