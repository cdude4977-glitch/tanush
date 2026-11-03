/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { StorySection } from './components/StorySection.tsx';
import { AlumniSection } from './components/AlumniSection.tsx';
import { MentorshipSection } from './components/MentorshipSection.tsx';
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

export default function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [isQuestionMode, setIsQuestionMode] = useState(false);

  const handleOpenRegister = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterModalOpen(false);
  };

  const handleExploreAlumni = () => {
    const el = document.getElementById('alumni');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
      {/* Refined Floating Navbar */}
      <Navbar onOpenRegister={handleOpenRegister} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onOpenRegister={handleOpenRegister}
          onExploreAlumni={handleExploreAlumni}
        />
        <StorySection />
        <AlumniSection
          onSelectAlumni={handleSelectAlumni}
          onOpenQuestionModal={handleOpenQuestionModal}
        />
        <MentorshipSection onOpenRegister={handleOpenRegister} />
        <EventHighlightsSection />
        <RecognitionSection />
        <JourneyTimelineSection />
        <EventDetailsSection />
        <GallerySection />
        <RegistrationSection />
        <FaqSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenRegister={handleOpenRegister} />

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegister}
      />

      <AlumniDetailModal
        alumni={selectedAlumni}
        onClose={handleCloseAlumniModal}
        initialQuestionMode={isQuestionMode}
      />
    </div>
  );
}
