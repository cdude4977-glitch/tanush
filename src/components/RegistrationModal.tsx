import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { X, ArrowUpRight, CheckCircle2, AlertCircle, Shield, Send } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    status: 'Student' as 'Student' | 'Alumnus' | 'Parent' | 'Faculty',
    cohortOrGrade: '',
    interestDomain: 'Technology',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.fullName.trim()) err.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) err.phone = 'Phone number is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#121215] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16161A]">
          <div>
            <div className="text-[11px] font-mono text-[#C9A227] uppercase tracking-wider">
              14 November 2026 · Shalom Hills
            </div>
            <h3 className="text-lg font-serif-editorial font-bold text-[#FAFAFA]">
              Shalom Footprints RSVP Registration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-serif-editorial font-bold text-[#FAFAFA] mb-2">
                RSVP Expression Confirmed
              </h4>
              <p className="text-xs text-[#A1A1AA] max-w-md mx-auto mb-6">
                Thank you, <span className="text-[#E8D9A8] font-medium">{formData.fullName}</span>! Your RSVP request has been registered in the preview queue.
              </p>

              <div className="p-3.5 rounded bg-white/5 border border-white/10 text-[11px] text-[#A1A1AA] mb-6 text-left">
                <div className="flex items-center gap-1.5 text-[#C9A227] font-semibold mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Preview Environment Notice</span>
                </div>
                The organizers also provide an official Google Form link for primary institutional archiving:
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={EVENT_CONFIG.registration.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded flex items-center justify-center gap-1.5"
                >
                  <span>Open External Link</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-medium text-[#FAFAFA] bg-white/5 hover:bg-white/10 rounded border border-white/10 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#71717A] font-semibold mb-2">
                  Attendee Classification
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Student', 'Alumnus', 'Parent', 'Faculty'] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setFormData({ ...formData, status: r })}
                      className={`py-2 text-xs font-medium rounded border transition-all cursor-pointer ${
                        formData.status === r
                          ? 'bg-[#C9A227]/20 border-[#C9A227] text-[#E8D9A8]'
                          : 'bg-white/5 border-white/5 text-[#A1A1AA]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-1 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu Mehta"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                />
                {errors.fullName && <p className="text-red-400 text-[11px] mt-1">{errors.fullName}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                  />
                  {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-1 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                  />
                  {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Interest Domain */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-1 font-medium">
                  Mentorship Interest Track
                </label>
                <select
                  value={formData.interestDomain}
                  onChange={(e) => setFormData({ ...formData, interestDomain: e.target.value })}
                  className="w-full bg-[#18181B] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-[#FAFAFA] focus:outline-none focus:border-[#C9A227]"
                >
                  {EVENT_CONFIG.categories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={EVENT_CONFIG.registration.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#E8D9A8] hover:text-[#FAFAFA] flex items-center gap-1 transition-colors"
                >
                  <span>Or use external link directly</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {submitting ? 'Registering...' : 'Confirm RSVP'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
