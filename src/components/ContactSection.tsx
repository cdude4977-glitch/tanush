import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Student Guidance Query',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 bg-transparent border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>DIRECT INQUIRIES &amp; SECRETARIAT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA] leading-tight mb-4">
              LET'S KEEP THE <span className="gold-gradient-text">CONVERSATION GOING.</span>
            </h2>
            <p className="text-sm text-[#A1A1AA] font-light leading-relaxed mb-8">
              Whether you are an alumnus wishing to join as a mentor, a student with specific questions, or a parent seeking event details, our team is here to assist.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#71717A] font-semibold">
                    Email Desk
                  </div>
                  <a
                    href={`mailto:${EVENT_CONFIG.contact.email}`}
                    className="text-sm font-medium text-[#FAFAFA] hover:text-[#C9A227] transition-colors"
                  >
                    {EVENT_CONFIG.contact.email}
                  </a>
                  <div className="text-[11px] text-[#71717A] mt-0.5">
                    Official organizing team inbox
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#71717A] font-semibold">
                    School Helpline
                  </div>
                  <a
                    href={`tel:${EVENT_CONFIG.contact.phone.split('/')[0].trim()}`}
                    className="text-sm font-medium text-[#FAFAFA] hover:text-[#C9A227] transition-colors"
                  >
                    {EVENT_CONFIG.contact.phone}
                  </a>
                  <div className="text-[11px] text-[#71717A] mt-0.5">
                    Mon–Sat, 08:30 AM – 03:30 PM IST
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#71717A] font-semibold">
                    Campus Location
                  </div>
                  <div className="text-sm font-medium text-[#FAFAFA]">
                    {EVENT_CONFIG.contact.address}
                  </div>
                  <a
                    href={EVENT_CONFIG.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#C9A227] hover:underline mt-1.5"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#131316] border border-white/10 rounded-xl p-8 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif-editorial font-bold text-[#FAFAFA] mb-2">
                  Message Dispatched
                </h3>
                <p className="text-sm text-[#A1A1AA] max-w-md mx-auto mb-6">
                  Thank you, <span className="text-[#E8D9A8]">{formData.name}</span>. The Shalom Footprints coordinating committee has received your message and will respond via email shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Student Guidance Query', message: '' });
                  }}
                  className="px-6 py-2.5 text-xs font-poppins font-medium uppercase tracking-wider text-[#FAFAFA] bg-white/5 hover:bg-white/10 border border-white/10 rounded cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-serif-editorial font-bold text-[#FAFAFA] mb-2">
                  Send a Note to the Organizing Team
                </h3>
                <p className="text-xs text-[#A1A1AA] mb-4">
                  Have inquiries regarding alumni mentorship tracks, volunteer roles, or student participation?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-1.5 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diya Sen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. diya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-1.5 font-medium">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#FAFAFA] focus:outline-none focus:border-[#C9A227] transition-colors"
                  >
                    <option value="Student Guidance Query">Student Guidance &amp; Career Clusters</option>
                    <option value="Alumni Speaker Registration">Alumni Speaker / Mentor Expression</option>
                    <option value="Parent Attendance">Parent Participation Details</option>
                    <option value="Awards & Recognition">Awards &amp; Recognition Inquiry</option>
                    <option value="General Logistics">Venue &amp; General Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A1A1AA] mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 text-xs font-poppins font-medium uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] rounded shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT INQUIRY</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
