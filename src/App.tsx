/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, TabId } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { StorySection } from './components/StorySection.tsx';
import { AlumniSection } from './components/AlumniSection.tsx';
import { AlumniUpdatesSection } from './components/AlumniUpdatesSection.tsx';
import { RecognitionSection } from './components/RecognitionSection.tsx';
import { EventDetailsSection } from './components/EventDetailsSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AlumniDetailModal } from './components/AlumniDetailModal.tsx';
import { AlumniProfile } from './config/eventConfig.ts';
import { Users, Award, Calendar, HelpCircle, Briefcase, ArrowUpRight } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase.ts';
import { AlumniJourneyRecord, subscribePublicAlumniJourneys } from './services/alumniJourneyService.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    // Read initial tab from URL hash if available
    const hash = window.location.hash.replace('#', '') as TabId;
    const validTabs: TabId[] = ['overview', 'alumni', 'updates', 'awards', 'logistics', 'faqs'];
    return validTabs.includes(hash) ? hash : 'overview';
  });

  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [isQuestionMode, setIsQuestionMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [journeys, setJourneys] = useState<AlumniJourneyRecord[]>([]);

  // Sync activeTab with URL hash
  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const unsubscribeJourneys = subscribePublicAlumniJourneys(
      (records) => {
        setJourneys(records);
      },
      (err) => {
        console.error('Failed to sync alumni journeys:', err);
      }
    );
    return () => unsubscribeJourneys();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabId;
      const validTabs: TabId[] = ['overview', 'alumni', 'updates', 'awards', 'logistics', 'faqs'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
    <div className="relative min-h-screen bg-[#080808] text-[#FAFAFA] flex flex-col font-sans selection:bg-[#C9A227]/30 selection:text-[#FFF7E6]">
      {/* GLOBAL AUDITORIUM BACKDROP (50% BLUR) BEHIND THE ENTIRE WEBSITE */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/images/shalom_auditorium.png"
          alt="Shalom Hills International School Auditorium Main Backdrop"
          className="w-full h-full object-cover object-center scale-105 filter blur-[6px] opacity-85"
        />
        {/* Balanced scrim: auditorium features (school arch, stage, vaulted ceiling) clearly recognizable while keeping text crisp */}
        <div className="absolute inset-0 bg-[#080808]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#080808]/30 to-[#080808]/85" />
      </div>

      {/* Refined Tabular Navbar with active state */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Tab Views Container */}
      <main className="relative z-10 flex-1 pt-16 bg-transparent">
        {/* TAB 1: OVERVIEW & STORY */}
        {activeTab === 'overview' && (
          <div className="animate-in fade-in duration-300">
            <Hero
              onExploreAlumni={handleExploreAlumni}
              onNavigateTab={(tab) => handleSelectTab(tab as TabId)}
            />
            <StorySection />

            {/* Quick Transition Banner to Other Tabs */}
            <section className="py-16 px-4 sm:px-8 border-t border-white/10 bg-[#0C0C0E]/60 backdrop-blur-md">
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
                      Browse 125 registered alumni across graduating batches (2013–2028).
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectTab('awards')}
                    className="p-5 rounded-lg bg-[#141417] border border-white/10 hover:border-[#C9A227]/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] mb-3 group-hover:scale-110 transition-transform">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8]">
                      Recognition &amp; Honors
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] mt-1">
                      Alumni Awards 2026 categories &amp; official citation showcase.
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
                      14 Nov 2026 venue schedule, campus directions &amp; photo gallery.
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectTab('faqs')}
                    className="p-5 rounded-lg bg-[#141417] border border-white/10 hover:border-[#C9A227]/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] mb-3 group-hover:scale-110 transition-transform">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-serif-editorial font-bold text-[#FAFAFA] group-hover:text-[#E8D9A8]">
                      FAQs &amp; Help
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] mt-1">
                      Eligibility guidelines, schedule details &amp; school secretariat contact.
                    </div>
                  </button>
                </div>

                {/* Highlighted Callout for Alumni Career / College Updates */}
                <div className="mt-6 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-[#18160E]/90 to-[#141417]/90 border border-[#C9A227]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-serif-editorial font-bold text-[#FAFAFA]">
                        Alumni: Share Your Profession, College, Stream or Current Pursuit
                      </div>
                      <div className="text-xs text-[#A1A1AA] mt-0.5">
                        Record what you are doing today — all submissions appear live on the Alumni Directory.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelectTab('updates')}
                    className="self-start sm:self-auto px-5 py-2.5 rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Submit Your Update</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
              journeys={journeys}
              onNavigateToUpdates={() => handleSelectTab('updates')}
            />
          </div>
        )}

        {/* TAB 3: ALUMNI UPDATES (PROFESSION / COLLEGE / STREAM) */}
        {activeTab === 'updates' && (
          <div className="animate-in fade-in duration-300 pt-6">
            <AlumniUpdatesSection
              user={user}
              authReady={authReady}
              journeys={journeys}
              onNavigateToDirectory={() => handleSelectTab('alumni')}
            />
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

        {/* TAB 6: FAQS & CONTACT */}
        {activeTab === 'faqs' && (
          <div className="animate-in fade-in duration-300 pt-6">
            <FaqSection />
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onExploreAlumni={handleExploreAlumni} />

      {/* Interactive Modal for Alumni Attendee Card */}
      <AlumniDetailModal
        alumni={selectedAlumni}
        onClose={handleCloseAlumniModal}
        initialQuestionMode={isQuestionMode}
      />
    </div>
  );
}
