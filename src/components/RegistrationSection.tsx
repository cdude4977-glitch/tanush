import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import {
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  UserCheck,
  Shield,
  Edit3,
  ExternalLink,
  Check,
  RotateCcw,
  Maximize2,
  FileText
} from 'lucide-react';

const STORAGE_KEY = 'shalom_footprints_google_forms_url';
const DEFAULT_GOOGLE_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLScy2Lz6p2sU6W4XvV0M3N1Q_Sample_Shalom_Footprints/viewform?embedded=true';

export const RegistrationSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'google-form' | 'custom-form'>('google-form');
  const [googleFormUrl, setGoogleFormUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || DEFAULT_GOOGLE_FORM;
    } catch {
      return DEFAULT_GOOGLE_FORM;
    }
  });

  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>(googleFormUrl);
  const [urlSavedSuccess, setUrlSavedSuccess] = useState<boolean>(false);
  const [embedMode, setEmbedMode] = useState<'embed' | 'popup'>('embed');

  // Custom Form states
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

  // Normalize Google Form URL for embedding
  const getEmbeddableUrl = (url: string): string => {
    if (!url) return '';
    try {
      if (url.includes('docs.google.com/forms')) {
        if (!url.includes('embedded=true')) {
          return url.includes('?') ? `${url}&embedded=true` : `${url}?embedded=true`;
        }
      }
      return url;
    } catch {
      return url;
    }
  };

  const handleSaveGoogleFormUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = inputUrl.trim();
    if (!cleanUrl) return;

    const finalUrl = getEmbeddableUrl(cleanUrl);
    setGoogleFormUrl(finalUrl);
    try {
      localStorage.setItem(STORAGE_KEY, finalUrl);
    } catch {
      // ignore localStorage quota errors
    }
    setIsEditingUrl(false);
    setUrlSavedSuccess(true);
    setTimeout(() => setUrlSavedSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    setGoogleFormUrl(DEFAULT_GOOGLE_FORM);
    setInputUrl(DEFAULT_GOOGLE_FORM);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsEditingUrl(false);
  };

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
    <section id="register" className="relative py-16 sm:py-24 px-4 sm:px-8 bg-[#09090A]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A227]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECURE YOUR PARTICIPATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-editorial font-bold text-[#FAFAFA]">
            YOUR NEXT CHAPTER <span className="gold-gradient-text">STARTS HERE.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A1A1AA] mt-3 max-w-xl mx-auto font-light leading-relaxed">
            Reserve your seat for Shalom Footprints on 14 November 2026. Register via the official Google Form or submit an express RSVP.
          </p>

          {/* Registration Mode Segmented Switcher */}
          <div className="inline-flex items-center gap-1.5 p-1 mt-8 bg-[#141416] border border-white/10 rounded-lg">
            <button
              onClick={() => setActiveMode('google-form')}
              className={`px-5 py-2 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-2 ${
                activeMode === 'google-form'
                  ? 'bg-[#C9A227] text-[#080808] font-semibold shadow-sm'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Google Form</span>
            </button>
            <button
              onClick={() => setActiveMode('custom-form')}
              className={`px-5 py-2 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-2 ${
                activeMode === 'custom-form'
                  ? 'bg-[#C9A227] text-[#080808] font-semibold shadow-sm'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Interactive RSVP Form</span>
            </button>
          </div>
        </div>

        {/* MODE 1: GOOGLE FORM INTEGRATION & CONFIGURATION */}
        {activeMode === 'google-form' && (
          <div className="bg-[#121214] border border-white/10 rounded-xl p-5 sm:p-8 shadow-2xl relative">
            {/* Top Toolbar: Google Form URL configuration */}
            <div className="mb-6 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C9A227] font-semibold">
                    Google Form Link Integration
                  </span>
                  {urlSavedSuccess && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Saved!
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#A1A1AA] mt-0.5 truncate max-w-md font-mono">
                  {googleFormUrl}
                </div>
              </div>

              {/* Action Buttons: Edit Link / Open Link / Embed Toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setIsEditingUrl(!isEditingUrl);
                    setInputUrl(googleFormUrl);
                  }}
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[#FAFAFA] border border-white/10 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>{isEditingUrl ? 'Cancel' : 'Configure Form Link'}</span>
                </button>

                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#C9A227]/10 hover:bg-[#C9A227]/20 text-[#E8D9A8] border border-[#C9A227]/30 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open in Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C9A227]" />
                </a>
              </div>
            </div>

            {/* Edit Google Form URL Drawer */}
            {isEditingUrl && (
              <form onSubmit={handleSaveGoogleFormUrl} className="mb-6 p-4 rounded-lg bg-[#18181C] border border-[#C9A227]/30 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#FAFAFA] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>Paste Your Google Form Link</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="text-[11px] text-[#A1A1AA] hover:text-[#C9A227] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Default</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#A1A1AA]">
                  Paste any Google Form URL (e.g. <code className="text-[#E8D9A8]">https://docs.google.com/forms/d/e/.../viewform</code>). The system will automatically configure it for seamless embedding and direct link access.
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://docs.google.com/forms/d/e/.../viewform"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded cursor-pointer whitespace-nowrap"
                  >
                    Save Link
                  </button>
                </div>
              </form>
            )}

            {/* Embedded Google Form Container */}
            <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0A0A0C] relative min-h-[620px] flex flex-col">
              {/* Iframe View */}
              <iframe
                src={googleFormUrl}
                width="100%"
                height="650"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Shalom Footprints Google Form"
                className="w-full h-[650px] bg-[#141417] text-white"
              >
                Loading Google Form…
              </iframe>

              {/* Fallback Banner if School Workspace Requires Sign-In */}
              <div className="p-4 bg-[#141418] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A1A1AA]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span>
                    Having trouble viewing inside the frame? If your school account requires specific browser authentication:
                  </span>
                </div>
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-[#FAFAFA] border border-white/10 hover:border-[#C9A227] text-xs font-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all shrink-0"
                >
                  <span>Open Full Form in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C9A227]" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: INTERACTIVE IN-BROWSER RSVP FORM */}
        {activeMode === 'custom-form' && (
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

                <div className="p-4 rounded bg-white/5 border border-white/10 max-w-lg mx-auto text-xs text-[#A1A1AA] text-left mb-8">
                  <div className="flex items-center gap-2 text-[#C9A227] font-semibold mb-1">
                    <Shield className="w-4 h-4" />
                    <span>Official Registry Notice</span>
                  </div>
                  Please also ensure you have completed the official Google Form registry above for badge printing and security pass generation at Shalom Hills International School.
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setActiveMode('google-form')}
                    className="px-6 py-3 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-[#C9A227] hover:bg-[#E8D9A8] rounded transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Google Form</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

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
                {/* Status Toggle */}
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
                        <span>SUBMIT EXPRESS RSVP</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveMode('google-form')}
                    className="text-xs text-[#E8D9A8] hover:text-[#FAFAFA] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Switch to official Google Form</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
