import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { ArrowUpRight, CheckCircle2, AlertCircle, Sparkles, Send, Download, UserCheck, Shield } from 'lucide-react';

export const RegistrationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'portal'>('form');

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    status: 'Student' as 'Student' | 'Alumnus' | 'Parent' | 'Faculty',
    cohortOrGrade: 'Grade 12',
    interestDomain: 'Technology',
    questionOrMessage: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number (min 8 digits)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate interactive processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      status: 'Student',
      cohortOrGrade: 'Grade 12',
      interestDomain: 'Technology',
      questionOrMessage: '',
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <section id="register" className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#09090A] border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C9A227]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECURE YOUR PARTICIPATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-editorial font-bold text-[#FAFAFA]">
            YOUR NEXT CHAPTER <span className="gold-gradient-text">STARTS HERE.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-4 max-w-xl mx-auto font-light leading-relaxed">
            Be part of a gathering that brings experience, ambition, and opportunity together at Shalom Hills International School.
          </p>

          {/* Registration Mode Switcher */}
          <div className="inline-flex items-center gap-2 p-1.5 mt-8 bg-[#141416] border border-white/10 rounded-lg">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-5 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-[#C9A227] text-[#080808] font-semibold shadow-sm'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              Interactive RSVP Form
            </button>
            <button
              onClick={() => setActiveTab('portal')}
              className={`px-5 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === 'portal'
                  ? 'bg-[#C9A227] text-[#080808] font-semibold shadow-sm'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              Official Portal Link
            </button>
          </div>
        </div>

        {/* Tab 1: Form View */}
        {activeTab === 'form' && (
          <div className="bg-[#121214] border border-white/10 rounded-xl p-6 sm:p-10 shadow-2xl relative">
            {isSuccess ? (
              <div className="text-center py-10 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#FAFAFA] mb-2">
                  RSVP Expression Recorded
                </h3>
                <p className="text-sm text-[#A1A1AA] max-w-md mx-auto mb-6">
                  Thank you, <span className="text-[#E8D9A8] font-medium">{formData.fullName}</span>. Your interest for the <span className="text-[#FAFAFA]">{formData.interestDomain}</span> mentorship circle on 14 November 2026 has been noted.
                </p>

                {/* Demo Notice Disclaimer (Mandatory per prompt) */}
                <div className="p-4 rounded bg-white/5 border border-white/10 max-w-lg mx-auto text-xs text-[#A1A1AA] text-left mb-8">
                  <div className="flex items-center gap-2 text-[#C9A227] font-semibold mb-1">
                    <Shield className="w-4 h-4" />
                    <span>Demo Mode Confirmation</span>
                  </div>
                  This form is currently running in preview demonstration mode. For official school database entry, please also confirm your attendance via the official registration link below once released by the school secretariat.
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={EVENT_CONFIG.registration.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>OPEN OFFICIAL LINK</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={resetForm}
                    className="px-6 py-3 text-xs font-poppins font-medium uppercase tracking-wider text-[#FAFAFA] bg-white/5 hover:bg-white/10 border border-white/15 rounded transition-all cursor-pointer"
                  >
                    Submit Another Response
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Status Toggle (Student / Alumnus / Parent / Faculty) */}
                <div className="mb-8">
                  <label className="block text-xs uppercase tracking-wider text-[#71717A] font-semibold mb-3">
                    I am registering as:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(['Student', 'Alumnus', 'Parent', 'Faculty'] as const).map((role) => (
                      <button
                        type="button"
                        key={role}
                        onClick={() => setFormData({ ...formData, status: role })}
                        className={`py-2.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                          formData.status === role
                            ? 'bg-[#C9A227]/20 border-[#C9A227] text-[#E8D9A8] shadow-[0_0_12px_rgba(201,162,39,0.2)]'
                            : 'bg-white/5 border-white/5 text-[#A1A1AA] hover:bg-white/10'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium">
                      Full Name <span className="text-[#C9A227]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-[#C9A227]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium">
                      Email Address <span className="text-[#C9A227]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#C9A227]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium">
                      Phone Number <span className="text-[#C9A227]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-white/10 focus:border-[#C9A227]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Cohort or Current Grade */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium">
                      {formData.status === 'Student'
                        ? 'Current Grade / Section'
                        : formData.status === 'Alumnus'
                        ? 'Graduating Batch'
                        : 'Affiliation Detail'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        formData.status === 'Student'
                          ? 'e.g. Grade 11-A (Science)'
                          : formData.status === 'Alumnus'
                          ? 'e.g. Class of 2018'
                          : 'e.g. Parent of Grade 10 student'
                      }
                      value={formData.cohortOrGrade}
                      onChange={(e) => setFormData({ ...formData, cohortOrGrade: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] transition-colors"
                    />
                  </div>
                </div>

                {/* Interest Domain */}
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium">
                    Primary Area of Career / Mentorship Interest
                  </label>
                  <select
                    value={formData.interestDomain}
                    onChange={(e) => setFormData({ ...formData, interestDomain: e.target.value })}
                    className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#C9A227] transition-colors"
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

                {/* Question for Mentors */}
                <div className="mb-8">
                  <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-2 font-medium">
                    Question for the Returning Alumni Panel (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What questions about college degrees, entrance tests, career pivots, or industry realities would you like mentors to address?"
                    value={formData.questionOrMessage}
                    onChange={(e) => setFormData({ ...formData, questionOrMessage: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] transition-colors resize-none"
                  />
                </div>

                {/* Privacy Notice */}
                <div className="text-[11px] text-[#71717A] mb-8 leading-relaxed">
                  <span className="text-[#A1A1AA]">Privacy Assurance:</span> Your details will solely be utilized by the Shalom Hills International School organizing committee for coordinating mentorship breakouts and sending event updates. We will never share your information.
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] rounded-md shadow-[0_0_25px_rgba(201,162,39,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>RECORDING RSVP...</span>
                    ) : (
                      <>
                        <span>SUBMIT RSVP EXPRESSION</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <a
                    href={EVENT_CONFIG.registration.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#E8D9A8] hover:text-[#FAFAFA] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Or visit external link directly</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Official Portal Link Card */}
        {activeTab === 'portal' && (
          <div className="bg-[#121214] border border-white/10 rounded-xl p-8 sm:p-12 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] flex items-center justify-center mx-auto mb-6">
              <UserCheck className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#FAFAFA] mb-3">
              Official Registration Portal
            </h3>

            <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto mb-8 font-light leading-relaxed">
              Click the link below to open the dedicated registration form managed by the Shalom Footprints Organizing Committee.
            </p>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 max-w-md mx-auto mb-8 font-mono text-xs text-[#E8D9A8] break-all">
              {EVENT_CONFIG.registration.externalUrl}
            </div>

            <a
              href={EVENT_CONFIG.registration.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] rounded-md shadow-[0_0_25px_rgba(201,162,39,0.35)] hover:shadow-[0_0_35px_rgba(201,162,39,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>REGISTER FOR SHALOM FOOTPRINTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="text-xs text-[#71717A] mt-6">
              Opens in a new tab · Configurable in <code className="text-[#E8D9A8]/80">src/config/eventConfig.ts</code>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
