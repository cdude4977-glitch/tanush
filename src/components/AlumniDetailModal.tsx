import React, { useState } from 'react';
import { AlumniProfile } from '../config/eventConfig.ts';
import {
  X,
  CheckCircle2,
  Send,
  Sparkles,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  Check,
  Copy,
  GraduationCap,
  Briefcase,
  BookOpen,
  MapPin
} from 'lucide-react';

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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!alumni) return null;

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setError('Please enter a question or topic you would like this alumnus to address.');
      return;
    }
    setError('');
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSent(true);
    }, 800);
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const initial = alumni.name.trim().charAt(0).toUpperCase() || 'A';

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
            <span>Alumni Attendee Dossier · Shalom Footprints 2026</span>
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
              {initial}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#71717A] mb-1">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Registered Alumnus</span>
                </span>
                <span>·</span>
                <span className="text-[#A1A1AA] font-mono text-[11px]">ID: {alumni.id.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#FAFAFA]">
                {alumni.name}
              </h3>
              
              {/* Prominent Graduation Batch Tag */}
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#C9A227]/20 text-[#E8D9A8] border border-[#C9A227]/40">
                  <GraduationCap className="w-4 h-4 text-[#C9A227]" />
                  <span>Graduation Batch: {alumni.batchYear}</span>
                </span>
                <span className="text-xs text-[#71717A]">· Shalom Hills International School</span>
              </div>
            </div>
          </div>

          {/* Registration Details Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/5 text-xs">
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-[#71717A]">
                Graduation Batch
              </div>
              <div className="flex items-center gap-1.5 text-[#E8D9A8] font-mono text-xs font-semibold">
                <GraduationCap className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Class of {alumni.batchYear}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-[#71717A]">
                Verification Status
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {alumni.isCommunityAdded
                    ? 'Community Recorded Directory Update'
                    : 'Confirmed in Official Form Sheet'}
                </span>
              </div>
            </div>

            {alumni.email && (
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#71717A]">
                  Email Address
                </div>
                <div className="flex items-center justify-between text-[#FAFAFA]">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                    <span className="font-mono text-[11px] truncate">{alumni.email}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(alumni.email, 'email')}
                    className="p-1 text-[#71717A] hover:text-[#C9A227] cursor-pointer shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            )}

            {alumni.contactNumber && (
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#71717A]">
                  Contact Number
                </div>
                <div className="flex items-center justify-between text-[#FAFAFA]">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                    <span className="font-mono text-[11px]">{alumni.contactNumber}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(alumni.contactNumber, 'phone')}
                    className="p-1 text-[#71717A] hover:text-[#C9A227] cursor-pointer shrink-0"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-1 sm:col-span-2 pt-2 border-t border-white/5 flex items-center justify-between text-[#71717A]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{alumni.isCommunityAdded ? `Recorded: ${alumni.timestamp}` : `Form Submission: ${alumni.timestamp}`}</span>
              </div>
              <div className="flex items-center gap-1 text-[#C9A227] text-[11px] font-mono">
                <span>Shalom Footprints 2026</span>
              </div>
            </div>
          </div>

          {/* Recorded Profession / College / Stream Details */}
          {alumni.journey && (
            <div className="p-5 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/35 space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#C9A227]/20">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C9A227] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Profession, College &amp; Current Pursuit</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C9A227]/20 text-[#E8D9A8] text-[10px] font-mono">
                  {alumni.journey.pursuitCategory}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {alumni.journey.professionOrRole && (
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase tracking-wider text-[#71717A] flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#C9A227]" />
                      <span>Profession / Role / Degree</span>
                    </div>
                    <div className="text-[#FAFAFA] font-medium">{alumni.journey.professionOrRole}</div>
                  </div>
                )}

                {alumni.journey.collegeOrOrganization && (
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase tracking-wider text-[#71717A] flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-[#C9A227]" />
                      <span>College / Organization</span>
                    </div>
                    <div className="text-[#E8D9A8] font-medium">{alumni.journey.collegeOrOrganization}</div>
                  </div>
                )}

                {alumni.journey.streamOrField && (
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase tracking-wider text-[#71717A] flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#C9A227]" />
                      <span>Academic Stream / Field</span>
                    </div>
                    <div className="text-[#FAFAFA]">{alumni.journey.streamOrField}</div>
                  </div>
                )}

                {alumni.journey.currentLocation && (
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase tracking-wider text-[#71717A] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C9A227]" />
                      <span>Location</span>
                    </div>
                    <div className="text-[#FAFAFA]">{alumni.journey.currentLocation}</div>
                  </div>
                )}
              </div>

              {alumni.journey.whatImDoing && (
                <div className="pt-2 border-t border-[#C9A227]/20 text-xs text-[#E8D9A8]/90 italic leading-relaxed">
                  “{alumni.journey.whatImDoing}”
                </div>
              )}
            </div>
          )}

          {/* Ask a Question Section */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm font-serif-editorial font-bold text-[#FAFAFA] mb-1 flex items-center gap-1.5">
              <span>Submit a Prior Question for {alumni.name} (Batch {alumni.batchYear})</span>
            </h4>
            <p className="text-xs text-[#71717A] mb-4">
              Your inquiry will be queued for discussion during the alumni mentorship sessions on 14 November 2026.
            </p>

            {isSent ? (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Question successfully queued.</span>
                  Thank you! The student moderator will forward this topic to {alumni.name}.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendQuestion} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Diya)"
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
                  placeholder={`What would you like to ask ${alumni.name} about their journey and advice for current students?`}
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
