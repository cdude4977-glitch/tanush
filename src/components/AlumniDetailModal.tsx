import React, { useState } from 'react';
import { AlumniProfile } from '../config/eventConfig.ts';
import { X, GraduationCap, Briefcase, CheckCircle2, Send, Sparkles, AlertCircle } from 'lucide-react';

interface AlumniDetailModalProps {
  alumni: AlumniProfile | null;
  onClose: () => void;
  initialQuestionMode?: boolean;
}

export const AlumniDetailModal: React.FC<AlumniDetailModalProps> = ({
  alumni,
  onClose,
  initialQuestionMode = false,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentGrade, setStudentGrade] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!alumni) return null;

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setError('Please enter a question or topic you would like the mentor to address.');
      return;
    }
    setError('');
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSent(true);
    }, 800);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#121215] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16161A]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C9A227] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alumni Mentorship Dossier</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Profile Monogram & Name Lockup */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#27272A] to-[#111113] border border-[#C9A227]/40 flex items-center justify-center text-2xl font-serif-editorial font-bold text-[#E8D9A8] shrink-0">
              {alumni.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-[#71717A] mb-1">
                <span className="flex items-center gap-1 text-[#E8D9A8]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C9A227]" />
                  {alumni.graduationYear}
                </span>
                <span>·</span>
                <span>{alumni.category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-editorial font-bold text-[#FAFAFA]">
                {alumni.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA] mt-1">
                <Briefcase className="w-3.5 h-3.5 text-[#71717A]" />
                <span>{alumni.profession}</span>
                <span>·</span>
                <span className="italic">{alumni.organization}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#71717A] font-semibold mb-2">
              Background &amp; Journey
            </h4>
            <p className="text-sm text-[#A1A1AA] leading-relaxed font-light">
              {alumni.bio}
            </p>
          </div>

          {/* Mentorship Focus */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#71717A] font-semibold mb-2">
              Key Breakout Themes
            </h4>
            <div className="flex flex-wrap gap-2">
              {alumni.mentorshipTopics.map((topic, i) => (
                <span
                  key={i}
                  className="text-xs text-[#E8D9A8] bg-white/[0.04] border border-[#C9A227]/30 px-3 py-1.5 rounded-md"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Ask a Question Section */}
          <div className="pt-6 border-t border-white/10">
            <h4 className="text-sm font-serif-editorial font-bold text-[#FAFAFA] mb-1 flex items-center gap-1.5">
              <span>Submit a Prior Question for this Mentor's Roundtable</span>
            </h4>
            <p className="text-xs text-[#71717A] mb-4">
              Your inquiry will be curated and presented during the sector panel on 14 November 2026.
            </p>

            {isSent ? (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Question queued for panel discussion.</span>
                  Thank you! The moderator will include this in the breakout circle.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendQuestion} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Maya)"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                  />
                  <input
                    type="text"
                    placeholder="Your Grade / Year (e.g. Grade 11)"
                    value={studentGrade}
                    onChange={(e) => setStudentGrade(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <textarea
                  rows={3}
                  placeholder={`What would you like to ask ${alumni.name}?`}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] resize-none"
                />

                {error && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs text-[#A1A1AA] hover:text-[#FAFAFA] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Queueing...</span>
                    ) : (
                      <>
                        <span>Submit Question</span>
                        <Send className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
